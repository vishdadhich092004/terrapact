import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCropDemandByIdForFarmer } from "../../../farmer-api-clients";
import { CropDemandType } from "../../../../../backend/src/shared/company/types";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Sprout, Weight, MapPin, DollarSign } from "lucide-react";

const CropDemandDetails: React.FC = () => {
  const { user } = useAuthContext();
  const { demandId } = useParams<{ demandId: string }>();
  const { data, isLoading, error } = useQuery<CropDemandType>(
    ["crop-demand", demandId],
    () => getCropDemandByIdForFarmer(demandId!)
  );

  const existingBid = data?.bids.find(
    (bid) => bid.farmerId.toString() === user?._id.toString()
  );

  const isBidClosed =
    existingBid &&
    (existingBid.status === "accepted" || existingBid.status === "rejected");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error || !data)
    return (
      <div className="text-red-600 text-center py-8">
        Error loading crop demand details
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 flex items-center">
            <Sprout className="h-8 w-8 mr-3 text-green-600" />
            {data.cropType}
          </h1>
          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-white font-semibold ${
                isBidClosed ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isBidClosed ? "Closed" : "Open"}
            </span>
          </div>
          <div className="text-lg space-y-4 text-gray-800">
            <p className="flex items-center">
              <Weight className="h-6 w-6 mr-3 text-green-600" />
              <span className="font-bold">Quantity Required:</span>{" "}
              <span className="ml-2">{data.quantity} kg</span>
            </p>
            <p className="flex items-center">
              <DollarSign className="h-6 w-6 mr-3 text-green-600" />
              <span className="font-bold">Details:</span>{" "}
              <span className="ml-2">{data.details}</span>
            </p>
            <p className="flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-green-600" />
              <span className="font-bold">Location:</span>{" "}
              <span className="ml-2">{data.location}</span>
            </p>
          </div>

          {!existingBid ? (
            <div className="mt-8">
              <Link
                to={`/farmers/${demandId}/bids/new`}
                className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 inline-flex items-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Create a Bid
              </Link>
            </div>
          ) : (
            <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Your Bid Status
              </h2>
              <p className="text-md">
                Status:{" "}
                <span
                  className={`font-bold ${
                    existingBid.status === "accepted"
                      ? "text-green-600"
                      : existingBid.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {existingBid.status.charAt(0).toUpperCase() +
                    existingBid.status.slice(1)}
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CropDemandDetails;
