import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import ContractStatusSelect from "../../../components/Company/UpdateContractStatus";
import Loader from "../../../components/Loader";
import { useAppContext } from "../../../contexts/AppContext";

function ViewContractForCompany() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { contractId } = useParams<{ contractId: string }>();
  const {
    data: contract,
    isLoading,
    error,
  } = useQuery<ContractType>(
    ["contract", contractId],
    () => {
      if (contractId) {
        return apiClient.getContractById(contractId);
      }
      return Promise.reject("No contract ID provided");
    },
    {
      enabled: !!contractId, // Ensures the query only runs if contractId is available
    }
  );
  const mutation = useMutation(
    (newStatus: string) =>
      apiClient.updateContractStatus(contractId!, newStatus),
    {
      onSuccess: async () => {
        showToast({ message: "Status Updated", type: "SUCCESS" });
        await queryClient.invalidateQueries("getContractById");
        navigate(`/company/contracts/my-contracts`);
      },
    }
  );

  if (isLoading) return <Loader />;
  if (error || !contract)
    return <div className="text-red-600">Error loading contract details.</div>;

  const handleStatusChange = (newStatus: string) => {
    mutation.mutate(newStatus);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">
        Contract Details
      </h1>
      <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
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
        <div>
          <strong>Update Status:</strong>{" "}
          <ContractStatusSelect
            status={contract.status}
            onChange={handleStatusChange}
          />
        </div>
        {mutation.isLoading && <p>Updating status...</p>}
        {mutation.isError && (
          <p className="text-red-600">Error updating status.</p>
        )}

        <h3 className="text-lg font-semibold mt-4 text-gray-800">
          Bid Details
        </h3>
        <p className="text-gray-700">
          <strong>Bid Amount:</strong> ${contract.agreedPrice}
        </p>
        <p className="text-gray-700">
          <strong>Bid Placed By:</strong> {contract.farmerId.name}
        </p>
        <p className="text-gray-700">
          <strong>Bid Date:</strong>{" "}
          {new Date(contract.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <strong>Bid Status:</strong> {contract.status}
        </p>
      </div>
      <Link
        to="/company/contracts/my-contracts"
        className="bg-teal-600 text-white font-bold px-4 py-2 mt-5 inline-block rounded"
      >
        Back to Contracts
      </Link>
    </div>
  );
}

export default ViewContractForCompany;
