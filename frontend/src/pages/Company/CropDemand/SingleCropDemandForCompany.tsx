import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Edit, ListFilter, MapPin } from "lucide-react";

function SingleCropDemandForCompany() {
  const { isAuthenticated, isCompany, user } = useAuthContext();
  const { cropDemandId } = useParams<{ cropDemandId: string }>();

  const {
    data: cropDemand,
    isLoading,
    error,
  } = useQuery(["cropDemand", cropDemandId], () =>
    apiClient.getCropDemandByIdForCompany(cropDemandId!)
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#fec89a]/10">
        <Loader2 className="w-12 h-12 text-[#a24c02] animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-[#fec89a]/10 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading crop demand</p>
      </div>
    );

  if (!cropDemand) {
    return (
      <div className="text-center text-[#512601] p-8 bg-[#fec89a]/10 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Crop Demand Not Found</p>
      </div>
    );
  }

  const isOwner =
    isAuthenticated &&
    isCompany &&
    user?._id.toString() === cropDemand?.companyId.toString();

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#512601]">
            {cropDemand.cropType}
          </h1>
          <div className="flex items-center mt-2 text-[#775d3f]">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{cropDemand.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-md border-0">
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-[#512601] mb-4">
                    Details
                  </h2>
                  <p className="text-[#775d3f] whitespace-pre-wrap">
                    {cropDemand.details}
                  </p>
                </div>

                {cropDemand.image && (
                  <div className="mt-6">
                    <img
                      src={cropDemand.image}
                      alt={cropDemand.cropType}
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {isOwner && (
                <Button
                  className="bg-[#a24c02] text-white hover:bg-[#512601]"
                  asChild
                >
                  <Link to={`/crop-demands/${cropDemandId}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Demand
                  </Link>
                </Button>
              )}
              <Button
                className="bg-[#fec89a] text-[#512601] hover:bg-[#ffd7ba]"
                asChild
              >
                <Link to="bids">
                  <ListFilter className="w-4 h-4 mr-2" />
                  View Bids
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#512601] mb-4">
                  Demand Info
                </h2>
                <div className="space-y-4">
                  <InfoRow
                    label="Quantity"
                    value={`${cropDemand.quantity} Kg`}
                  />
                  <InfoRow
                    label="Status"
                    value={
                      cropDemand.status.charAt(0).toUpperCase() +
                      cropDemand.status.slice(1)
                    }
                    highlight={cropDemand.status === "open"}
                  />
                  <InfoRow
                    label="Last Date"
                    value={formatDate(cropDemand.lastDate)}
                  />
                  <InfoRow
                    label="Created"
                    value={formatDate(cropDemand.createdAt || "2024-01-01")}
                  />
                  <InfoRow
                    label="Total Bids"
                    value={cropDemand.bids.length.toString()}
                  />
                  <InfoRow
                    label="Reference ID"
                    value={cropDemand._id.slice(0, 8)}
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
  className = "",
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-[#775d3f]">{label}</span>
      <span
        className={`text-sm font-medium ${
          highlight ? "text-[#a24c02]" : "text-[#512601]"
        } ${className}`}
      >
        {value}
      </span>
    </div>
  );
}

export default SingleCropDemandForCompany;
