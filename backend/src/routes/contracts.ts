import express, { NextFunction, Request, Response } from "express";
import { verifyToken, AuthRequest } from "../middleware/auth";
import Contract from "../models/contract";

const router = express.Router();

const checkOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findById(contractId);
    if (!contract)
      return res.status(404).json({ message: "contract Not Found" });

    if (contract.companyId.toString() !== req.user?.userId)
      return res.status(403).json({ message: "You dont have permission" });
    next();
  } catch (e) {
    return res.status(500).json({ message: `Error Checking Ownership ${e}` });
  }
};

// GET /contracts/my-contracts - Retrieve contracts for the logged-in user (company or farmer)
router.get(
  "/my-contracts",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      let contracts;

      if (req.user?.role === "company") {
        // Retrieve contracts where the company is the buyer
        contracts = await Contract.find({ companyId: req.user.userId })
          .populate("farmerId", "name email") // Populate with farmer details
          .populate("cropDemandId", "cropType quantity");
      } else if (req.user?.role === "farmer") {
        // Retrieve contracts where the farmer is the seller
        contracts = await Contract.find({ farmerId: req.user.userId })
          .populate("companyId") // Populate with company details
          .populate("cropDemandId", "cropType quantity");
      } else {
        return res.status(403).json({ message: "Not Allowed" });
      }

      res.status(200).json(contracts);
    } catch (e) {
      console.error("Error retrieving contracts:", e);
      res.status(500).json({ message: "Failed to retrieve contracts" });
    }
  }
);

router.get(
  "/:contractId",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    const { contractId } = req.params;
    try {
      const contract = await Contract.findById(contractId);
      if (!contract) {
        return res.status(404).json({ message: "No Contract Found" });
      }
      await contract.populate("farmerId", "name");
      return res.status(200).json(contract);
    } catch (e) {
      return res.status(500).json({ message: "Error retrieving contract", e });
    }
  }
);

router.patch(
  "/:contractId/status",
  verifyToken,
  checkOwnership,
  async (req: Request, res: Response) => {
    const { contractId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      // Update the contract status
      const updatedContract = await Contract.findByIdAndUpdate(
        contractId,
        { status },
        { new: true } // Return the updated document
      );

      if (!updatedContract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      return res.status(200).json(updatedContract);
    } catch (e) {
      console.error(e); // Log error for debugging
      return res
        .status(500)
        .json({ message: "Error updating contract status", e });
    }
  }
);

export default router;
