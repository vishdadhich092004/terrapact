import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";

function CropDemandList() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("cropDemands", apiClient.getCompanyDemands);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading crop demands</div>;

  if (!cropDemands || cropDemands.length === 0) {
    return <div>No Crop Demands Found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Crop Demands</h1>
      <ul className="space-y-4">
        {cropDemands.map((demand) => (
          <li
            key={demand._id}
            className="p-4 border border-slate-300 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">{demand.cropType}</h2>
            <p className="text-slate-700">Quantity: {demand.quantity} tons</p>
            <p className="text-slate-700">Location: {demand.location}</p>

            <p className="text-slate-700">Details: {demand.details}</p>
            <Link
              to={`/crop-demands/${demand._id}`}
              className="bg-green-500 text-white font-bold p-3"
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
