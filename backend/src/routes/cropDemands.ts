import express from "express";
import { verifyToken } from "../middleware/auth";
import { check } from "express-validator";
import * as bidControllers from "../controllers/bidControllers";
import * as cropdemandControllers from "../controllers/cropdemandControllers";
import { checkOwnershipForCropDemand } from "../middleware/ownership";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new crop demand
router.post(
  "/new",
  upload.single("image"),
  [
    check("cropType", "Crop Type is required").isString().notEmpty(),
    check("quantity", "Quantity is required").isNumeric().notEmpty(),
    check("location", "Location is required").isString().notEmpty(),
    check("details", "Details is required").isString().notEmpty(),
    check("perUnitPrice", "Per Unit Price is required").isNumeric().notEmpty(),
    // check("lastDate", "Last Date is required").isDate().notEmpty(),
  ],
  verifyToken,
  cropdemandControllers.createNewCropDemand
);

router.get("/", cropdemandControllers.getAllCropDemands);

router.get("/:cropDemandId", verifyToken, cropdemandControllers.getACropDemand);

router.get(
  "/:cropDemandId/bids",
  verifyToken,
  bidControllers.getAllBidsForACropDemand
);

router.get("/:cropDemandId/bids/:bidId", bidControllers.getABid);

// Accept Bid and Create Contract
router.put(
  "/:cropDemandId/bids/:bidId/accept",
  verifyToken,
  checkOwnershipForCropDemand,
  bidControllers.acceptBid
);

// Reject Bid
router.put(
  "/:cropDemandId/bids/:bidId/reject",
  verifyToken,
  bidControllers.rejectBid
);

export default router;
