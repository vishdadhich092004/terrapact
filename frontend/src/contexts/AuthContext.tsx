import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { validateToken } from "../api-clients"; // Adjust import path as necessary
import Loader from "../components/Loader";

// Define types for user and context
type User = {
  _id: string;
  email: string;
  name: string;
  companyName: string;
  role: "farmer" | "company"; // Explicitly define roles
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  refetchUser: () => void;
  isFarmer: boolean; // Added a boolean to check if the user is a farmer
  isCompany: boolean; // Added a boolean to check if the user is a company
};

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use React Query's useQuery to fetch the user data
  const { data, refetch, isLoading } = useQuery(
    "validate-token",
    validateToken,
    { retry: false }
  );

  const user = data?.user || null;
  const isAuthenticated = Boolean(user);

  // Determine if the user is a farmer or a company
  const isFarmer = user?.role === "farmer";
  const isCompany = user?.role === "company";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        refetchUser: refetch,
        isFarmer,
        isCompany,
      }}
    >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
