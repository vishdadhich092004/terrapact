import { validationResult } from "express-validator";
import CropDemand from "../models/company/cropDemand";
import crypto from "crypto";
import { Request, Response } from "express";
import { s3 } from "../config/awss3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME!;

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

export const createNewCropDemand = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const file = req.file as Express.Multer.File;

    // Check if the file was uploaded
    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Upload the file to S3
    const imageName = await uploadFileToS3(file, "image");

    const { cropType, quantity, location, details, lastDate } = req.body;

    // Convert `lastDate` to a Date object
    const parsedLastDate = new Date(lastDate);

    // Ensure the user has the "company" role
    if (req.user?.role !== "company") {
      return res.status(403).json({ message: "No Permission" });
    }

    // Create a new crop demand
    const newDemand = new CropDemand({
      companyId: req.user?.userId,
      cropType,
      quantity,
      location,
      details,
      lastDate: parsedLastDate,
      image: imageName,
    });

    // Save the new demand to the database
    await newDemand.save();
    res.status(201).json(newDemand);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

export const getAllCropDemands = async (req: Request, res: Response) => {
  try {
    const allCropDemands = await CropDemand.find({})
      .populate("companyId")
      .populate("bids")
      .lean();
    if (!allCropDemands)
      return res.status(404).json({ message: "No Crop Demand Found" });
    return res.status(200).json(allCropDemands);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

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

    res.status(200).json(cropDemand);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCropDemand = async (req: Request, res: Response) => {
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
};

export const deleteCropDemand = async (req: Request, res: Response) => {
  try {
    const { cropDemandId } = req.params;
    const cropDemand = await CropDemand.findById(cropDemandId);
    if (!cropDemand) return res.status(404).json({ message: "Not Found" });
    await CropDemand.findByIdAndDelete(cropDemandId);

    res.status(200).json({ message: "Crop Demand deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong while deleting" });
  }
};
