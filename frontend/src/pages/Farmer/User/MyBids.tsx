import { useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import Loader from "../../../components/Loader";

type Bid = {
  _id: string;
  demandId: string;
  farmerId: string;
  bidAmount: number;
  message: string;
  createdAt: string;
};

const MyBids = () => {
  const { data, error, isLoading, refetch } = useQuery<Bid[], Error>(
    "myBids",
    apiClient.allBidsForAFarmer
  );

  // Trigger refetch on some condition or event if needed
  useEffect(() => {
    // Example: refetch when the component mounts or after a bid is placed
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return <div className="text-gray-800">No Bids as of now</div>;
  if (error) {
    return (
      <div className="text-red-600">Error loading bids: {error.message}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bids</h2>
      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((bid) => (
            <li
              key={bid._id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
            >
              <p className="text-gray-800">
                <strong>Bid Amount:</strong> ${bid.bidAmount}
              </p>
              <p className="text-gray-800">
                <strong>Message:</strong> {bid.message}
              </p>
              <p className="text-gray-800">
                <strong>Submitted on:</strong>{" "}
                {new Date(bid.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-800">No bids found.</div>
      )}
    </div>
  );
};

export default MyBids;
