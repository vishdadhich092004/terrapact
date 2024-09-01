import express, { NextFunction, Request, Response } from "express";

import CropDemand from "../../models/company/cropDemand";
import { verifyToken, AuthRequest } from "../../middleware/auth"; // Assuming you have a JWT middleware

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
    const { cropType, quantity, location, requiredBy, details } = req.body;
    const newDemand = new CropDemand({
      companyId: req.user?.userId,
      cropType,
      quantity,
      location,
      requiredBy,
      details,
    });
    await newDemand.save();
    res.status(201).json(newDemand);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
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
      res.status(200).json(cropDemand);
      //   const deletedDemand = await CropDemand.findByIdAndDelete(cropDemandId);

      //   if (!deletedDemand) {
      //     return res.status(404).json({ message: "Crop Demand not found" });
      //   }

      //   res.status(200).json({ message: "Crop Demand deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong while deleting" });
    }
  }
);

export default router;
