import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const MONGO_URL = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTED");
  })
  .catch(() => {
    console.log("MONGO CONNECTION ISSUE");
  });

app.get("/test", (req: Request, res: Response) => {
  res.send("Hiiiii");
});

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.listen(2000, () => {
  console.log("Port 2000 Activated");
});
