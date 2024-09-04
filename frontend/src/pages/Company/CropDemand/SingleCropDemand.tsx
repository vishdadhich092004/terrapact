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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading crop demand</div>;

  if (!cropDemand) {
    return <div>Crop Demand Not Found</div>;
  }

  const isOwner =
    isAuthenticated &&
    isCompany &&
    user?._id.toString() === cropDemand?.companyId.toString();

  return (
    <div className="p-8">
      {isOwner && (
        <Link
          className="bg-blue-500 text-white font-bold py-3"
          to={`/crop-demands/${cropDemandId}/edit`}
        >
          Edit{" "}
        </Link>
      )}
      <h1 className="text-3xl font-bold mb-4">Crop Demand Details</h1>
      <div className="p-4 border border-slate-300 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold">{cropDemand.cropType}</h2>
        <p className="text-slate-700">Quantity: {cropDemand.quantity} tons</p>
        <p className="text-slate-700">Location: {cropDemand.location}</p>

        <p className="text-slate-700">Details: {cropDemand.details}</p>
      </div>
    </div>
  );
}

export default CropDemandDetails;
