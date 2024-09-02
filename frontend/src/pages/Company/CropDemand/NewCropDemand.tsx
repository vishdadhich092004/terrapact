import { useMutation } from "react-query";
import * as apiClient from "../../../api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export type CropDemandData = {
  cropType: string;
  quantity: string;
  location: string;
  requiredBy: Date;
  details: string;
  status: string;
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
        message: "New Crop Demand Generated",
        type: "SUCCESS",
      });
      navigate("/crop-demands");
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
    // console.log(data);
  });

  const buttonStyles = isSubmitSuccessful
    ? "w-full bg-slate-400 text-white py-2 rounded-md"
    : "w-full bg-teal-600 text-white py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-teal-600">
            Create a New Discussion
          </h2>
          <label className="block">
            <span className="text-slate-800">cropType</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("cropType", {
                required: "cropType cannot be empty",
              })}
            />
            {errors.cropType && (
              <span className="text-red-500 text-sm">
                {errors.cropType.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-slate-800">quantity (tons)</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("quantity", {
                required: "quantity cannot be empty",
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-slate-800">location</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("location", {
                required: "location cannot be empty",
              })}
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className="text-slate-800">details</span>
            <input
              type="text"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              {...register("details", {
                required: "details cannot be empty",
              })}
            />
            {errors.details && (
              <span className="text-red-500 text-sm">
                {errors.details.message}
              </span>
            )}
          </label>

          <button type="submit" className={buttonStyles}>
            Create Discussion
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCropDemand;
