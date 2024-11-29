import { validationResult } from "express-validator";
import CropDemand from "../models/cropDemand";
import Contract from "../models/contract";
import Bid from "../models/bid";
import { Request, Response } from "express";
import Company from "../models/company";
import Farmer from "../models/farmer";

// FOR COMPANIES:

// view all the bids for a particular crop demand
export const getAllBidsForACropDemand = async (req: Request, res: Response) => {
  // another company cannot see the bids of some other company'S CROP DEMAND
  if (req.user?.role !== "company")
    return res.status(500).json({ message: "Not Allowed" });
  try {
    const { cropDemandId } = req.params;
    const bids = await Bid.find({ demandId: cropDemandId })
      .populate("farmerId")
      .populate("demandId")
      .lean();
    res.status(200).json(bids);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

// view a particular bid for a particular crop demand
export const getABid = async (req: Request, res: Response) => {
  try {
    const { cropDemandId, bidId } = req.params;

    const demand = await CropDemand.findById(cropDemandId);
    if (!demand) return res.status(404).json({ message: "No Demand Exists" });

    const bid = await Bid.findById(bidId)
      .populate("farmerId")
      .populate("demandId");
    res.status(200).json(bid);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch bid" });
  }
};

// accepting a bid
export const acceptBid = async (req: Request, res: Response) => {
  // farmers should not access the accept bid route
  if (req.user?.role !== "company")
    return res.status(403).json({ message: "Not Allowed" });

  try {
    const { cropDemandId, bidId } = req.params;

    // Accept the specific bid
    const acceptedBid = await Bid.findByIdAndUpdate(
      bidId,
      { status: "accepted" },
      { new: true }
    );

    if (!acceptedBid) return res.status(404).json({ message: "Bid not found" });

    // Reject all other bids for the same demand
    await Bid.updateMany(
      { _id: { $ne: bidId }, demandId: cropDemandId },
      { status: "rejected" }
    );

    // Close the crop demand
    const demand = await CropDemand.findById(cropDemandId);
    if (!demand) return res.status(404).json({ message: "No Demand Exist" });
    demand.status = "closed";
    await demand.save();
    const companyId = demand.companyId;
    const farmerId = acceptedBid.farmerId;

    // Create a contract between the company and the farmer
    const newContract = new Contract({
      cropDemandId: cropDemandId,
      bidId: bidId,
      companyId: companyId,
      farmerId: acceptedBid.farmerId,
      agreedPrice: acceptedBid.bidAmount,
      quantity: demand.quantity,
      deliveryDate: demand.lastDate,
      status: "Pending",
    });

    // find the company for which the contract has been created.
    const savedContract = await newContract.save();
    const company = await Company.findById(companyId);

    company?.contracts.push(savedContract);
    await company?.save();
    // find the company for which the contract has been created.
    const farmer = await Farmer.findById(farmerId);
    farmer?.contracts.push(savedContract);
    await farmer?.save();

    res.status(200).json({
      message: "Bid accepted, others rejected, and contract created",
      bid: acceptedBid,
      contract: savedContract,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to accept bid and create contract", e });
  }
};

// rejecting a bid
export const rejectBid = async (req: Request, res: Response) => {
  // farmers should not access this route
  if (req.user?.role !== "company")
    return res.status(403).json({ message: "Not Allowed" });

  try {
    const { bidId } = req.params;
    const bid = await Bid.findByIdAndUpdate(
      bidId,
      { status: "rejected" },
      { new: true }
    );
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    res.status(200).json({ message: "Bid rejected", bid });
  } catch (e) {
    res.status(500).json({ message: "Failed to reject bid" });
  }
};

// COMPANIES CONTROLLERS ENDS HERE!!

// FOR FARMERS:

// creatingf a new bid
export const createNewBid = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  try {
    const { demandId } = req.params;
    const { bidAmount, message } = req.body;

    const farmerId = req.user?.userId;

    // companies cant create a bid
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
    // find the farmer
    const farmer = await Farmer.findById(farmerId);
    farmer?.bids.push(newBid);
    await farmer?.save();
    return res.status(201).json(newBid);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong at backend", e });
  }
};

// fetches all the bids for a particular farmer regardless of cropdemand
export const getAllBidsForFarmer = async (req: Request, res: Response) => {
  try {
    // companies should not access this route
    if (req.user?.role.toString() !== "farmer") {
      return res.status(403).json({ message: "Not Allowed" });
    }

    const farmerId = req.user.userId;
    const bids = await Bid.find({ farmerId: farmerId }).populate("demandId");

    if (bids.length === 0) {
      return res.status(404).json({ message: "No Bids for the user" });
    }

    return res.status(200).json(bids);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong at backend", error: e });
  }
};

// view a  particuar bid for the farmer
export const getABidForFarmer = async (req: Request, res: Response) => {
  try {
    const { bidId } = req.params;
    // companies should not access this route
    if (req.user?.role.toString() !== "farmer") {
      return res.status(403).json({ message: "Not Allowed" });
    }
    const bid = await Bid.findById(bidId)
      .populate("farmerId")
      .populate({
        path: "demandId",
        populate: {
          path: "companyId",
          model: "Company",
        },
      });
    res.status(200).json(bid);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch bid", e });
  }
};

// FARMER CONTROLLERS END HERE!!
