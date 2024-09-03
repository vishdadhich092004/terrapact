import { CropDemandType } from "../company/types";

export type FarmerType = {
  _id: string;
  name: string;
  email: string;
  farmSize: string;
  contactNumber: string;
  password: string;
  createdAt: Date;
  role: string;
};

export type BidType = {
  _id: string;
  demandId: CropDemandType;
  farmerId: string;
  bidAmount: string;
  status: string;
  message: string;
};
