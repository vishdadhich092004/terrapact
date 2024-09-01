export type FarmerType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  farmSize: string;
  contactNumber: string;
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
