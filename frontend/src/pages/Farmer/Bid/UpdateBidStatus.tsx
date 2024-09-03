import React from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";

interface UpdateBidStatusProps {
  bidId: string;
}

export const UpdateBidStatus: React.FC<UpdateBidStatusProps> = ({ bidId }) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(
    (status: string) => apiClient.updateBidStatus(bidId, status),
    {
      onSuccess: async () => {
        showToast({
          message: "Bid status updated successfully!",
          type: "SUCCESS",
        });
        await queryClient.invalidateQueries("my-bids");
      },
      onError: (error: Error) => {
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );

  const handleStatusChange = (status: string) => {
    mutation.mutate(status);
  };

  return (
    <div className="flex space-x-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => handleStatusChange("accepted")}
      >
        Accept
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => handleStatusChange("rejected")}
      >
        Reject
      </button>
    </div>
  );
};
