import { NextFunction, Request, Response } from "express";
import CropDemand from "../models/company/cropDemand";
import Contract from "../models/contract";
import Bid from "../models/farmer/bid";

export const checkOwnershipForCropDemand = async (
  req: Request,
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

export const checkOwnershipForContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "contract Not Found" });

    if (contract.companyId.toString() !== req.user?.userId)
      return res.status(403).json({ message: "You dont have permission" });
    next();
  } catch (e) {
    return res.status(500).json({ message: `Error Checking Ownership ${e}` });
  }
};

export const checkOwnershipForBid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bidId } = req.params;
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid Not Found" });

    if (bid.farmerId.toString() !== req.user?.userId)
      return res.status(403).json({ message: "You dont have permission" });
    next();
  } catch (e) {
    return res.status(500).json({ message: `Error Checking Ownership ${e}` });
  }
};
