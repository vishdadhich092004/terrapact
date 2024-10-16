import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Tractor,
  Mails,
  RectangleEllipsis,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type FarmerSignInFormData = {
  email: string;
  password: string;
};

function FarmerSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FarmerSignInFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation(apiClient.signInFarmer, {
    onSuccess: async () => {
      showToast({
        message: "User SignIn Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validate-token");
      navigate("/farmer/user/dashboard");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const autofillForm = () => {
    setValue("email", "farmer@farmer.com");
    setValue("password", "111111");
  };
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="container mx-auto  pl-4 pr-3 my-16">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0 animate-fadeIn">
          <h2 className="text-4xl md:text-8xl font-bold text-[#512601] mb-6 leading-tight flex justify-stretch">
            {/* Welcome Back to <br /> */}
            <Tractor className="h-24 w-24 text-[#fec89a] mr-2" />
            <span className="text-[#a24c02]">TerraPact</span>
            <span className="text-sm">Farmer</span>
          </h2>
          {/* <p className="text-2xl text-[#775d3f] mb-8">At your ease</p> */}
        </div>
        <div className="lg:w-1/2 overflow-hidden animate-grow">
          <div className=" rounded-lg shadow-2xl p-12 w-full border border-[#fec89a]">
            <h2 className="text-3xl font-bold text-[#512601] mb-6 text-center">
              Sign In
            </h2>

            <form onSubmit={onSubmit} className="space-y-8">
              <button
                type="button"
                onClick={autofillForm}
                className="w-full bg-[#fec89a] text-[#512601] hover:bg-[#a24c02] hover:text-white text-xl p-3 rounded-lg transition-colors mb-4 flex items-center justify-center"
              >
                <Sparkle className="mr-2" size={20} />
                Autofill For Viewing
              </button>
              <div className="relative">
                <Mails
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-[#a24c02] text-sm">
                  {errors.email.message}
                </span>
              )}

              <div className="relative">
                <RectangleEllipsis
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="text-[#512601]" size={20} />
                  ) : (
                    <Eye className="text-[#512601]" size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-[#a24c02] text-sm">
                  {errors.password.message}
                </span>
              )}

              <Button
                type="submit"
                className="w-full bg-[#512601] text-white hover:bg-[#a24c02] text-xl p-6 rounded-lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-4 text-center text-[#512601]">
              <span>Not Registered? </span>
              <Link
                to="/farmer/register"
                className="underline hover:text-[#a24c02]"
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

export default FarmerSignIn;
