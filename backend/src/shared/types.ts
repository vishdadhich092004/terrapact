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
