import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link, useParams } from "react-router-dom";
import { BidType } from "../../../../../backend/src/shared/farmer/types";
import { Loader2, User, DollarSign, Eye } from "lucide-react";

function AllBidsForADemand() {
  const { demandId } = useParams<{ demandId: string }>();

  const {
    data: bids,
    isLoading,
    error,
  } = useQuery(["getAllBidsForADemandForACompany", demandId], () =>
    apiClient.getAllBidsForADemandForACompany(demandId!)
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading bids</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          All Bids for Demand ID: {demandId}
        </h2>
        <ul className="space-y-4">
          {bids.map((bid: BidType) => (
            <li
              key={bid._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="space-y-2">
                  <p className="text-blue-800 font-semibold flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Farmer: {bid.farmerId.name}
                  </p>
                  <p className="text-blue-700 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Amount: ${bid.bidAmount}
                  </p>
                </div>
                <Link
                  to={`${bid._id}`}
                  className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Bid
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllBidsForADemand;
