import { validationResult } from "express-validator";
import Farmer from "../models/farmer/farmer";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Company from "../models/company/company";

export const registerFarmer = async (req: Request, res: Response) => {
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
    farmer.role = "farmer";
    await farmer.save();
    const token = jwt.sign(
      { userId: farmer._id, role: farmer.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send(farmer);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const registerCompany = async (req: Request, res: Response) => {
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
      companyName,
      email,
      industryType,
      contactNumber,
      password,
    });
    company.role = "company";
    await company.save();
    const token = jwt.sign(
      { userId: company._id, role: company.role },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send(company);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong", e });
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: farmer._id, role: "farmer" },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json(farmer);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginCompany = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: company._id, role: "company" },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json(company);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.userId;
    let user;
    // // Determine if the user is a farmer or company and fetch accordingly
    if (req.user?.role === "farmer") {
      user = await Farmer.findById(req.user.userId);
    } else if (req.user?.role === "company") {
      user = await Company.findById(req.user.userId);
    } else {
      return res.status(404).json({ message: "Invalid user role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};