import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function MyContractsForFarmer() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("farmerContracts", apiClient.getFarmerContracts);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-[#a24c02] animate-spin" />
      </div>
    );

  if (error)
    return <div className="text-red-600">Error loading contracts.</div>;

  if (!contracts || contracts.length === 0) {
    return (
      <div className="text-[#512601] bg-[#fec89a]/20 p-4 rounded-lg">
        No Contracts found for you.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#512601]">Your Contracts</h1>
      <div className="space-y-4">
        {contracts.map((contract: ContractType) => (
          <div
            key={contract._id}
            className="p-5 border border-[#fec89a] rounded-lg shadow-md bg-white hover:bg-[#fec89a]/5 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-[#a24c02] mb-2">
              Contract ID: {contract._id}
            </h2>
            <p className="text-[#775d3f]">
              <strong>Crop Type:</strong> {contract.cropDemandId.cropType}
            </p>
            <p className="text-[#775d3f]">
              <strong>Company:</strong> {contract.companyId.companyName}
            </p>
            <p className="text-[#775d3f]">
              <strong>Quantity:</strong> {contract.quantity} Kg
            </p>
            <p className="text-[#775d3f]">
              <strong>Price:</strong> {contract.agreedPrice}
            </p>
            <p className="text-[#775d3f]">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  contract.status === "active"
                    ? "text-green-600"
                    : contract.status === "completed"
                    ? "text-blue-600"
                    : "text-[#a24c02]"
                }`}
              >
                {contract.status}
              </span>
            </p>
            <Link
              to={`/farmers/contracts/${contract._id}`}
              className="inline-block bg-[#a24c02] hover:bg-[#512601] text-white font-bold px-4 py-2 mt-4 rounded transition-colors duration-200"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyContractsForFarmer;
