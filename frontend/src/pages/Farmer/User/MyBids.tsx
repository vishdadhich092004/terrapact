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

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return <div className="text-green-800">No Bids as of now</div>;
  if (error) {
    return (
      <div className="text-red-600">Error loading bids: {error.message}</div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h2 className="text-3xl font-bold mb-6 text-green-800">My Bids</h2>
      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((bid) => (
            <li
              key={bid._id}
              className="border border-green-300 rounded-lg p-5 shadow-md bg-white hover:bg-green-50 transition-colors duration-200"
            >
              <p className="text-green-800 text-lg mb-2">
                <strong>Bid Amount:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  ${bid.bidAmount.toFixed(2)}
                </span>
              </p>
              <p className="text-green-700 mb-2">
                <strong>Message:</strong> {bid.message}
              </p>
              <p className="text-green-600 text-sm">
                <strong>Submitted on:</strong>{" "}
                {new Date(bid.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-green-800 bg-green-100 p-4 rounded-lg">
          No bids found. Start bidding to see your offers here!
        </div>
      )}
    </div>
  );
};

export default MyBids;
