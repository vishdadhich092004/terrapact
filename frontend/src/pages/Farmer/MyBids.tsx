import React, { useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../farmer-api-clients"; // Adjust the import path as necessary
import { useAppContext } from "../../contexts/AppContext";

type Bid = {
  _id: string;
  demandId: string;
  farmerId: string;
  bidAmount: number;
  message: string;
  createdAt: string;
};

const MyBids: React.FC = () => {
  const { showToast } = useAppContext();
  const { data, error, isLoading, refetch } = useQuery<Bid[], Error>(
    "myBids",
    apiClient.allBidsForAFarmer,
    {
      onError: (error) => {
        showToast({
          message: `Error fetching bids: ${error.message}`,
          type: "ERROR",
        });
      },
    }
  );

  // Trigger refetch on some condition or event if needed
  useEffect(() => {
    // Example: refetch when the component mounts or after a bid is placed
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading your bids...</div>;
  }

  if (error) {
    return <div>Error loading bids: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>
      {data && data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((bid) => (
            <li key={bid._id} className="border rounded p-4 shadow-sm">
              <p>
                <strong>Bid Amount:</strong> ${bid.bidAmount}
              </p>
              <p>
                <strong>Message:</strong> {bid.message}
              </p>
              <p>
                <strong>Submitted on:</strong>{" "}
                {new Date(bid.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No bids found.</div>
      )}
    </div>
  );
};

export default MyBids;
