import express, { NextFunction, Request, Response } from "express";

import CropDemand from "../../models/company/cropDemand";
import { verifyToken, AuthRequest } from "../../middleware/auth"; // Assuming you have a JWT middleware
import Bid from "../../models/farmer/bid";

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
router.post("/new", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { cropType, quantity, location, details } = req.body;

    if (req.user?.role !== "company")
      return res.status(500).json({ message: "No Permission" });
    const newDemand = new CropDemand({
      companyId: req.user?.userId,
      cropType,
      quantity,
      location,
      details,
    });

    await newDemand.save();
    res.status(201).json(newDemand);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", e });
  }
});

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
      const { cropType, quantity, location, requiredBy, details } = req.body;

      const updatedDemand = await CropDemand.findByIdAndUpdate(
        cropDemandId,
        {
          cropType,
          quantity,
          location,
          requiredBy,
          details,
        },
        { new: true } // Return the updated document
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
  "/:demandId/bids",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "company")
      return res.status(500).json({ message: "Not Allowed" });
    try {
      const { demandId } = req.params;
      const bids = await Bid.find({ demandId }).populate("farmerId").lean();
      res.status(200).json(bids);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch bids" });
    }
  }
);

router.get("/:demandId/bids/:bidId", async (req: Request, res: Response) => {
  try {
    const { demandId, bidId } = req.params;

    // Find the demand by its ID
    const demand = await CropDemand.findById(demandId);
    if (!demand) return res.status(404).json({ message: "No Demand Exists" });

    // Find the bid within the demand's bids array
    // let bid = demand.bids.find((bid) => bid._id.toString() === bidId);
    // if (!bid) return res.status(404).json({ message: "Bid not found" });

    const bid = await Bid.findById(bidId)
      .populate("farmerId")
      .populate("demandId");
    res.status(200).json(bid);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch bid" });
  }
});

// Accept Bid
router.put(
  "/:demandId/bids/:bidId/accept",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "company")
      return res.status(403).json({ message: "Not Allowed" });

    try {
      const { demandId, bidId } = req.params;

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
        { _id: { $ne: bidId }, demandId: demandId },
        { status: "rejected" }
      );
      const demand = await CropDemand.findById(demandId);
      if (!demand) return res.status(404).json({ message: "No Demand Exist" });
      demand.status = "closed";
      res.status(200).json({
        message: "Bid accepted and others rejected",
        bid: acceptedBid,
      });
    } catch (e) {
      res.status(500).json({ message: "Failed to accept bid" });
    }
  }
);

// Reject Bid
router.put(
  "/:demandId/bids/:bidId/reject",
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
