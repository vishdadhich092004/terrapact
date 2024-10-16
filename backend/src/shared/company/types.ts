import { BidType } from "../farmer/types";

export type CompanyType = {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  contactNumber: string;
  industryType: string;
  createdAt: string;
  role: string;
};

export type CropDemandType = {
  _id: string;
  companyId: CompanyType;
  cropType: string;
  quantity: number;
  lastDate: Date;
  location: string;
  details: string;
  bids: BidType[];
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
  image: string;
};
