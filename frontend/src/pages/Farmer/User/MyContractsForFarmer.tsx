import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";

function MyContractsForFarmer() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("farmerContracts", apiClient.getFarmerContracts);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Error loading contracts.</div>;

  if (!contracts || contracts.length === 0) {
    return (
      <div className="text-green-800 bg-green-100 p-4 rounded-lg">
        No Contracts found for you.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Your Contracts</h1>
      <div className="space-y-4">
        {contracts.map((contract: ContractType) => (
          <div
            key={contract._id}
            className="p-5 border border-green-300 rounded-lg shadow-md bg-white hover:bg-green-50 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Contract ID: {contract._id}
            </h2>
            <p className="text-green-700">
              <strong>Crop Type:</strong> {contract.cropDemandId.cropType}
            </p>
            <p className="text-green-700">
              <strong>Company:</strong> {contract.companyId.companyName}
            </p>
            <p className="text-green-700">
              <strong>Quantity:</strong> {contract.quantity} Kg
            </p>
            <p className="text-green-700">
              <strong>Price:</strong> {contract.agreedPrice}
            </p>
            <p className="text-green-700">
              <strong>Status:</strong>{" "}
              <span className="font-semibold">{contract.status}</span>
            </p>
            <Link
              to={`/farmers/contracts/${contract._id}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 mt-4 rounded transition-colors duration-200"
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
