import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

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
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyRegisterFormData>();

  const mutation = useMutation(apiClient.registerCompany, {
    onSuccess: async () => {
      showToast({ message: "Company Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Company Registration
          </h2>

          <label className="block">
            <span className="text-blue-700 font-medium">Company Name</span>
            <input
              type="text"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("companyName", {
                required: "This field is required",
              })}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-blue-700 font-medium">Company Email</span>
            <input
              type="email"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-blue-700 font-medium">Industry Type</span>
            <input
              type="text"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("industryType", {
                required: "This field is required",
              })}
            />
            {errors.industryType && (
              <span className="text-red-500 text-sm">
                {errors.industryType.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-blue-700 font-medium">Contact Number</span>
            <input
              type="text"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
            <span className="text-blue-700 font-medium">Password</span>
            <input
              type="password"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
            <span className="text-blue-700 font-medium">Confirm Password</span>
            <input
              type="password"
              className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
            className={`w-full py-3 rounded-md font-semibold tracking-wide text-lg transition-all duration-300 ${
              isSubmitting
                ? "bg-blue-300 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompanyRegister;
