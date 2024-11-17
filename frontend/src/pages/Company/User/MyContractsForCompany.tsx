/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Calendar,
  ArrowRight,
  RefreshCcw,
  Package,
  User,
  IndianRupeeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MyContractsForCompany = () => {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("companyContracts", apiClient.getCompanyContracts);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#fec89a]/10">
        <Loader2 className="w-12 h-12 text-[#a24c02] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fec89a]/10 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-red-600">
            Error loading contracts
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="text-white bg-[#a24c02] hover:bg-[#512601]"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!contracts || contracts.length === 0) {
    return (
      <div className="min-h-screen bg-[#fec89a]/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="text-center p-6">
            <p className="text-xl font-semibold text-[#512601] mb-2">
              No contracts found
            </p>
            <p className="text-sm text-[#775d3f] mb-4">
              Start by creating a new contract
            </p>
            <Link to="/company/create-demand">
              <Button className="bg-[#a24c02] text-white hover:bg-[#512601]">
                Create New Demand
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#512601] text-center">
            Your Contracts
          </h1>
          <p className="mt-2 text-[#775d3f] text-center">
            Manage and track all your ongoing contracts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract: ContractType) => (
            <ContractCard key={contract._id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContractCard = ({ contract }: { contract: ContractType }) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-200 border-0">
      <CardContent className="p-6">
        <div className="mb-4">
          <StatusBadge status={contract.status} />
        </div>

        <h3 className="text-xl font-semibold text-[#512601] mb-4">
          {contract.cropDemandId.cropType}
        </h3>

        <div className="space-y-3 mb-6">
          <DetailRow
            icon={Package}
            label="Quantity"
            value={`${contract.quantity} Kg`}
          />
          <DetailRow
            icon={IndianRupeeIcon}
            label="Agreed Price"
            value={`₹${contract.agreedPrice}`}
          />
          <DetailRow
            icon={User}
            label="Farmer"
            value={contract.farmerId.name}
          />
          <DetailRow
            icon={Calendar}
            label="Created"
            value={formatDate(contract.createdAt)}
          />
        </div>

        <div className="pt-4 border-t border-[#fec89a]/20">
          <Link to={`/company/contracts/${contract._id}`}>
            <Button className="w-full bg-[#a24c02] text-white hover:bg-[#512601]">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center text-[#775d3f]">
      <Icon className="w-4 h-4 mr-2" />
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-medium text-[#512601]">{value}</span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "initiated":
        return "bg-yellow-100 text-yellow-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default MyContractsForCompany;
