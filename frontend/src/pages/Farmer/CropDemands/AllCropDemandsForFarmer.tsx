import React from "react";
import { useQuery } from "react-query";
import { getAllCropDemandsForFarmer } from "../../../farmer-api-clients"; // Adjust the import path if necessary
import { CropDemandType } from "../../../../../backend/src/shared/company/types"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader"; // Assuming you have a Loader component for loading state

const AllCropDemandsForFarmer = () => {
  const { data, isLoading, error } = useQuery<CropDemandType[]>(
    "crop-demands",
    getAllCropDemandsForFarmer
  );

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-600">Error loading crop demands</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Available Crop Demands</h1>
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-xl">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((demand) => {
              // Check if there are any bids
              const hasBids = demand.bids && demand.bids.length > 0;

              // Check if any bid is accepted or rejected
              const hasAcceptedOrRejectedBid = hasBids && demand.bids.some(
                (bid) => bid.status === "accepted" || bid.status === "rejected"
              );

              // Set status to "Closed" if any bid is accepted or rejected
              const statusText = hasAcceptedOrRejectedBid ? "Closed" : "Open";
              const statusColor = hasAcceptedOrRejectedBid ? "bg-red-500" : "bg-green-500";

              return (
                <div
                  key={demand._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 relative"
                >
                  <div className="relative">
                    <img
                      src="https://via.placeholder.com/300"
                      alt={demand.cropType}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-3 py-1 text-white font-semibold rounded-full ${statusColor}`}
                    >
                      {statusText}
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="text-2xl font-semibold text-gray-800 mb-2">
                      {demand.cropType}
                    </h5>
                    <p className="text-gray-600 mb-2">
                      Quantity Required: <span className="font-medium">{demand.quantity} kg</span>
                    </p>
                    <p className="text-gray-600 mb-4">
                      Price: <span className="font-medium">${demand.details} per kg</span>
                    </p>
                    <Link
                      to={`/farmers/crop-demands/${demand._id}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-center font-semibold mt-4 hover:bg-blue-700 transition-colors"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-600 text-center">No crop demands available.</div>
        )}
      </div>
    </div>
  );
};

export default AllCropDemandsForFarmer;
