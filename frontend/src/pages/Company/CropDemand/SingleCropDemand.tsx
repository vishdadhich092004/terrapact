import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { useAuthContext } from "../../../contexts/AuthContext";

function CropDemandDetails() {
  const { isAuthenticated, isCompany, user } = useAuthContext();
  const { cropDemandId } = useParams<{ cropDemandId: string }>();

  const {
    data: cropDemand,
    isLoading,
    error,
  } = useQuery(["cropDemand", cropDemandId], () =>
    apiClient.getCropDemandByIdForCompany(cropDemandId!)
  );

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error loading crop demand</div>
    );

  if (!cropDemand) {
    return <div className="text-center">Crop Demand Not Found</div>;
  }

  const isOwner =
    isAuthenticated &&
    isCompany &&
    user?._id.toString() === cropDemand?.companyId.toString();

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {isOwner && (
        <Link
          className="block mb-4 bg-teal-600 text-white font-bold py-2 px-4 rounded-md text-center hover:bg-teal-700 transition-colors"
          to={`/crop-demands/${cropDemandId}/edit`}
        >
          Edit
        </Link>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Crop Demand Details
      </h1>
      <div className="p-6 border border-slate-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold text-gray-800">
          {cropDemand.cropType}
        </h2>
        <p className="text-gray-700">Quantity: {cropDemand.quantity} tons</p>
        <p className="text-gray-700">Location: {cropDemand.location}</p>
        <p className="text-gray-700">Details: {cropDemand.details}</p>
      </div>
      <Link
        to={`bids`}
        className="block mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition-colors"
      >
        See All Bids
      </Link>
    </div>
  );
}

export default CropDemandDetails;
