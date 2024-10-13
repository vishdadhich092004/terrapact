import express from "express";
import { verifyToken } from "../middleware/auth";
import { checkOwnershipForContract } from "../middleware/ownership";
import * as contractControllers from "../controllers/contractControllers";
const router = express.Router();

// GET /contracts/my-contracts - Retrieve contracts for the logged-in user (company or farmer)
router.get("/my-contracts", verifyToken, contractControllers.getMyContracts);

router.get("/:contractId", verifyToken, contractControllers.getAContract);

router.patch(
  "/:contractId/status",
  verifyToken,
  checkOwnershipForContract,
  contractControllers.updateStatusOfContract
);

export default router;
