import { CropDemandType } from "../../backend/src/shared/types";
import { FarmerRegisterFormData } from "./pages/Farmer/Auth/Register";
import { FarmerSignInFormData } from "./pages/Farmer/Auth/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

export const getAllCropDemandsForFarmer = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  allCropDemands: CropDemandType[];
  currentPage: number;
  cropDemandsPerPage: number;
  totalCropDemands: number;
}> => {
  const response = await fetch(
    `${API_BASE_URL}/api/crop-demands?page=${page}&limit=${limit}`,
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

export const getCropDemandByIdForFarmer = async (cropDemandId: string) => {
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

export const createBid = async (
  demandId: string,
  bidAmount: number,
  message: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/farmers/${demandId}/bids/new`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bidAmount, message }),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit a bid");
  }
  return response.json();
};

export const allBidsForAFarmer = async () => {
  const response = await fetch(`${API_BASE_URL}/api/farmers/my-bids`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching Bids");
  return response.json();
};

export const getABidForFarmer = async (bidId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/farmers/my-bids/${bidId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getFarmerContracts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/contracts/my-contracts`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch the contracts");
  return response.json();
};

export const getContractById = async (contractId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/contracts/${contractId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching contract");

  return response.json();
};
