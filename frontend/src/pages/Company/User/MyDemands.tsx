import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";

function MyDemands() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("companyDemands", apiClient.getCompanyDemands);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading crop demands: </div>;

  if (!cropDemands || cropDemands.length === 0) {
    return <div>No Crop Demands found for your company</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Company’s Crop Demands</h1>
      <div className="space-y-4">
        {cropDemands.map((demand) => (
          <div
            key={demand._id}
            className="p-4 border border-slate-300 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">{demand.cropType}</h2>
            <p className="text-slate-700">Quantity: {demand.quantity} tons</p>
            <p className="text-slate-700">Location: {demand.location}</p>

            <p className="text-slate-700">Details: {demand.details}</p>
            <p>{demand.status.toString()}</p>
            <Link
              className="bg-yellow-400 p-3"
              to={`/crop-demands/${demand._id}`}
            >
              Voew MOre
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDemands;
