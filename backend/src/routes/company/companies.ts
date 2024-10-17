import express, { Request, Response } from "express";
import CropDemand from "../../models/company/cropDemand";
import { verifyToken } from "../../middleware/auth";
import { getSignedUrlForCropDemand } from "../../config/awss3";

const router = express.Router();
// GET all Crop Demands created by a particular company
router.get("/my-demands", verifyToken, async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 1;

    const companyId = req.user?.userId; // Assuming the user ID in the JWT is the company ID
    if (!companyId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let companyDemandsQuery = CropDemand.find({ companyId })
      .sort({ _id: -1 })
      .populate("companyId")
      .lean();

    if (pageNumber && limitNumber) {
      companyDemandsQuery = companyDemandsQuery
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    }
    const allCropDemands = await companyDemandsQuery;
    const cropDemandsWithSignedUrls = await Promise.all(
      allCropDemands.map(async (cropDemand) => {
        const image = await getSignedUrlForCropDemand(cropDemand);
        return { ...cropDemand, image };
      })
    );

    const totalCropDemands = await CropDemand.find({
      companyId,
    }).countDocuments();

    res.status(200).json({
      currentPage: pageNumber,
      totalCropDemands,
      cropDemandsPerPage: limitNumber,
      allCropDemands: cropDemandsWithSignedUrls,
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
