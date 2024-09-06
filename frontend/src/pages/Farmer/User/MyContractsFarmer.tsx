import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import Loader from "../../../components/Loader";

function MyContractsFarmer() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("farmerContracts", apiClient.getFarmerContracts);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Error loading contracts.</div>;

  if (!contracts || contracts.length === 0) {
    return <div className="text-gray-800">No Contracts found for you.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Contracts</h1>
      <div className="space-y-4">
        {contracts.map((contract: ContractType) => (
          <div
            key={contract._id}
            className="p-4 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Contract ID: {contract._id}
            </h2>
            <p className="text-gray-700">
              Crop Type: {contract.cropDemandId.cropType}
            </p>
            <p className="text-gray-700">
              Company: {contract.companyId.companyName}
            </p>
            <p className="text-gray-700">Quantity: {contract.quantity} tons</p>
            <p className="text-gray-700">Price: ${contract.agreedPrice}</p>
            <p className="text-gray-700">Status: {contract.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyContractsFarmer;
