import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Mails,
  Phone,
  RectangleEllipsis,
  Shovel,
  Tractor,
  UserPlus,
} from "lucide-react";

export type FarmerRegisterFormData = {
  name: string;
  email: string;
  farmSize: number;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};

function FarmerRegister() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmerRegisterFormData>();
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
    <div className="container mx-auto pl-4 pr-3 my-16">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0 animate-fadeIn">
          <h2 className="text-4xl md:text-8xl font-bold text-[#512601] mb-6 leading-tight flex justify-stretch">
            <Tractor className="h-24 w-24 text-[#fec89a] mr-2" />
            <span className="text-[#a24c02]">TerraPact</span>
            <span className="text-sm">Farmer</span>
          </h2>
        </div>
        <div className="lg:w-1/2 overflow-hidden animate-grow">
          <div className="rounded-lg shadow-2xl p-12 w-full border border-[#fec89a]">
            <h2 className="text-3xl font-bold text-[#512601] mb-6 text-center">
              Farmer Registration
            </h2>
            <form className="space-y-6" onSubmit={onSubmit}>
              {/* Form fields */}
              <div className="relative">
                <UserPlus
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Repeat similar structure for email, farmSize, contactNumber, password, and confirmPassword fields */}
              <div className="relative">
                <Mails
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Shovel
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="number"
                  placeholder="Farm Size"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("farmSize", {
                    required: "Farm Size is required",
                  })}
                />
                {errors.farmSize && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.farmSize.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                  })}
                />
                {errors.contactNumber && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <RectangleEllipsis
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <RectangleEllipsis
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#512601]"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-[#512601] bg-white focus:outline-none focus:ring-2 focus:ring-[#a24c02]"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (!value) return "This field is required";
                      if (watch("password") !== value)
                        return "Passwords do not match";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-[#a24c02] text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#512601] text-white hover:bg-[#a24c02] text-xl p-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="mt-4 text-center text-[#512601]">
              <span>Already Registered? </span>
              <Link
                to="/farmer/signin"
                className="underline hover:text-[#a24c02]"
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

export default FarmerRegister;
