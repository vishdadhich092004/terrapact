import express from "express";
import { verifyToken } from "../../middleware/auth";
import { check } from "express-validator";
import * as bidControllers from "../../controllers/bidControllers";
import * as cropdemandControllers from "../../controllers/cropdemandControllers";
import { checkOwnershipForCropDemand } from "../../middleware/ownership";
const router = express.Router();

// Create a new crop demand
router.post(
  "/new",
  [
    check("cropType", "Crop Type is required").isString().notEmpty(),
    check("quantity", "Quantity is required").isNumeric().notEmpty(),
    check("location", "Location is required").isString().notEmpty(),
    check("details", "Details is required").isString().notEmpty(),
    check("lastDate", "Last Date is required").isDate().notEmpty(),
  ],
  verifyToken,
  cropdemandControllers.createNewCropDemand
);

router.get("/", cropdemandControllers.getAllCropDemands);

router.get("/:cropDemandId", verifyToken, cropdemandControllers.getACropDemand);

router.put(
  "/:cropDemandId/edit",
  verifyToken,
  checkOwnershipForCropDemand,
  cropdemandControllers.updateCropDemand
);

router.delete(
  "/:cropDemandId/delete",
  verifyToken,
  checkOwnershipForCropDemand,
  cropdemandControllers.deleteCropDemand
);

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
