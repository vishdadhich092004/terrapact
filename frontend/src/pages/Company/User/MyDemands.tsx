import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

function MyDemands() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("companyDemands", apiClient.getCompanyDemands);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-500">Error loading crop demands</div>
    );

  if (!cropDemands || cropDemands.length === 0) {
    return (
      <div className="text-center">No Crop Demands found for your company</div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Company’s Crop Demands
      </h1>
      <div className="space-y-4">
        {cropDemands.map((demand) => (
          <div
            key={demand._id}
            className="p-6 border border-slate-300 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {demand.cropType}
            </h2>
            <p className="text-gray-700">Quantity: {demand.quantity} tons</p>
            <p className="text-gray-700">Location: {demand.location}</p>
            <p className="text-gray-700">Details: {demand.details}</p>
            <p className={`text-${demand.status.toLowerCase()} font-semibold`}>
              Status: {demand.status.toString()}
            </p>
            <Link
              className="block mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition-colors"
              to={`/crop-demands/${demand._id}`}
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDemands;
