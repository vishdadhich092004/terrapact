import { CropDemandType } from "../company/types";
import { ContractType } from "../types";

export type FarmerType = {
  _id: string;
  name: string;
  email: string;
  farmSize: number;
  contactNumber: string;
  password: string;
  createdAt: Date;
  role: string;
  contracts: ContractType[];
  bids: BidType[];
};

export type BidType = {
  _id: string;
  demandId: CropDemandType;
  farmerId: FarmerType;
  bidAmount: number;
  status: string;
  message: string;
  createdAt: Date;
};
