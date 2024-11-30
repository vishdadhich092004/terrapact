import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mails, RectangleEllipsis, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CompanySignInFormData = {
  email: string;
  password: string;
};

function CompanySignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CompanySignInFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation(apiClient.signInCompany, {
    onSuccess: async () => {
      showToast({
        message: "Sign In Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validate-token");
      navigate("/company/user/dashboard");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const autofillForm = () => {
    setValue("email", "care@admin.pushkarindustries.in");
    setValue("password", "111111");
  };

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
                'url("https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="absolute inset-0 bg-[#512601] opacity-60"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
              <h1 className="text-4xl font-bold mb-4 text-white">TerraPact</h1>
              <p className="text-lg opacity-80 text-white">
                Connecting Companies, Empowering Solutions
              </p>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex flex-col justify-center p-12 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#512601] mb-2">
                Company Sign In
              </h2>
              <p className="text-[#775d3f]">Access your TerraPact dashboard</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <button
                type="button"
                onClick={autofillForm}
                className="w-full bg-[#fec89a] text-[#512601] hover:bg-[#a24c02] hover:text-white text-xl py-3 px-3 rounded-lg transition-colors mb-4 flex items-center justify-center"
              >
                <Sparkle className="mr-2" size={20} />
                Autofill For Viewing
              </button>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-[#fec89a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a24c02] focus:border-transparent text-[#512601]"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="text-[#512601]" size={20} />
                    ) : (
                      <Eye className="text-[#512601]" size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[#a24c02] text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#512601] text-white hover:bg-[#a24c02] py-3 rounded-lg text-base font-semibold transition-colors"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <span className="text-[#512601]">Not registered? </span>
              <Link
                to="/company/register"
                className="text-[#a24c02] font-semibold hover:underline"
              >
                Sign Up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySignIn;
