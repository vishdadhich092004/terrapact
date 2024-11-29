export type ContractType = {
  _id: string;
  farmerId: FarmerType;
  companyId: CompanyType;
  cropDemandId: CropDemandType;
  bidId: BidType;
  agreedPrice: number;
  deliveryDate: Date;
  quantity: number;
  status: string;
  createdAt: Date;
};

export type CompanyType = {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  contactNumber: string;
  industryType: string;
  createdAt: string;
  role: string;
  contracts: ContractType[];
  cropDemands: CropDemandType[];
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
  perUnitPrice: number;
};

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
