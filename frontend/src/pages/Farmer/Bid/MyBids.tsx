import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { useAppContext } from "../../../contexts/AppContext";

export const MyBids: React.FC = () => {
  const { showToast } = useAppContext();

  const {
    data: bids,
    isLoading,
    isError,
  } = useQuery("my-bids", apiClient.getMyBids, {
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
    return <div>Error loading your bids</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>
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
