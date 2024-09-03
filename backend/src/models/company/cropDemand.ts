import mongoose, { Schema } from "mongoose";
import { CropDemandType } from "../../shared/company/types";

const cropDemandSchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  cropType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
  status: { type: String, enum: ["open", "closed"], default: "open" },
});

const CropDemand = mongoose.model<CropDemandType>(
  "CropDemand",
  cropDemandSchema
);
export default CropDemand;
