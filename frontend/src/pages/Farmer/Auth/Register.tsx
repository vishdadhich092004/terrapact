import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type FarmerRegisterFormData = {
  name: string;
  email: string;
  farmSize: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};

function FarmerRegister() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FarmerRegisterFormData>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});

  const mutation = useMutation(apiClient.registerFarmer, {
    onSuccess: async () => {
      showToast({ message: "Farmer Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message || "Registration failed", type: "ERROR" });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-green-400">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-xl shadow-2xl max-w-3xl w-full">
        <form className="space-y-8" onSubmit={onSubmit}>
          <h2 className="text-4xl font-bold text-center mb-6">Farmer Registration</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.name || watch("name") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Name
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Name"
                {...register("name", { required: "This field is required" })}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.email || watch("email") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Email
              </span>
              <input
                type="email"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email"
                {...register("email", { required: "This field is required" })}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.farmSize || watch("farmSize") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Farm Size (in acres)
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.farmSize ? "border-red-500" : ""
                }`}
                placeholder="Farm Size"
                {...register("farmSize", { required: "This field is required" })}
                onFocus={() => handleFocus("farmSize")}
                onBlur={() => handleBlur("farmSize")}
              />
              {errors.farmSize && (
                <span className="text-red-500 text-sm mt-1">{errors.farmSize.message}</span>
              )}
            </label>

            <label className="relative block">
              <span className={`text-white font-medium transition-all duration-300 ${isFocused.contactNumber || watch("contactNumber") ? "text-xs top-0 left-0" : "text-base top-1/2 left-2.5 transform -translate-y-1/2"}`}>
                Contact Number
              </span>
              <input
                type="text"
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
                className={`mt-2 block w-full p-3 border border-white rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
                  ? "bg-green-400 text-white cursor-not-allowed"
                  : "bg-white text-green-600 hover:bg-green-500 hover:text-white transform hover:scale-105"
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

export default FarmerRegister;
