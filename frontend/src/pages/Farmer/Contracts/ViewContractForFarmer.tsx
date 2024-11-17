/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Printer,
  IndianRupeeIcon,
  User,
  Scale,
  Calendar,
  MapPin,
  Loader2,
  Phone,
} from "lucide-react";
import { getContractById } from "../../../farmer-api-clients";
const ViewContractForFarmer = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const {
    data: contract,
    isLoading,
    error,
  } = useQuery(
    ["contract", contractId],
    () => {
      if (contractId) {
        return getContractById(contractId);
      }
      return Promise.reject("No contract ID provided");
    },
    {
      enabled: !!contractId,
    }
  );

  const handlePrint = () => {
    window.print();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#fec89a]/10">
        <Loader2 className="w-12 h-12 text-[#a24c02] animate-spin" />
      </div>
    );

  if (error || !contract)
    return (
      <div className="text-center text-red-500 p-8 bg-[#fec89a]/10 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading contract details</p>
      </div>
    );
  console.log(contract);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#512601]">
            Contract Details
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={handlePrint}
              className="bg-[#a24c02] text-white hover:bg-[#512601] print:hidden"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Contract
            </Button>
            <Link to="/farmers/contracts/my-contracts">
              <Button
                variant="outline"
                className="border-[#a24c02] text-[#a24c02] hover:bg-[#a24c02] hover:text-white print:hidden"
              >
                Back to Contracts
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white shadow-md border-0 print:shadow-none">
          <CardContent className="p-6">
            {/* Contract Header */}
            <div className="border-b border-[#fec89a]/20 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-[#512601]">
                    {contract.cropDemandId.cropType}
                  </h2>
                  <p className="text-[#775d3f] mt-1">
                    Contract ID: {contract._id}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      contract.status === "active"
                        ? "bg-green-100 text-green-800"
                        : contract.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-[#fec89a]/20 text-[#a24c02]"
                    }`}
                  >
                    {contract.status.charAt(0).toUpperCase() +
                      contract.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contract Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <DetailRow
                  icon={Scale}
                  label="Quantity"
                  value={`${contract.quantity} Kg`}
                />
                <DetailRow
                  icon={IndianRupeeIcon}
                  label="Price per Kg"
                  value={`₹${contract.cropDemandId.perUnitPrice}`}
                />
                <DetailRow
                  icon={IndianRupeeIcon}
                  label="Agreed Price"
                  value={`₹${contract.agreedPrice}`}
                />
                <DetailRow
                  icon={Calendar}
                  label="Contract Date"
                  value={new Date(contract.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <DetailRow
                  icon={MapPin}
                  label="Delivery Location"
                  value={contract.cropDemandId.location}
                />
                <DetailRow
                  icon={Calendar}
                  label="Delivery Date"
                  value={new Date(contract.deliveryDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                />
                <DetailRow
                  icon={Phone}
                  label="Contact Number"
                  value={contract.companyId.contactNumber}
                />
                <DetailRow
                  icon={User}
                  label="Company Name"
                  value={contract.companyId.companyName}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8 border-t border-[#fec89a]/20 pt-6">
              <h3 className="text-lg font-semibold text-[#512601] mb-4">
                Terms and Conditions
              </h3>
              <div className="prose max-w-none text-[#775d3f]">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The agreed quantity must be delivered on the specified date
                  </li>
                  <li>The crop quality should meet the specified standards</li>
                  <li>
                    Payment will be processed within 7 working days after
                    delivery
                  </li>
                  <li>
                    Any quality issues must be reported within 24 hours of
                    delivery
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
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
  <div className="flex items-start">
    <Icon className="w-5 h-5 text-[#a24c02] mt-0.5 mr-3" />
    <div>
      <p className="text-sm text-[#775d3f]">{label}</p>
      <p className="text-[#512601] font-medium">{value}</p>
    </div>
  </div>
);

export default ViewContractForFarmer;
