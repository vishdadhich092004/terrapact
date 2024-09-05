import { useMutation, useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type EditCropDemandData = {
  cropType: string;
  quantity: number;
  location: string;
  details: string;
};

function EditCropDemand() {
  const { cropDemandId } = useParams<{ cropDemandId: string }>();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    data: cropDemand,
    isLoading,
    error,
  } = useQuery(
    ["cropDemand", cropDemandId],
    () => apiClient.getCropDemandByIdForCompany(cropDemandId!), // Fetch current crop demand
    {
      onError: () => {
        showToast({
          message: "Error fetching Crop Demand. Please try again later",
          type: "ERROR",
        });
      },
    }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditCropDemandData>();

  // Prefill form with existing data when it's loaded
  useEffect(() => {
    if (cropDemand) {
      setValue("cropType", cropDemand.cropType);
      setValue("quantity", cropDemand.quantity);
      setValue("location", cropDemand.location);
      setValue("details", cropDemand.details);
    }
  }, [cropDemand, setValue]);

  const mutation = useMutation(
    (data: EditCropDemandData) => apiClient.editCropDemand(cropDemandId!, data),
    {
      onSuccess: () => {
        showToast({
          message: "Crop Demand updated successfully",
          type: "SUCCESS",
        });
        navigate("/crop-demands");
      },
      onError: () => {
        showToast({
          message: "Error updating Crop Demand. Please try again later",
          type: "ERROR",
        });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error fetching crop demand
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
            Edit Crop Demand
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

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105"
          >
            Update Crop Demand
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCropDemand;
