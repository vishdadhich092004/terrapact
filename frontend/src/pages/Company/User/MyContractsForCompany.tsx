import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import { Loader2 } from "lucide-react";

function MyContractsForCompany() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("companyContracts", apiClient.getCompanyContracts);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
        <Loader2 className="w-8 h-8 text-[#a24c02] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-600">Error loading contracts</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[#a24c02] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!contracts || contracts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600">No contracts found</p>
          <p className="text-sm text-gray-500">
            Start by creating a new contract
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-[#512601]">
            Your Contracts
          </h1>
          <p className="mt-2 text-sm text-[#775d3f]">
            Manage and track all your ongoing contracts
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract: ContractType) => (
            <ContractCard key={contract._id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContractCard({ contract }: { contract: ContractType }) {
  return (
    <div className="bg-white border border-[#fec89a] rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 overflow-hidden">
      <div className="p-6">
        {/* Status Bar */}
        <div className="mb-6">
          <StatusIndicator status={contract.status} />
        </div>

        {/* Contract Details */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500">Contract ID</p>
            <p className="text-sm font-medium text-[#512601] truncate">
              {contract._id}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Crop Type</p>
              <p className="text-sm font-medium text-[#512601]">
                {contract.cropDemandId.cropType}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Farmer</p>
              <p className="text-sm font-medium text-[#512601]">
                {contract.farmerId.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Quantity</p>
              <p className="text-sm font-medium text-[#512601]">
                {contract.quantity} Kg
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-sm font-medium text-[#512601]">
                ₹{contract.agreedPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/company/contracts/${contract._id}`}
          className="mt-6 block w-full px-4 py-2 bg-[#a24c02] text-white text-sm font-medium text-center rounded-md hover:bg-[#512601] transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const steps = ["Initiated", "In Progress", "Completed"];
  const currentStep = steps.indexOf(status) + 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{status}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#a24c02] transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full ${
              index < currentStep ? "bg-[#a24c02]" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default MyContractsForCompany;
