import { CompanyRegisterFormData } from "./pages/Company/Auth/Register";
import { CompanySignInFormData } from "./pages/Company/Auth/SignIn";
import { EditCropDemandData } from "./pages/Company/CropDemand/EditCropDemand";
import { CropDemandData } from "./pages/Company/CropDemand/NewCropDemand";
import { CropDemandType } from "../../backend/src/shared/company/types";

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

export const editCropDemand = async (
  cropDemandId: string,
  formData: EditCropDemandData
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/crop-demands/${cropDemandId}/edit`,
    {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const getCropDemandByIdForCompany = async (
  cropDemandId: string
): Promise<CropDemandType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/crop-demands/${cropDemandId}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const getCompanyDemands = async (): Promise<CropDemandType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/company/my-demands`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};
