import React from "react";
import { useQuery } from "react-query";
import { getAllCropDemandsForFarmer } from "../../../farmer-api-clients"; // Adjust the import path if necessary
import { CropDemandType } from "../../../../../backend/src/shared/company/types"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { Sprout, DiamondPercentIcon, Weight } from "lucide-react";
import Loader from "../../../components/Loader";

const AllCropDemandsForFarmer: React.FC = () => {
  const { data, isLoading, error } = useQuery<CropDemandType[]>(
    "crop-demands",
    getAllCropDemandsForFarmer
  );

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-red-600 text-center py-8">
        Error loading crop demands
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Available Crop Demands
          </h1>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((demand) => {
                const statusColor =
                  demand.status === "open"
                    ? "bg-green-500"
                    : demand.status === "closed"
                    ? "bg-red-500"
                    : "bg-yellow-500";

                return (
                  <div
                    key={demand._id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-2xl font-semibold text-gray-800">
                          {demand.cropType}
                        </h5>
                        <span
                          className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
                        >
                          {demand.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600 flex items-center">
                          <Weight className="h-5 w-5 mr-2 text-green-600" />
                          <span className="font-medium">
                            {demand.quantity} tons
                          </span>
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <DiamondPercentIcon className="h-5 w-5 mr-2 text-green-600" />
                          <span className="font-medium">{demand.details}</span>
                        </p>
                      </div>
                      <Link
                        to={`/farmers/crop-demands/${demand._id}`}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <Sprout className="h-5 w-5 mr-2" />
                        View More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-600 text-center bg-white p-8 rounded-lg shadow-md">
              No crop demands available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCropDemandsForFarmer;
