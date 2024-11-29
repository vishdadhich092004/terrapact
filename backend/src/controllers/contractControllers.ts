import { Request, Response } from "express";
import Contract from "../models/contract";

// BEING GENERALISED FOR THE BOTH THE TYPE OF USERS
export const getMyContracts = async (req: Request, res: Response) => {
  try {
    let contracts;

    if (req.user?.role === "company") {
      // Retrieve contracts forthe company
      contracts = await Contract.find({ companyId: req.user.userId })
        .populate("farmerId") // Populate with farmer details
        .populate("cropDemandId")
        .populate("bidId")
        .populate("companyId");
    } else if (req.user?.role === "farmer") {
      // Retrieve contracts for the farmer
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
};

// again a generalised route for the farmers and companies
export const getAContract = async (req: Request, res: Response) => {
  const { contractId } = req.params;
  try {
    const contract = await Contract.findById(contractId)
      .populate("bidId")
      .populate("companyId")
      .populate("cropDemandId");
    if (!contract) {
      return res.status(404).json({ message: "No Contract Found" });
    }
    await contract.populate("farmerId", "name");

    return res.status(200).json(contract);
  } catch (e) {
    return res.status(500).json({ message: "Error retrieving contract", e });
  }
};

// special route for the companies to update the status of the contract
export const updateStatusOfContract = async (req: Request, res: Response) => {
  const { contractId } = req.params;
  const { status } = req.body;

  // farmers should not access this route
  if (req.user?.role.toString() !== "company") {
    return res.status(403).json({ message: "Not Allowed" });
  }
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
};
