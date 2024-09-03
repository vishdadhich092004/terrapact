import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { signInCompany } from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

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
  } = useForm<CompanySignInFormData>();

  const mutation = useMutation(signInCompany, {
    onSuccess: async () => {
      showToast({
        message: "Company Sign-In Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validate-token");
      navigate("/companies");
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
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1506748686214e9df14f7c2c14f6c59f4b3d45a5f7b3c5e6d4526cb4c12a0b4c5e"
            alt="CompanySignIn"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 p-8">
          <form className="space-y-6" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold text-gray-800">
              Company Sign In
            </h2>

            <label className="block">
              <span className="text-slate-600 text-sm">Email</span>
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
              <span className="text-slate-600 text-sm">Password</span>
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

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Not Registered?{" "}
                <Link
                  className="underline text-teal-600"
                  to="/company-register"
                >
                  Create an account here
                </Link>
              </span>

              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-md font-bold hover:bg-teal-700 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanySignIn;
