import express from "express";
import { verifyToken } from "../../middleware/auth"; // Assumes you have an auth middleware
import { check } from "express-validator";
import * as bidControllers from "../../controllers/bidControllers";
const router = express.Router();

router.post(
  "/:demandId/bids/new",
  [
    check("bidAmount", "Bid Amount is required").isNumeric().notEmpty(),
    check("message", "Message is required").isString().notEmpty(),
  ],
  verifyToken,
  bidControllers.createNewBid
);

router.get("/my-bids", verifyToken, bidControllers.getAllBidsForFarmer);

export default router;
