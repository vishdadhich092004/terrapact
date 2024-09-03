import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext";
import * as apiClient from "../../../farmer-api-clients";

export type CreateBidFormData = {
  bidAmount: number;
  message: string;
};

interface CreateBidFormProps {
  demandId: string;
}

export const CreateBidForm: React.FC<CreateBidFormProps> = ({ demandId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBidFormData>();

  const mutation = useMutation(
    ({ bidAmount, message }: CreateBidFormData) =>
      apiClient.createBid(demandId, bidAmount, message),
    {
      onSuccess: async () => {
        showToast({
          message: "Bid created successfully!",
          type: "SUCCESS",
        });
        await queryClient.invalidateQueries(["bids", demandId]);
        navigate("/bids"); // Adjust this path according to your routes
      },
      onError: (error: Error) => {
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Bid</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="bidAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Bid Amount
            </label>
            <input
              type="number"
              id="bidAmount"
              className="w-full mt-1 p-2 border rounded"
              {...register("bidAmount", { required: "Bid amount is required" })}
            />
            {errors.bidAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bidAmount.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full mt-1 p-2 border rounded"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit Bid"}
          </button>
        </form>
      </div>
    </div>
  );
};
