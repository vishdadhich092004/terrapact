import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";

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
  } = useForm<FarmerSignInFormData>();

  const [showPassword, setShowPassword] = React.useState(false);

  const mutation = useMutation(apiClient.signInFarmer, {
    onSuccess: async () => {
      showToast({
        message: "User SignIn Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validate-token");
      navigate("/user-dashboard");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-[#AED065] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 w-full max-w-4xl space-x-8">
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/338b/d7d4/152a4758004c78bc712cc5b3e10bb69c?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xn65Xj2vzbZ2V-ec36dU8JnleU3jvXSbfXJk2m4d07U47LKBYdyrl3IZuUwoAo5uiTj-0m7r4BUyE6uYS7lmBdapcasntMG0uv-O5-ghLYLbkiVemVC5kHITl1JU4Kpg~h0rGAcAW5ei-9TovTcjlAsWtf5vpPDrygYRPFLKAHdeUDaH6GTJqoXkRKrkxpOaQPGJG7fvZFuHtGVA~u2cI37Ikdan~MyhQx1XNtxWws55UN1P5Zc1jjQGX~R7uN9kPKpHFQnIIWveVn2B8derNCStC2bjtBiFc2NdTrMdCMU2HUUsXhogHNG2Whl8oWETjXOTRn8iunnDtF3xvB1SgQ__"
            alt="Signup illustration"
            className="w-full max-w-md"
          />
        </div>
        <div className="md:w-1/2">
          <div className="bg-[#738A41E8] rounded-lg shadow-lg p-8 w-full">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              SIGN IN
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 "
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-200 text-sm">
                  {errors.email.message}
                </span>
              )}

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 "
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="PASSWORD"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white"
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
                    <EyeOff className="text-green-800" size={20} />
                  ) : (
                    <Eye className="text-green-800" size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-200 text-sm">
                  {errors.password.message}
                </span>
              )}

              <div className="flex items-center justify-between mt-2 text-sm text-white">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                  />
                  Show Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-green-700 rounded-full py-2 mt-6 font-bold hover:bg-green-100 transition duration-300"
              >
                SIGN IN
              </button>
            </form>

            <div className="mt-4 text-center text-white">
              <span>Not Registered? </span>
              <Link to="/sign-up" className="underline hover:text-green-200">
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
