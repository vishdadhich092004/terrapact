import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";

interface BidsForDemandProps {
  demandId: string;
}

export const BidsForDemand: React.FC<BidsForDemandProps> = ({ demandId }) => {
  const { showToast } = useAppContext();

  const {
    data: bids,
    isLoading,
    isError,
  } = useQuery(["bids", demandId], () => apiClient.getBidsForDemand(demandId), {
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bids</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bids for Demand</h2>
      <ul>
        {bids?.map((bid) => (
          <li key={bid._id} className="mb-2">
            <p>Amount: {bid.bidAmount}</p>
            <p>Message: {bid.message}</p>
            <p>Status: {bid.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
