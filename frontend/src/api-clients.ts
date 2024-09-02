import { CompanyRegisterFormData } from "./pages/Company/Auth/Register";
import { CompanySignInFormData } from "./pages/Company/Auth/SignIn";
import { CropDemandData } from "./pages/Company/CropDemand/NewCropDemand";
import { FarmerRegisterFormData } from "./pages/Farmer/Auth/Register";
import { FarmerSignInFormData } from "./pages/Farmer/Auth/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerCompany = async (formData: CompanyRegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/company/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
};

// to be changed at the backedn

export const signInCompany = async (formData: CompanySignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/company/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const registerFarmer = async (formData: FarmerRegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/farmer/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
};
// to be changed at the backedn

export const signInFarmer = async (formData: FarmerSignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/farmer/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    console.error("Response Error:", await response.text());
    throw new Error("Token invalid");
  }

  const data = await response.json();
  return data;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) throw new Error("Error during Signout");
};

export const newCropDemand = async (formData: CropDemandData) => {
  const response = await fetch(`${API_BASE_URL}/api/crop-demands/new`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};
