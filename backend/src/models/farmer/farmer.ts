import mongoose from "mongoose";
import { FarmerType } from "../../shared/farmer/types";
import bcrypt from "bcrypt";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Farmer's name
  email: { type: String, required: true, unique: true },
  farmSize: { type: Number, required: true }, // Farm size in acres/hectares
  contactNumber: { type: String, required: true }, // Contact number
  password: { type: String, required: true },
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
