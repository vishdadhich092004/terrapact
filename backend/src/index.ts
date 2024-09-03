import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import authRoutes from "./routes/auth";
import companyRoutes from "./routes/company/companies";
import bidRoutes from "./routes/farmer/bids";
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
app.use("/api/crop-demands", cropDemandRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/farmers", bidRoutes);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.listen(2000, () => {
  console.log("Port 2000 Activated");
});
