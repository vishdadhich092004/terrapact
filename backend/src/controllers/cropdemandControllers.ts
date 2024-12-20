import { validationResult } from "express-validator";
import CropDemand from "../models/cropDemand";
import crypto from "crypto";
import { Request, Response } from "express";
import { getSignedUrlForCropDemand, s3 } from "../config/awss3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Company from "../models/company";

const bucketName = process.env.AWS_BUCKET_NAME!;

// HELPER FUNCTION TO UPLOAD THE FILES TO AWS S3
async function uploadFileToS3(
  file: Express.Multer.File,
  prefix: string
): Promise<string> {
  const randomName = crypto.randomBytes(16).toString("hex");
  const key = `crop-demand/${prefix}/${randomName}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  await s3.send(new PutObjectCommand(params));
  return key;
}

// FOR COMAPNIES:

// create a new crop demand
export const createNewCropDemand = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    // FARMERS SHOULD NOT ACCCESS THIS ROUTE
    if (req.user?.role !== "company") {
      return res.status(403).json({ message: "No Permission" });
    }
    const file = req.file as Express.Multer.File;

    // Check if the file was uploaded
    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const company = await Company.findById(req.user.userId);

    // Upload the file to S3
    const imageName = await uploadFileToS3(file, "image");

    const { cropType, quantity, location, details, lastDate, perUnitPrice } =
      req.body;

    // Convert `lastDate` to a Date object
    const parsedLastDate = new Date(lastDate);
    // Create a new crop demand
    const newDemand = new CropDemand({
      companyId: req.user?.userId,
      cropType,
      quantity,
      location,
      details,
      lastDate: parsedLastDate,
      image: imageName,
      perUnitPrice,
    });

    // Save the new demand to the database
    await newDemand.save();
    company?.cropDemands.push(newDemand);
    await company?.save();
    res.status(201).json(newDemand);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

// FOR FARMERS:

// get all crop demands for the farmers
export const getAllCropDemands = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const limitNumber = limit ? parseInt(limit as string, 10) : 10;

    let cropDemandsQuery = CropDemand.find({})
      .sort({ _id: -1 })
      .populate("companyId")
      .populate("bids")
      .lean();

    if (pageNumber && limitNumber) {
      cropDemandsQuery = cropDemandsQuery
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    }

    const allCropDemands = await cropDemandsQuery;
    const cropDemandsWithSignedUrls = await Promise.all(
      allCropDemands.map(async (cropDemand) => {
        const image = await getSignedUrlForCropDemand(cropDemand);
        return { ...cropDemand, image };
      })
    );

    const totalCropDemands = await CropDemand.countDocuments();

    res.status(200).json({
      currentPage: pageNumber,
      totalCropDemands,
      cropDemandsPerPage: limitNumber,
      allCropDemands: cropDemandsWithSignedUrls,
    });
  } catch (error) {
    console.error("Error fetching crop demands:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SINGLE CROP DEMAND
export const getACropDemand = async (req: Request, res: Response) => {
  try {
    const { cropDemandId } = req.params;
    const cropDemand = await CropDemand.findById(cropDemandId)
      .lean()
      .populate("companyId")
      .populate("bids");

    if (!cropDemand) {
      return res.status(404).json({ message: "Crop Demand not found" });
    }
    const image = await getSignedUrlForCropDemand(cropDemand);

    res.status(200).json({ ...cropDemand, image });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
