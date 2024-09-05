import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";

function CropDemandList() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("cropDemands", apiClient.getCompanyDemands);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500">Error loading crop demands</div>;

  if (!cropDemands || cropDemands.length === 0) {
    return <div className="text-center">No Crop Demands Found</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crop Demands</h1>
      <ul className="space-y-6">
        {cropDemands.map((demand) => (
          <li
            key={demand._id}
            className="p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {demand.cropType}
            </h2>
            <p className="text-gray-700">Quantity: {demand.quantity} tons</p>
            <p className="text-gray-700">Location: {demand.location}</p>
            <p className="text-gray-700">Details: {demand.details}</p>
            <p className={`text-gray-700 font-semibold`}>
              Status: {demand.status.toString()}
            </p>
            <Link
              to={`/crop-demands/${demand._id}`}
              className="inline-block mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              View More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CropDemandList;
