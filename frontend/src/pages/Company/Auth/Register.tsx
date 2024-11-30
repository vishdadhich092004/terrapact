import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Mails,
  Phone,
  RectangleEllipsis,
  Factory,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type CompanyRegisterFormData = {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  industryType: string;
  contactNumber: string;
};

function CompanyRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CompanyRegisterFormData>();

  const mutation = useMutation(apiClient.registerCompany, {
    onSuccess: async () => {
      showToast({ message: "Company Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message || "Registration failed",
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-[#fec89a] bg-opacity-20 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Side - Image Section */}
          <div
            className="hidden md:block bg-cover bg-center relative"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="absolute inset-0 bg-[#512601] opacity-60"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">TerraPact</h1>
              <p className="text-lg opacity-80 text-white">
                Connecting agricultural businesses
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex flex-col justify-center p-12 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#512601] mb-2">
                Company Registration
              </h2>
              <p className="text-[#775d3f]">Create your TerraPact account</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="Enter company name"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("companyName", {
                      required: "Company name is required",
                    })}
                  />
                </div>
                {errors.companyName && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.companyName.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mails className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="industryType"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Industry Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Factory className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="industryType"
                    type="text"
                    placeholder="Enter industry type"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("industryType", {
                      required: "Industry type is required",
                    })}
                  />
                </div>
                {errors.industryType && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.industryType.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="contactNumber"
                    type="text"
                    placeholder="Enter your contact number"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number (10 digits required)",
                      },
                    })}
                  />
                </div>
                {errors.contactNumber && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RectangleEllipsis className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create your password"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#512601] mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RectangleEllipsis className="text-[#512601]" size={20} />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("confirmPassword", {
                      validate: (value) => {
                        if (!value) return "Confirm password is required";
                        if (watch("password") !== value)
                          return "Passwords do not match";
                      },
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#512601] text-white hover:bg-[#a24c02] py-3 rounded-lg text-base font-semibold transition-colors"
              >
                Register
              </Button>
            </form>

            <div className="text-center">
              <span className="text-[#512601]">Already registered? </span>
              <Link
                to="/company/login"
                className="text-[#a24c02] font-semibold hover:underline"
              >
                Sign In here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegister;
