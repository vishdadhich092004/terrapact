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
    ? "w-full bg-gray-400 text-white py-3 rounded-md font-semibold"
    : "w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            New Crop Demand
          </h2>
          {["cropType", "quantity", "location", "details", "lastDate"].map(
            (field) => (
              <label key={field} className="block">
                <span className="text-blue-700 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <input
                  type={
                    field === "quantity"
                      ? "number"
                      : field === "lastDate"
                      ? "date"
                      : "text"
                  }
                  className="mt-1 block w-full border-2 border-blue-200 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                  {...register(field as keyof CropDemandData, {
                    required: `${field
                      .replace(/([A-Z])/g, " $1")
                      .trim()} cannot be empty`,
                  })}
                />
                {errors[field as keyof CropDemandData] && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors[field as keyof CropDemandData]?.message}
                  </span>
                )}
              </label>
            )
          )}

          <button type="submit" className={buttonStyles}>
            Create Crop Demand
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCropDemand;
