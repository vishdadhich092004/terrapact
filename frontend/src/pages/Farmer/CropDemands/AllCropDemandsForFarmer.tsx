import React from "react";
import { useQuery } from "react-query";
import { getAllCropDemandsForFarmer } from "../../../farmer-api-clients";
import { CropDemandType } from "../../../../../backend/src/shared/company/types";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

const AllCropDemandsForFarmer: React.FC = () => {
  const { data, isLoading, error } = useQuery<CropDemandType[]>(
    "crop-demands",
    getAllCropDemandsForFarmer
  );

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Error loading crop demands</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Available Crop Demands
      </h1>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {data && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((demand) => (
              <li key={demand._id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {demand.cropType}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Quantity Required: {demand.quantity} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${demand.details} per kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {demand.status.toString()}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Link
                      to={`/farmers/crop-demands/${demand._id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No crop demands available.</div>
        )}
      </div>
    </div>
  );
};

export default AllCropDemandsForFarmer;
