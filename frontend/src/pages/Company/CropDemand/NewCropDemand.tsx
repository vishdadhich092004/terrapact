import { useMutation } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export type CropDemandData = {
  cropType: string;
  quantity: number;
  location: string;
  details: string;
  lastDate: Date;
};

function NewCropDemand() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CropDemandData>();

  const mutation = useMutation(apiClient.newCropDemand, {
    onSuccess: () => {
      showToast({
        message: "New Crop Demand Created Successfully",
        type: "SUCCESS",
      });
      navigate("/company/my-demands");
    },
    onError: () => {
      showToast({
        message: "Error creating Crop Demand. Please Try Again Later",
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const buttonStyles = isSubmitSuccessful
    ? "w-full bg-gray-400 text-white py-2 rounded-md"
    : "w-full bg-teal-600 text-white py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
            Create a New Crop Demand
          </h2>
          <label className="block">
            <span className="text-gray-800">Crop Type</span>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("cropType", {
                required: "Crop Type cannot be empty",
              })}
            />
            {errors.cropType && (
              <span className="text-red-500 text-sm">
                {errors.cropType.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-gray-800">Quantity (tons)</span>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("quantity", {
                required: "Quantity cannot be empty",
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-gray-800">Location</span>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("location", {
                required: "Location cannot be empty",
              })}
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-gray-800">Details</span>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("details", {
                required: "Details cannot be empty",
              })}
            />
            {errors.details && (
              <span className="text-red-500 text-sm">
                {errors.details.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-gray-800">Last Date</span>
            <input
              type="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("lastDate", {
                required: "Last Date cannot be empty",
              })}
            />
            {errors.lastDate && (
              <span className="text-red-500 text-sm">
                {errors.lastDate.message}
              </span>
            )}
          </label>

          <button type="submit" className={buttonStyles}>
            Create Crop Demand
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCropDemand;
