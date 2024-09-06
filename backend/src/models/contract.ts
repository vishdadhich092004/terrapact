import mongoose, { Schema } from "mongoose";
import { ContractType } from "../shared/types";

const contractSchema = new Schema({
  farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  cropDemandId: {
    type: Schema.Types.ObjectId,
    ref: "CropDemand",
    required: true,
  },
  bidId: { type: Schema.Types.ObjectId, ref: "Bid", required: true },
  agreedPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Active", "In Progess", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Contract = mongoose.model<ContractType>("Contract", contractSchema);

export default Contract;
