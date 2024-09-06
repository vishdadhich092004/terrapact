import express, { NextFunction, Request, Response } from "express";

import CropDemand from "../../models/company/cropDemand";
import { verifyToken, AuthRequest } from "../../middleware/auth"; // Assuming you have a JWT middleware
import Bid from "../../models/farmer/bid";
import { check, validationResult } from "express-validator";
import Contract from "../../models/contract";

const router = express.Router();

const checkOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropDemandId } = req.params;
    const cropDemand = await CropDemand.findById(cropDemandId);
    if (!cropDemand)
      return res.status(404).json({ message: "cropDemand Not Found" });

    if (cropDemand.companyId.toString() !== req.user?.userId)
      return res.status(403).json({ message: "You dont have permission" });
    next();
  } catch (e) {
    return res.status(500).json({ message: `Error Checking Ownership ${e}` });
  }
};
// Create a new crop demand
router.post(
  "/new",
  [
    check("cropType", "Crop Type is required").isString().notEmpty(),
    check("quantity", "Quantity is required").isNumeric().notEmpty(),
    check("location", "Location is required").isString().notEmpty(),
    check("details", "Details is required").isString().notEmpty(),
    check("lastDate", "Last Date is required").isDate().notEmpty(),
  ],
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    try {
      const { cropType, quantity, location, details, lastDate } = req.body;

      if (req.user?.role !== "company")
        return res.status(500).json({ message: "No Permission" });
      const newDemand = new CropDemand({
        companyId: req.user?.userId,
        cropType,
        quantity,
        location,
        details,
        lastDate,
      });

      await newDemand.save();
      res.status(201).json(newDemand);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong", e });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const allCropDemands = await CropDemand.find({}).lean();
    if (!allCropDemands)
      return res.status(404).json({ message: "No Crop Demand Found" });
    return res.status(200).json(allCropDemands);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get(
  "/:cropDemandId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { cropDemandId } = req.params;
      const cropDemand = await CropDemand.findById(cropDemandId)
        .lean()
        .populate("bids");

      if (!cropDemand) {
        return res.status(404).json({ message: "Crop Demand not found" });
      }

      res.status(200).json(cropDemand);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/:cropDemandId/edit",
  verifyToken,
  checkOwnership,
  async (req: AuthRequest, res: Response) => {
    try {
      const { cropDemandId } = req.params;
      const { cropType, quantity, location, requiredBy, details, lastDate } =
        req.body;

      const updatedDemand = await CropDemand.findByIdAndUpdate(
        cropDemandId,
        {
          cropType,
          quantity,
          location,
          requiredBy,
          details,
          lastDate,
        },
        { new: true, runValidators: true } // Return the updated document
      );

      if (!updatedDemand) {
        return res.status(404).json({ message: "Crop Demand not found" });
      }

      res.status(200).json(updatedDemand);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong while updating" });
    }
  }
);

router.delete(
  "/:cropDemandId/delete",
  verifyToken,
  checkOwnership,
  async (req: AuthRequest, res: Response) => {
    try {
      const { cropDemandId } = req.params;
      //   res.send(cropDemandId);
      const cropDemand = await CropDemand.findById(cropDemandId);
      if (!cropDemand) return res.status(404).json({ message: "Not Found" });
      await CropDemand.findByIdAndDelete(cropDemandId);

      res.status(200).json({ message: "Crop Demand deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong while deleting" });
    }
  }
);

router.get(
  "/:cropDemandId/bids",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "company")
      return res.status(500).json({ message: "Not Allowed" });
    try {
      const { cropDemandId } = req.params;
      const bids = await Bid.find({ demandId: cropDemandId })
        .populate("farmerId")
        .lean();
      res.status(200).json(bids);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch bids" });
    }
  }
);

router.get(
  "/:cropDemandId/bids/:bidId",
  async (req: Request, res: Response) => {
    try {
      const { cropDemandId, bidId } = req.params;

      // Find the demand by its ID
      const demand = await CropDemand.findById(cropDemandId);
      if (!demand) return res.status(404).json({ message: "No Demand Exists" });

      const bid = await Bid.findById(bidId)
        .populate("farmerId")
        .populate("demandId");
      res.status(200).json(bid);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch bid" });
    }
  }
);

// Accept Bid and Create Contract
router.put(
  "/:cropDemandId/bids/:bidId/accept",
  verifyToken,
  checkOwnership,
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "company")
      return res.status(403).json({ message: "Not Allowed" });

    try {
      const { cropDemandId, bidId } = req.params;

      // Accept the specific bid
      const acceptedBid = await Bid.findByIdAndUpdate(
        bidId,
        { status: "accepted" },
        { new: true }
      );

      if (!acceptedBid)
        return res.status(404).json({ message: "Bid not found" });

      // Reject all other bids for the same demand
      await Bid.updateMany(
        { _id: { $ne: bidId }, demandId: cropDemandId },
        { status: "rejected" }
      );

      // Close the crop demand
      const demand = await CropDemand.findById(cropDemandId);
      if (!demand) return res.status(404).json({ message: "No Demand Exist" });
      demand.status = "closed";
      await demand.save();
      const companyId = demand.companyId;
      // Create a contract between the company and the farmer
      const newContract = new Contract({
        cropDemandId: cropDemandId,
        bidId: bidId,
        companyId: companyId,
        farmerId: acceptedBid.farmerId, // Assuming Bid schema has a farmerId field
        buyerId: req.user.userId, // Assuming req.user._id is the company's ID
        agreedPrice: acceptedBid.bidAmount,
        quantity: demand.quantity,
        deliveryDate: demand.lastDate,
        status: "Pending",
      });

      const savedContract = await newContract.save();

      res.status(200).json({
        message: "Bid accepted, others rejected, and contract created",
        bid: acceptedBid,
        contract: savedContract,
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Failed to accept bid and create contract", e });
    }
  }
);

// Reject Bid
router.put(
  "/:cropDemandId/bids/:bidId/reject",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "company")
      return res.status(403).json({ message: "Not Allowed" });

    try {
      const { bidId } = req.params;
      const bid = await Bid.findByIdAndUpdate(
        bidId,
        { status: "rejected" },
        { new: true }
      );
      if (!bid) return res.status(404).json({ message: "Bid not found" });

      res.status(200).json({ message: "Bid rejected", bid });
    } catch (e) {
      res.status(500).json({ message: "Failed to reject bid" });
    }
  }
);

export default router;
