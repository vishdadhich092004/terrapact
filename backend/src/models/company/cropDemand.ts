import mongoose, { Schema } from "mongoose";
import { CropDemandType } from "../../shared/company/types";

const cropDemandSchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,

    ref: "Company",
    required: true,
  },
  cropType: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  details: { type: String },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  lastDate: { type: Date },
  bids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  perUnitPrice: {
    type: Number,
    required: true,
  },
});

const CropDemand = mongoose.model<CropDemandType>(
  "CropDemand",
  cropDemandSchema
);
export default CropDemand;
