import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { ContractType } from "../../../../../backend/src/shared/types";
import {
  Building2,
  Package,
  IndianRupeeIcon,
  FileArchive,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "../../../components/Loader";

function MyContractsForFarmer() {
  const {
    data: contracts,
    isLoading,
    error,
  } = useQuery("farmerContracts", apiClient.getFarmerContracts);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto m-8 border-red-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <FileArchive className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-red-600 font-medium">Error loading contracts.</p>
            <p className="text-sm text-gray-600">
              Please try again later or contact support if the issue persists.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#512601] lg:text-5xl">
              Your Contracts
            </h1>
            <p className="text-[#775d3f] max-w-2xl mx-auto">
              Manage and track all your active and completed farming contracts
              in one place.
            </p>
          </div>

          {/* Contracts Grid */}
          {contracts && contracts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contracts.map((contract: ContractType) => {
                const statusColors = {
                  active: "bg-emerald-100 text-emerald-700",
                  completed: "bg-blue-100 text-blue-700",
                  pending: "bg-[#fec89a] text-[#a24c02]",
                };

                const statusColor =
                  statusColors[contract.status as keyof typeof statusColors] ||
                  "bg-gray-100 text-gray-700";

                return (
                  <Card
                    key={contract._id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[#fec89a]/30"
                  >
                    <CardHeader className="border-b border-[#fec89a]/20 bg-[#fec89a]/5">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-semibold text-[#a24c02]">
                          {contract.cropDemandId.cropType}
                        </CardTitle>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}
                        >
                          {contract.status.charAt(0).toUpperCase() +
                            contract.status.slice(1)}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-5 w-5 text-[#a24c02]" />
                            <div>
                              <p className="text-sm font-medium text-[#775d3f]">
                                Company
                              </p>
                              <p className="text-sm text-[#512601]">
                                {contract.companyId.companyName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="h-5 w-5 text-[#a24c02]" />
                            <div>
                              <p className="text-sm font-medium text-[#775d3f]">
                                Quantity
                              </p>
                              <p className="text-sm text-[#512601]">
                                {contract.quantity} Kg
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <IndianRupeeIcon className="h-5 w-5 text-[#a24c02]" />
                            <div>
                              <p className="text-sm font-medium text-[#775d3f]">
                                Agreed Price
                              </p>
                              <p className="text-sm text-[#512601]">
                                ₹{contract.agreedPrice}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileArchive className="h-5 w-5 text-[#a24c02]" />
                            <div>
                              <p className="text-sm font-medium text-[#775d3f]">
                                Contract ID
                              </p>
                              <p className="text-sm text-[#512601] font-mono">
                                {contract._id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/farmers/contracts/${contract._id}`}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#a24c02] rounded-lg hover:bg-[#512601] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fec89a] transition-colors gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Contract Details
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center bg-white/50 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-4">
                <FileArchive className="h-12 w-12 text-[#a24c02]" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-[#512601]">
                    No Contracts Found
                  </p>
                  <p className="text-sm text-[#775d3f]">
                    You don't have any active contracts at the moment.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyContractsForFarmer;
