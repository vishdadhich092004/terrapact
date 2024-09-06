import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import Loader from "../../../components/Loader";

function MyContracts() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("companyContracts", apiClient.getCompanyContracts);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Error loading contracts.</div>;

  if (!contracts || contracts.length === 0) {
    return (
      <div className="text-gray-800">No Contracts found for your company.</div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">
        Your Company’s Contracts
      </h1>
      <div className="space-y-4">
        {contracts.map((contract: ContractType) => (
          <div
            key={contract._id}
            className="p-6 border border-slate-300 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Contract ID: {contract._id}
            </h2>
            <p className="text-gray-700">
              <strong>Crop Type:</strong> {contract.cropDemandId.cropType}
            </p>
            <p className="text-gray-700">
              <strong>Farmer:</strong> {contract.farmerId.name}
            </p>
            <p className="text-gray-700">
              <strong>Quantity:</strong> {contract.quantity} tons
            </p>
            <p className="text-gray-700">
              <strong>Price:</strong> ${contract.agreedPrice}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {contract.status}
            </p>
            {/* <Link
              to={`/contracts/${contract._id}`}
              className="bg-yellow-400 text-white font-bold px-3 py-3 mt-5"
            >
              View More
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyContracts;
