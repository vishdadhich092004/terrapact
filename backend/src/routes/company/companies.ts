import express, { Request, Response } from "express";
import CropDemand from "../../models/company/cropDemand";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();
// GET all Crop Demands created by a particular company
router.get("/my-demands", verifyToken, async (req: Request, res: Response) => {
  try {
    const companyId = req.user?.userId; // Assuming the user ID in the JWT is the company ID
    if (!companyId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const companyDemands = await CropDemand.find({ companyId }).lean();

    if (!companyDemands.length) {
      return res
        .status(404)
        .json({ message: "No Crop Demands found for this company" });
    }

    return res.status(200).json(companyDemands);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
