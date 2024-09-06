import { CompanyType, CropDemandType } from "./company/types";
import { BidType, FarmerType } from "./farmer/types";

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
  updatedAt: Date;
};
