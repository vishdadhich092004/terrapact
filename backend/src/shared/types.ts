export type FarmerType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  farmSize: number;
  contactNumber: string;
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
};
