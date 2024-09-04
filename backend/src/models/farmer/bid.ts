import mongoose, { Schema } from "mongoose";
import { BidType } from "../../shared/farmer/types";

const bidSchema: Schema = new Schema({
  demandId: {
    type: Schema.Types.ObjectId,
    ref: "CropDemand",
    required: true,
  },
  farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  bidAmount: { type: Number, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Bid = mongoose.model<BidType>("Bid", bidSchema);

export default Bid;
