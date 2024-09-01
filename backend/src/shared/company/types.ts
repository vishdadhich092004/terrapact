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
  quantity: string;
  location: string;
  requiredBy: Date;
  details: string;
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
};
