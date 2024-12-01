import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import ContractStatusSelect from "../../../components/Company/UpdateContractStatus";
import { useAppContext } from "../../../contexts/AppContext";
import Loader from "../../../components/Loader";
import { ArrowLeft } from "lucide-react";

function ViewContractForCompany() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { contractId } = useParams<{ contractId: string }>();

  const {
    data: contract,
    isLoading,
    error,
  } = useQuery<ContractType>(
    ["contract", contractId],
    () =>
      contractId
        ? apiClient.getContractById(contractId)
        : Promise.reject("No contract ID provided"),
    { enabled: !!contractId }
  );

  const mutation = useMutation(
    (newStatus: string) =>
      apiClient.updateContractStatus(contractId!, newStatus),
    {
      onSuccess: async () => {
        showToast({ message: "Status Updated", type: "SUCCESS" });
        await queryClient.invalidateQueries(["contract", contractId]);
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">
            Error loading contract details
          </p>
          <Link
            to="/company/contracts/my-contracts"
            className="text-green-600 hover:underline"
          >
            Return to Contracts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Contract Details
          </h1>
          <Link
            to="/company/contracts/my-contracts"
            className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Link>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Status Section */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Contract Status
            </h2>
            <ProgressBar status={contract.status} />
          </div>

          {/* Contract Details */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailCard
                title="Contract Information"
                items={[
                  { label: "Contract ID", value: contract._id },
                  { label: "Crop Type", value: contract.cropDemandId.cropType },
                  { label: "Quantity", value: `${contract.quantity} Kg` },
                  { label: "Price", value: `₹${contract.agreedPrice}` },
                ]}
              />

              <DetailCard
                title="Farmer Details"
                items={[
                  { label: "Name", value: contract.farmerId.name },
                  {
                    label: "Bid Date",
                    value: new Date(contract.createdAt).toLocaleDateString(),
                  },
                  { label: "Current Status", value: contract.status },
                ]}
              />
            </div>

            {/* Status Update */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Update Status
              </h3>
              <ContractStatusSelect
                status={contract.status}
                onChange={(newStatus) => mutation.mutate(newStatus)}
              />
              {mutation.isLoading && (
                <p className="mt-2 text-sm text-gray-600">Updating status...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <dl className="space-y-3">
        {items.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-gray-600">{label}</dt>
            <dd className="text-sm font-medium text-gray-800 mt-1">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProgressBar({ status }: { status: string }) {
  const steps = ["Initiated", "In Progress", "Completed"];
  const currentStep = steps.indexOf(status) + 1;

  return (
    <div className="relative">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  index < currentStep
                    ? "bg-[#a24c02] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {index + 1}
            </div>
            <div className="text-sm mt-2 text-gray-600">{step}</div>
          </div>
        ))}
      </div>
      <div className="absolute top-4 left-0 h-[2px] bg-gray-200 w-full -z-10">
        <div
          className="h-full bg-green-600 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ViewContractForCompany;
