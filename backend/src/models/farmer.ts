import mongoose from "mongoose";
import { FarmerType } from "../shared/types";
import bcrypt from "bcrypt";

const farmerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }, // Farmer's name
  farmSize: { type: Number, required: true }, // Farm size in acres/hectares
  contactNumber: { type: String, required: true }, // Contact number
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "farmer" },
});

// encoding the pass b4 pushing to db
farmerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Farmer = mongoose.model<FarmerType>("Farmer", farmerSchema);

export default Farmer;
