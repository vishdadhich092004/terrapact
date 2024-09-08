import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import ContractStatusSelect from "../../../components/Company/UpdateContractStatus";
import { useAppContext } from "../../../contexts/AppContext";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User,
  Calendar,
  TrendingUp,
  IndianRupeeIcon,
} from "lucide-react";

function ViewContractForCompany() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { contractId } = useParams<{ contractId: string }>();

  const {
    data: contract,
    isLoading: isContractLoading,
    error: contractError,
  } = useQuery<ContractType>(
    ["contract", contractId],
    () => {
      if (contractId) {
        return apiClient.getContractById(contractId);
      }
      return Promise.reject("No contract ID provided");
    },
    {
      enabled: !!contractId,
    }
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

  const handleStatusChange = (newStatus: string) => {
    mutation.mutate(newStatus);
  };

  if (isContractLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    );

  if (contractError || !contract)
    return (
      <div className="text-center text-red-500 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading contract details</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar status={contract.status} />
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
              Contract Details
            </h1>
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl">
                <h2 className="text-2xl font-bold text-blue-800">
                  Contract ID:
                </h2>
                <span className="text-2xl text-blue-700">{contract._id}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<TrendingUp />}
                  label="Crop Type"
                  value={contract.cropDemandId.cropType}
                />
                <InfoItem
                  icon={<User />}
                  label="Farmer"
                  value={contract.farmerId.name}
                />
                <InfoItem
                  icon={<TrendingUp />}
                  label="Quantity"
                  value={`${contract.quantity} tons`}
                />
                <InfoItem
                  icon={<IndianRupeeIcon />}
                  label="Price"
                  value={`${contract.agreedPrice}`}
                />
              </div>
              <div className="mt-8">
                <label className="block text-lg font-semibold text-blue-800 mb-3">
                  Update Status:
                </label>
                <ContractStatusSelect
                  status={contract.status}
                  onChange={handleStatusChange}
                />
              </div>
              {mutation.isLoading && (
                <p className="text-blue-600 flex items-center justify-center text-lg">
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Updating status...
                </p>
              )}
              {mutation.isError && (
                <p className="text-red-600 flex items-center justify-center text-lg">
                  <XCircle className="w-6 h-6 mr-3" />
                  Error updating status.
                </p>
              )}
              {mutation.isSuccess && (
                <p className="text-green-600 flex items-center justify-center text-lg">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Status updated successfully.
                </p>
              )}
            </div>
          </div>
          <div className="px-6 py-8 sm:p-10 bg-blue-50">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">
              Bid Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={<IndianRupeeIcon />}
                label="Bid Amount"
                value={`${contract.agreedPrice}`}
              />
              <InfoItem
                icon={<User />}
                label="Bid Placed By"
                value={contract.farmerId.name}
              />
              <InfoItem
                icon={<Calendar />}
                label="Bid Date"
                value={new Date(contract.createdAt).toLocaleDateString()}
              />
              <InfoItem
                icon={<TrendingUp />}
                label="Bid Status"
                value={contract.status}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/company/contracts/my-contracts"
            className="inline-flex items-center bg-blue-600 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-3" />
            Back to Contracts
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-6 h-6 text-blue-600",
        })}
      </div>
      <div>
        <p className="text-sm font-medium text-blue-600">{label}</p>
        <p className="mt-1 text-lg font-semibold text-blue-900">{value}</p>
      </div>
    </div>
  );
}

function ProgressBar({ status }: { status: string }) {
  const steps = ["Initiated", "In Progress", "Completed"];
  const currentStep = steps.indexOf(status) + 1;

  return (
    <div className="mb-12">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="relative">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-4 ${
                index < currentStep
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <span className="text-gray-500">{index + 1}</span>
              )}
            </div>
            <div className="text-center mt-2">
              <span
                className={`text-sm font-medium ${
                  index < currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 mt-4">
          <div
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewContractForCompany;
