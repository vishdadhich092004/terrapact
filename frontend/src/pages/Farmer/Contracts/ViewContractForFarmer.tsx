import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../farmer-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import { ClipboardList, DollarSign, User, Scale, Calendar } from "lucide-react";

const ViewContractForFarmer: React.FC = () => {
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
      enabled: !!contractId,
    }
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-green-700">
        Loading...
      </div>
    );
  if (error || !contract)
    return (
      <div className="text-red-600 text-center py-8">
        Error loading contract details.
      </div>
    );

  const contractDetails = [
    {
      icon: ClipboardList,
      label: "Crop Type",
      value: contract.cropDemandId.cropType,
    },
    { icon: User, label: "Farmer", value: contract.farmerId.name },
    { icon: Scale, label: "Quantity", value: `${contract.quantity} tons` },
    { icon: DollarSign, label: "Price", value: `$${contract.agreedPrice}` },
    {
      icon: Calendar,
      label: "Bid Date",
      value: new Date(contract.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-green-800 sm:text-4xl mb-8 text-center">
            Contract Details
          </h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-green-200">
            <div className="px-4 py-5 sm:px-6 bg-green-100">
              <h2 className="text-lg leading-6 font-medium text-green-800">
                Contract ID: {contract._id}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-green-600">
                Current Status: {contract.status}
              </p>
            </div>
            <div className="border-t border-green-200">
              <dl>
                {contractDetails.map((detail, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-green-600 flex items-center">
                      <detail.icon className="h-5 w-5 mr-2 text-green-500" />
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-sm text-green-800 sm:mt-0 sm:col-span-2">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/farmers/contracts/my-contracts"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Back to Contracts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewContractForFarmer;
