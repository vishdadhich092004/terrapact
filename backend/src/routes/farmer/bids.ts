import express, { Request, Response } from "express";
import Bid from "../../models/farmer/bid";
import CropDemand from "../../models/company/cropDemand";
import { verifyToken } from "../../middleware/auth"; // Assumes you have an auth middleware
import { AuthRequest } from "../../middleware/auth";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/:demandId/bids/new",
  [
    check("bidAmount", "Bid Amount is required").isNumeric().notEmpty(),
    check("message", "Message is required").isString().notEmpty(),
  ],
  verifyToken,

  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    try {
      const { demandId } = req.params;
      const { bidAmount, message } = req.body;

      const farmerId = req.user?.userId;

      if (req.user?.role !== "farmer")
        return res.status(403).json({ message: "Not Allowed" });

      const cropDemand = await CropDemand.findById(demandId);
      if (!cropDemand)
        return res.status(404).json({ message: "Crop Demand Not found" });

      const newBid = new Bid({
        demandId,
        farmerId,
        bidAmount,
        message,
      });
      await newBid.save();
      cropDemand.bids.push(newBid);
      await cropDemand.save();
      return res.status(201).json(newBid);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong at backend", e });
    }
  }
);

router.get("/my-bids", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role.toString() !== "farmer") {
      return res.status(403).json({ message: "Not Allowed" });
    }

    const farmerId = req.user.userId;
    const bids = await Bid.find({ farmerId: farmerId });

    if (bids.length === 0) {
      return res.status(404).json({ message: "No Bids for the user" });
    }

    return res.status(200).json(bids);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong at backend", error: e });
  }
});

export default router;
