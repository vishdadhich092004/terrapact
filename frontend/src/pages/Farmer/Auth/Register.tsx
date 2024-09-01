import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type FarmerRegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  farmSize: string;
};

function FarmerRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmerRegisterFormData>();

  const mutation = useMutation(apiClient.registerFarmer, {
    onSuccess: async () => {
      showToast({
        message: "Farmer Registration Success",
        type: "SUCCESS",
      });
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
    // console.log(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-teal-600">
            Farmer Registration
          </h2>

          <label className="block">
            <span className="text-slate-600">Name</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-slate-600">Contact Number</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("contactNumber", {
                required: "This field is required",
              })}
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm">
                {errors.contactNumber.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-slate-600">Farm Size</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("farmSize", {
                required: "This field is required",
              })}
            />
            {errors.farmSize && (
              <span className="text-red-500 text-sm">
                {errors.farmSize.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-slate-600">Email</span>
            <input
              type="email"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-slate-600">Password</span>
            <input
              type="password"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-slate-600">Confirm Password</span>
            <input
              type="password"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) return "This field is required";
                  if (watch("password") !== value)
                    return "Passwords do not match";
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md ${
              isSubmitting
                ? "bg-gray-400 text-white"
                : "bg-teal-600 text-white shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegister;
