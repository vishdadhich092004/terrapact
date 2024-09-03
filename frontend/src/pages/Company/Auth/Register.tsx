import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export type CompanyRegisterFormData = {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  industryType: string;
  contactNumber: string;
};

function CompanyRegister() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompanyRegisterFormData>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});

  const mutation = useMutation(apiClient.registerCompany, {
    onSuccess: async () => {
      showToast({ message: "Company Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Registration error:", error); // Detailed error logging
      showToast({ message: error.message || "Oops! Something went wrong.", type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitting data:", JSON.stringify(data, null, 2)); // Debugging
    mutation.mutate(data);
  });

  const handleFocus = (field: string) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-2xl max-w-3xl w-full">
        <form className="space-y-8" onSubmit={onSubmit}>
          <h2 className="text-4xl font-bold text-center mb-6">Company Registration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.companyName || watch("companyName") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Company Name
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.companyName ? "border-red-500" : ""
                }`}
                placeholder="Company Name"
                {...register("companyName", { required: "This field is required" })}
                onFocus={() => handleFocus("companyName")}
                onBlur={() => handleBlur("companyName")}
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm mt-1">{errors.companyName.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.email || watch("email") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Company Email
              </span>
              <input
                type="email"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Company Email"
                {...register("email", { required: "This field is required" })}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.industryType || watch("industryType") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Industry Type
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.industryType ? "border-red-500" : ""
                }`}
                placeholder="Industry Type"
                {...register("industryType", { required: "This field is required" })}
                onFocus={() => handleFocus("industryType")}
                onBlur={() => handleBlur("industryType")}
              />
              {errors.industryType && (
                <span className="text-red-500 text-sm mt-1">{errors.industryType.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.contactNumber || watch("contactNumber") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Contact Number
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.contactNumber ? "border-red-500" : ""
                }`}
                placeholder="Contact Number"
                {...register("contactNumber", { required: "This field is required" })}
                onFocus={() => handleFocus("contactNumber")}
                onBlur={() => handleBlur("contactNumber")}
              />
              {errors.contactNumber && (
                <span className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.password || watch("password") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Password
              </span>
              <input
                type="password"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.confirmPassword || watch("confirmPassword") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Confirm Password
              </span>
              <input
                type="password"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  validate: (value) => {
                    if (!value) return "This field is required";
                    if (watch("password") !== value)
                      return "Passwords do not match";
                  },
                })}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
              )}
            </label>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-1/2 py-3 rounded-full font-semibold tracking-wide text-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-500 hover:text-white transform hover:scale-105"
              }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyRegister;
