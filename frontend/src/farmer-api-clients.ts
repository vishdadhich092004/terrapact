import { FarmerRegisterFormData } from "./pages/Farmer/Auth/Register";
import { FarmerSignInFormData } from "./pages/Farmer/Auth/SignIn";
import { BidType } from "../../backend/src/shared/farmer/types";
import { CropDemandType } from "../../backend/src/shared/company/types";
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

export const createBid = async (
  demandId: string,
  bidAmount: number,
  message: string
): Promise<BidType> => {
  const response = await fetch(`/api/crop-demands/${demandId}/bid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bidAmount, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to create bid");
  }

  return response.json();
};

export const getBidsForDemand = async (
  demandId: string
): Promise<BidType[]> => {
  const response = await fetch(`/api/crop-demands/${demandId}/bids`);

  if (!response.ok) {
    throw new Error("Failed to fetch bids");
  }

  return response.json();
};

export const getMyBids = async (): Promise<BidType[]> => {
  const response = await fetch("/api/bids/my-bids");

  if (!response.ok) {
    throw new Error("Failed to fetch my bids");
  }

  return response.json();
};

export const getAllCropDemandsForFarmer = async (): Promise<
  CropDemandType[]
> => {
  const response = await fetch(`${API_BASE_URL}/api/crop-demands`, {
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

export const updateBidStatus = async (
  bidId: string,
  status: string
): Promise<BidType> => {
  const response = await fetch(`/api/bids/${bidId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update bid status");
  }

  return response.json();
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
