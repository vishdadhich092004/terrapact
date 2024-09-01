import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

type CompanyRegisterFormData = {
  companyName: string;
  email: string;
  industry: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};

function CompanyRegister() {
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompanyRegisterFormData>();
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.registerCompany, {
    onSuccess: async () => {
      showToast({ message: "Company Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message || "Registration failed", type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit(data => mutation.mutate(data));

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
    backgroundColor: active ? "#0056A0" : "#d1d5db",
    margin: "0 5px",
    transition: "background-color 0.3s ease",
  });

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#93B4FC' }}>
      <div className="p-10 rounded-lg shadow-lg w-2/3" style={{ backgroundColor: '#6D96F3' }}>
        <h1 className="text-4xl text-white mb-6">Company Registration</h1>

        <div className="flex justify-between mb-6">
          <div style={progressBarStyles(step >= 1)} />
          <div style={progressBarStyles(step >= 2)} />
        </div>

        <form onSubmit={onSubmit}>
          <div style={slideStyles(step === 1)}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-white">Company Name</label>
                <input
                  type="text"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.companyName ? "border-red-500" : ""}`}
                  {...register("companyName", { required: "This field is required" })}
                />
                {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">Email</label>
                <input
                  type="email"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.email ? "border-red-500" : ""}`}
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">Industry</label>
                <input
                  type="text"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.industry ? "border-red-500" : ""}`}
                  {...register("industry", { required: "This field is required" })}
                />
                {errors.industry && <span className="text-red-500 text-sm">{errors.industry.message}</span>}
              </div>

              <div className="col-span-2">
                <label className="text-white">Contact Number</label>
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
                <label className="text-white">Password</label>
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
                <label className="text-white">Confirm Password</label>
                <input
                  type="password"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md hover:border-blue-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  {...register("confirmPassword", {
                    validate: value => {
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
              <button type="submit" disabled={isSubmitting} className={`px-4 py-2 bg-blue-600 text-white rounded-md ${isSubmitting ? "bg-gray-400" : "hover:bg-blue-700"}`}>Register</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyRegister;
