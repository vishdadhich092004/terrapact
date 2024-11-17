import { useMutation } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

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

  const [imageFile, setImageFile] = useState<File | null>(null);

  const mutation = useMutation(
    (formData: FormData) => apiClient.newCropDemand(formData),
    {
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
    }
  );

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("cropType", data.cropType);
    formData.append("quantity", data.quantity.toString());
    formData.append("location", data.location);
    formData.append("details", data.details);
    formData.append("lastDate", new Date(data.lastDate).toISOString());

    if (imageFile) {
      formData.append("image", imageFile);
    }

    mutation.mutate(formData);
  });

  const buttonStyles = isSubmitSuccessful
    ? "w-full bg-gray-400 text-white py-3 rounded-md font-semibold"
    : "w-full bg-[#a24c02] text-white py-3 rounded-md font-semibold shadow-md hover:bg-[#512601] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fec89a]";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-[#fec89a] mt-8">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-[#512601] mb-6">
            New Crop Demand
          </h2>
          {["cropType", "quantity", "location", "details", "lastDate"].map(
            (field) => (
              <label key={field} className="block">
                <span className="text-[#775d3f] font-medium capitalize">
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
                  className="mt-1 block w-full border-2 border-[#fec89a] rounded-md p-2 focus:border-[#a24c02] focus:ring focus:ring-[#fec89a]/50 focus:ring-opacity-50 transition-all duration-300 text-[#512601]"
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

          <div className="border-2 border-[#fec89a] rounded-md p-4">
            <ImageUpload onImageUpload={setImageFile} />
          </div>

          <button type="submit" className={buttonStyles}>
            Create Crop Demand
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCropDemand;
