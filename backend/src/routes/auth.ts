import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Farmer from "../models/farmer";
import jwt from "jsonwebtoken";
import Company from "../models/company";
const router = express.Router();

router.post(
  "/farmer/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isString(),
    check("farmSize", "Farm Size is required").isString(),
    check("contactNumber", "Contact Number is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let farmer = await Farmer.findOne({ email: req.body.email });
      if (farmer) {
        return res.status(400).json({ message: "Farmer Already Registered" });
      }
      const { email, name, farmSize, contactNumber, password } = req.body;
      farmer = new Farmer({
        email,
        name,
        farmSize,
        contactNumber,
        password,
      });
      await farmer.save();
      const token = jwt.sign(
        { userId: farmer._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 864000000,
      });
      return res.status(200).send(farmer);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/company/register",
  [
    check("companyName", "Company Name is required").isString(),
    check("email", "Email is required").isString(),
    check("contactNumber", "Contact Number is required").isString(),
    check("industryType", "Industry Type is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let company = await Company.findOne({ email: req.body.email });
      if (company) {
        return res.status(400).json({ message: "Company Already Registered" });
      }
      const { email, companyName, contactNumber, password, industryType } =
        req.body;
      company = new Company({
        email,
        companyName,
        contactNumber,
        industryType,
        password,
      });
      await company.save();
      const token = jwt.sign(
        { userId: company._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 864000000,
      });
      return res.status(200).send(company);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Something went wrong", e });
    }
  }
);

export default router;
