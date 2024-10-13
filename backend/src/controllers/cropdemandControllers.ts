import { validationResult } from "express-validator";
import CropDemand from "../models/company/cropDemand";
import { Request, Response } from "express";

export const createNewCropDemand = async (req: Request, res: Response) => {
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
};

export const getAllCropDemands = async (req: Request, res: Response) => {
  try {
    const allCropDemands = await CropDemand.find({}).lean();
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
