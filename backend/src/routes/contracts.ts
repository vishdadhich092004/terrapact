import express, { Request, Response } from "express";
import { verifyToken, AuthRequest } from "../middleware/auth";
import Contract from "../models/contract";

const router = express.Router();

// GET /contracts/my-contracts - Retrieve contracts for the logged-in user (company or farmer)
router.get(
  "/my-contracts",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      let contracts;

      if (req.user?.role === "company") {
        // Retrieve contracts where the company is the buyer
        contracts = await Contract.find({ companyId: req.user.userId })
          .populate("farmerId", "name email") // Populate with farmer details
          .populate("cropDemandId", "cropType quantity");
      } else if (req.user?.role === "farmer") {
        // Retrieve contracts where the farmer is the seller
        contracts = await Contract.find({ farmerId: req.user.userId })
          .populate("companyId") // Populate with company details
          .populate("cropDemandId", "cropType quantity");
      } else {
        return res.status(403).json({ message: "Not Allowed" });
      }

      res.status(200).json(contracts);
    } catch (e) {
      console.error("Error retrieving contracts:", e);
      res.status(500).json({ message: "Failed to retrieve contracts" });
    }
  }
);

export default router;
