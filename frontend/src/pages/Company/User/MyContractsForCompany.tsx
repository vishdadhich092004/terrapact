import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";

function MyContractsForCompany() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("companyContracts", apiClient.getCompanyContracts);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading contracts</p>
      </div>
    );

  if (!contracts || contracts.length === 0) {
    return (
      <div className="text-center p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-blue-800">
          No Contracts found for your company
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Your Company's Contracts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract: ContractType) => (
          <div
            key={contract._id}
            className="relative p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Contract ID: {contract._id}
            </h2>
            <p className="text-blue-800 mb-2">
              <span className="font-medium">Crop Type:</span>{" "}
              {contract.cropDemandId.cropType}
            </p>
            <p className="text-blue-800 mb-2">
              <span className="font-medium">Farmer:</span>{" "}
              {contract.farmerId.name}
            </p>
            <p className="text-blue-800 mb-2">
              <span className="font-medium">Quantity:</span> {contract.quantity}{" "}
              Kg
            </p>
            <p className="text-blue-800 mb-2">
              <span className="font-medium">Price:</span> {contract.agreedPrice}
            </p>
            <StatusProgressBar status={contract.status} />
            <Link
              to={`/company/contracts/${contract._id}`}
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg mt-4"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

type StatusProgressBarProps = {
  status: string;
};

function StatusProgressBar({ status }: StatusProgressBarProps) {
  const steps = ["Initiated", "In Progress", "Completed"];
  const currentStep = steps.indexOf(status) + 1;

  return (
    <div className="mt-4 mb-6">
      <p className="text-blue-800 mb-2 font-medium">Status: {status}</p>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step}
              className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600"
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
              ) : (
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    index < currentStep ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default MyContractsForCompany;
