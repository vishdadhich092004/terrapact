import express from "express";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth";
import * as authControllers from "../controllers/authControllers";
const router = express.Router();

// Farmer Register Route
router.post("/farmer/register", [
  check("name", "Name is required").isString(),
  check("email", "Email is required").isString(),
  check("farmSize", "Farm Size is required").isNumeric(),
  check("contactNumber", "Contact Number is required").isString(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  authControllers.registerFarmer,
]);

// Company Register Route
router.post("/company/register", [
  check("companyName", "Company Name is required").isString(),
  check("email", "Email is required").isString(),
  check("contactNumber", "Contact Number is required").isString(),
  check("industryType", "Industry Type is required").isString(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  authControllers.registerCompany,
]);

// Farmer Login Route
router.post(
  "/farmer/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password cannot be empty").notEmpty(),
  ],
  authControllers.loginFarmer
);

// Company Login Route
router.post(
  "/company/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password cannot be empty").notEmpty(),
  ],
  authControllers.loginCompany
);

// validate-token
router.get("/validate-token", verifyToken, authControllers.validateToken);

// logout
router.post("/logout", authControllers.logout);

export default router;
