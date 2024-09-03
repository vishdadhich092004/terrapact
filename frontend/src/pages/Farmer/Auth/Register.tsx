import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

type FarmerRegisterFormData = {
  name: string;
  email: string;
  farmSize: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};

function FarmerRegister() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FarmerRegisterFormData>();
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

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

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  const handleNext = () => setStep(prev => Math.min(prev + 1, 2));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const slideStyles = (active: boolean) => ({
    display: active ? "block" : "none",
    opacity: active ? 1 : 0,
    transform: active ? "translateX(0)" : "translateX(100%)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  });

  const progressBarStyles = (active: boolean) => ({
    flex: 1,
    height: "8px",
    backgroundColor: active ? "#3b82f6" : "#e5e7eb",
    margin: "0 5px",
    transition: "background-color 0.3s ease",
  });

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#AED065' }}>
      <div className="p-10 rounded-lg shadow-lg w-2/3" style={{ backgroundColor: '#738A41E8' }}>
        <h1 className="text-4xl text-white mb-6">PERSONAL DETAILS</h1>

        <div className="flex justify-between mb-6">
          <div style={progressBarStyles(step >= 1)} />
          <div style={progressBarStyles(step >= 2)} />
        </div>

        <form onSubmit={onSubmit}>
          <div style={slideStyles(step === 1)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-white">NAME</label>
                <input
                  type="text"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.name ? "border-red-500" : ""}`}
                  {...register("name", { required: "This field is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">EMAIL</label>
                <input
                  type="email"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.email ? "border-red-500" : ""}`}
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">FARM SIZE (in acres)</label>
                <input
                  type="text"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.farmSize ? "border-red-500" : ""}`}
                  {...register("farmSize", { required: "This field is required" })}
                />
                {errors.farmSize && <span className="text-red-500 text-sm">{errors.farmSize.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">CONTACT NUMBER</label>
                <input
                  type="text"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.contactNumber ? "border-red-500" : ""}`}
                  {...register("contactNumber", { required: "This field is required" })}
                />
                {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
              </div>
            </div>
          </div>

          <div style={slideStyles(step === 2)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-white">PASSWORD</label>
                <input
                  type="password"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "This field is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                  })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (!value) return "This field is required";
                      if (watch("password") !== value) return "Passwords do not match";
                    },
                  })}
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && <button type="button" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-black" onClick={handlePrev}>Previous</button>}
            {step < 2 ? (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-black" onClick={handleNext}>Next</button>
            ) : (
              <button type="submit" disabled={isSubmitting} className={`px-4 py-2 bg-orange-600 text-white rounded-md ${isSubmitting ? "bg-gray-400" : "hover:bg-orange-700"}`}>Save Changes</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegister;
