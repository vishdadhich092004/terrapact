import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import authRoutes from "./routes/auth";
import farmerRoutes from "./routes/farmers";
import companyRoutes from "./routes/companies";
import cropDemandRoutes from "./routes/company/cropDemands";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const MONGO_URL = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTED");
  })
  .catch(() => {
    console.log("MONGO CONNECTION ISSUE");
  });

app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/crop-demands", cropDemandRoutes);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.listen(2000, () => {
  console.log("Port 2000 Activated");
});
