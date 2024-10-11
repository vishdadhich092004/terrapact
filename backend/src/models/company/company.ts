import mongoose from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  industryType: { type: String, required: true },
  contactNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "company" },
});

// encoding the pass b4 pushing to db
companySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Company = mongoose.model("Company", companySchema);

export default Company;
