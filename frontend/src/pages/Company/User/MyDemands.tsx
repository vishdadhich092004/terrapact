import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

function MyDemands() {
  const {
    data: cropDemands,
    isLoading,
    error,
  } = useQuery("companyDemands", apiClient.getCompanyDemands);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#fec89a] bg-opacity-20">
        <Loader2 className="w-10 h-10 text-[#a24c02] animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-[#fec89a] bg-opacity-20 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading crop demands</p>
      </div>
    );

  if (!cropDemands || cropDemands.length === 0) {
    return (
      <div className="text-center p-8 bg-[#fec89a] bg-opacity-20 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-[#512601]">
          No Crop Demands found for your company
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-opacity-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#512601]">
        Your Company's Crop Demands
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cropDemands.map((demand) => (
          <div
            key={demand._id}
            className="relative p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#fec89a] bg-opacity-50 hover:from-[#fec89a] hover:to-white hover:bg-opacity-70 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            <StatusTag status={demand.status} />
            <h2 className="text-2xl font-semibold text-[#a24c02] mb-4 mt-6">
              {demand.cropType}
            </h2>
            <p className="text-[#775d3f] mb-2">
              <span className="font-medium">Quantity:</span> {demand.quantity}{" "}
              tons
            </p>
            <p className="text-[#775d3f] mb-2">
              <span className="font-medium">Location:</span> {demand.location}
            </p>
            <p className="text-[#775d3f] mb-2">
              <span className="font-medium">Details:</span> {demand.details}
            </p>
            <Link
              className="block w-full bg-[#a24c02] text-white py-2 px-4 rounded-md text-center hover:bg-[#512601] transition-colors duration-300 shadow-md hover:shadow-lg mt-4"
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

type Props = {
  status: string;
};
function StatusTag({ status }: Props) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-600";
      case "closed":
        return "bg-red-600";
      default:
        return "bg-[#a24c02]";
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 ${getStatusColor(
        status
      )} text-white px-3 py-1 rounded-tr-xl rounded-bl-xl text-sm font-semibold`}
    >
      {status}
    </div>
  );
}

export default MyDemands;
