import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

function CropDemandList() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("cropDemands", apiClient.getCompanyDemands);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-[#a24c02]" size={48} />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center">Error loading crop demands</div>
    );

  if (!cropDemands || cropDemands.length === 0) {
    return (
      <div className="text-center text-[#775d3f]">No Crop Demands Found</div>
    );
  }

  return (
    <div className="p-8 bg-[#fec89a] bg-opacity-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#512601]">Crop Demands</h1>
      <ul className="space-y-6">
        {cropDemands.map((demand) => (
          <li
            key={demand._id}
            className="p-6 border border-[#fec89a] rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-[#a24c02]">
              {demand.cropType}
            </h2>
            <p className="text-[#775d3f]">Quantity: {demand.quantity} tons</p>
            <p className="text-[#775d3f]">Location: {demand.location}</p>
            <p className="text-[#775d3f]">Details: {demand.details}</p>
            <p className={`text-[#775d3f] font-semibold`}>
              Status: {demand.status.toString()}
            </p>
            <Link
              to={`/crop-demands/${demand._id}`}
              className="inline-block mt-4 bg-[#a24c02] text-white font-bold py-2 px-4 rounded hover:bg-[#512601] transition duration-200"
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
