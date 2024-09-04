import React from "react";
import { useMutation } from "react-query";
import { createBid } from "../../farmer-api-clients"; // Adjust the import path as necessary
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/AppContext"; // Adjust the import path as necessary

type BidData = {
  bidAmount: number;
  message: string;
};

const PlaceBid: React.FC = () => {
  const { demandId } = useParams<{ demandId: string }>();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<BidData>();

  const mutation = useMutation({
    mutationFn: (data: BidData) =>
      createBid(demandId!, data.bidAmount, data.message),
    onSuccess: () => {
      showToast({
        message: "Bid submitted successfully!",
        type: "SUCCESS",
      });
      navigate("/farmers/crop-demands");
    },
    onError: (error: Error) => {
      showToast({
        message: `Error submitting bid: ${error.message}`,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const buttonStyles = isSubmitSuccessful
    ? "w-full bg-slate-400 text-white py-2 rounded-md"
    : "w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Place a Bid
          </h2>

          <label className="block">
            <span className="text-slate-800">Bid Amount</span>
            <input
              type="number"
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("bidAmount", {
                required: "Bid amount is required",
                min: { value: 1, message: "Bid amount must be greater than 0" },
              })}
            />
            {errors.bidAmount && (
              <span className="text-red-500 text-sm">
                {errors.bidAmount.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-slate-800">Message</span>
            <textarea
              className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("message", {
                required: "Message cannot be empty",
              })}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={buttonStyles}
          >
            {mutation.isLoading ? "Submitting..." : "Submit Bid"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceBid;
