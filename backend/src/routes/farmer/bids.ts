import express, { Request, Response } from "express";
import Bid from "../../models/farmer/bid";
import CropDemand from "../../models/company/cropDemand";
import { verifyToken } from "../../middleware/auth"; // Assumes you have an auth middleware
import { AuthRequest } from "../../middleware/auth";

const router = express.Router();

// Create a new bid
router.post(
  "/:demandId/bid",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { demandId } = req.params;
      const { bidAmount, message } = req.body;
      const farmerId = req.user?.userId; // Assuming userId is stored in the token
      if (req.user?.role.toString() !== "farmer") {
        return res.status(500).json({ message: "Not Allowed" });
      }
      // Ensure the crop demand exists
      const cropDemand = await CropDemand.findById(demandId);
      if (!cropDemand) {
        return res.status(404).json({ message: "Crop Demand not found" });
      }

      const newBid = new Bid({
        demandId,
        farmerId,
        bidAmount,
        message,
      });

      await newBid.save();

      res.status(201).json(newBid);
    } catch (error) {
      res.status(500).json({ message: "Failed to create bid", error });
    }
  }
);
router.get("/:demandId/bids", async (req: Request, res: Response) => {
  try {
    const { demandId } = req.params;

    const bids = await Bid.find({ demandId }).populate(
      "farmerId",
      "name email"
    ); // Populate farmer details if needed

    if (!bids.length) {
      return res.status(404).json({ message: "No bids found for this demand" });
    }

    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bids", error });
  }
});

// Update bid status (accept/reject)
router.put(
  "/:bidId/status",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { bidId } = req.params;
      const { status } = req.body; // status should be "accepted" or "rejected"

      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const bid = await Bid.findById(bidId).populate("demandId");

      if (!bid) {
        return res.status(404).json({ message: "Bid not found" });
      }

      if (bid.demandId.companyId.toString() !== req.user?.userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this bid" });
      }

      bid.status = status;
      await bid.save();

      res.status(200).json(bid);
    } catch (error) {
      res.status(500).json({ message: "Failed to update bid status", error });
    }
  }
);

export default router;
