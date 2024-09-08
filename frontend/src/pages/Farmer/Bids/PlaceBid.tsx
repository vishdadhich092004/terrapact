import React from "react";
import { useMutation } from "react-query";
import { createBid } from "../../../farmer-api-clients"; // Adjust the import path as necessary
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/AppContext"; // Adjust the import path as necessary
import { DollarSign, MessageSquare } from "lucide-react";

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
    formState: { errors, isSubmitting },
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Place a Bid
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="bid-amount" className="sr-only">
                  Bid Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="bid-amount"
                    type="number"
                    step="0.01"
                    {...register("bidAmount", {
                      required: "Bid amount is required",
                      min: {
                        value: 1,
                        message: "Bid amount must be greater than 0",
                      },
                    })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Bid Amount"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MessageSquare
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message cannot be empty",
                    })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Your message"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {(errors.bidAmount || errors.message) && (
              <div className="text-red-500 text-sm mt-2">
                {errors.bidAmount?.message || errors.message?.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PlaceBid;
