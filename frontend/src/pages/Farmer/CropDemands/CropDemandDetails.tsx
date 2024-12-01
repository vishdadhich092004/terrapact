import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCropDemandByIdForFarmer } from "../../../farmer-api-clients";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CropDemandType } from "../../../../../backend/src/shared/types";
import Loader from "../../../components/Loader";

const SingleCropDemandForFarmer: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { demandId } = useParams<{ demandId: string }>();
  const {
    data: cropDemand,
    isLoading,
    error,
  } = useQuery<CropDemandType>(["crop-demand", demandId], () =>
    getCropDemandByIdForFarmer(demandId!)
  );

  if (isLoading) return <Loader />;

  if (error || !cropDemand)
    return (
      <div className="text-center text-red-500 p-8 bg-[#fec89a]/10 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading crop demand</p>
      </div>
    );

  const existingBid = cropDemand.bids.find(
    (bid) => bid.farmerId.toString() === user?._id.toString()
  );

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleViewBid = (bidId: string) => {
    navigate(`/farmers/my-bids/${bidId}`);
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#512601]">
            {cropDemand.cropType}
          </h1>
          <div className="text-[#775d3f] mt-2">
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

            <div className="mt-6">
              {!existingBid ? (
                <Button
                  className="bg-[#a24c02] text-white hover:bg-[#512601]"
                  asChild
                >
                  <Link to={`/farmers/${demandId}/bids/new`}>Create a Bid</Link>
                </Button>
              ) : (
                <Card
                  className="bg-[#fec89a]/20 border-[#a24c02]/20"
                  onClick={() => handleViewBid(existingBid._id)}
                >
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-[#512601] mb-2">
                      Your Bid Status <br />
                      <span className="text-xs text-gray-800 font-light">
                        Click to view more
                      </span>
                    </h2>
                    <p className="text-md flex items-center">
                      <span className="font-medium mr-2">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                          existingBid.status === "accepted"
                            ? "bg-green-500"
                            : existingBid.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {existingBid.status.charAt(0).toUpperCase() +
                          existingBid.status.slice(1)}
                      </span>
                    </p>
                    {existingBid.status === "pending" && (
                      <span className="text-sm">
                        Details will be shared if bid is accepted.
                      </span>
                    )}
                    {existingBid.status === "accepted" && (
                      <span className="text-sm">
                        Click here to contact the the partner.
                      </span>
                    )}
                  </CardContent>
                </Card>
              )}
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
                    value={`${cropDemand.quantity} kg`}
                  />
                  <InfoRow
                    label="Expected Profit"
                    value={`Rs. ${
                      cropDemand.perUnitPrice * cropDemand.quantity
                    }`}
                  />
                  <InfoRow
                    label="Last Date"
                    value={formatDate(cropDemand.lastDate)}
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
};

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

export default SingleCropDemandForFarmer;
