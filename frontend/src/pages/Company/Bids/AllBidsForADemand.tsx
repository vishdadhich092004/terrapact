import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { BidType } from "../../../../../backend/src/shared/farmer/types";

function AllBidsForADemand() {
  const { demandId } = useParams<{ demandId: string }>();

  const {
    data: bids,
    isLoading,
    error,
  } = useQuery(["getAllBidsForADemandForACompany", demandId], () =>
    apiClient.getAllBidsForADemandForACompany(demandId!)
  );

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error loading bids</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        All Bids for Demand ID: {demandId}
      </h2>
      <ul className="space-y-4">
        {bids.map((bid: BidType) => (
          <li
            key={bid._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-gray-800 font-semibold">
              Farmer: {bid.farmerId.name}
            </p>
            <p className="text-gray-600">Amount: {bid.bidAmount}</p>
            <Link to={`${bid._id}`} className="text-indigo-600 hover:underline">
              View Bid
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllBidsForADemand;
