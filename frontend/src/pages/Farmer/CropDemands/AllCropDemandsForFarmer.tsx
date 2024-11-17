import React from "react";
import { useQuery } from "react-query";
import { getAllCropDemandsForFarmer } from "../../../farmer-api-clients";
import { Link } from "react-router-dom";
import { Sprout, Package, Info, IndianRupeeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "../../../components/Loader";
import NotFound from "@/pages/NotFound";

const AllCropDemandsForFarmer: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    ["crop-demands", 1, 10],
    () => getAllCropDemandsForFarmer(1, 10),
    {
      select: (data) => data.allCropDemands,
    }
  );

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#512601] lg:text-5xl">
              Available Crop Demands
            </h1>
            <p className="text-[#775d3f] max-w-2xl mx-auto">
              Browse through current market demands and connect with buyers
              looking for quality agricultural products.
            </p>
          </div>

          {/* Cards Grid */}
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((demand) => {
                const statusColor =
                  demand.status === "open"
                    ? "bg-emerald-600"
                    : demand.status === "closed"
                    ? "bg-red-600"
                    : "bg-[#a24c02]";

                return (
                  <Card
                    key={demand._id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[#fec89a]/30"
                  >
                    <div className="relative">
                      <img
                        src={demand.image || "/api/placeholder/400/250"}
                        alt={demand.cropType}
                        className="w-full h-48 object-cover"
                      />
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
                      >
                        {demand.status.toString().at(0)?.toUpperCase() +
                          demand.status.toString().slice(1)}
                      </span>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-[#a24c02] mb-2">
                          {demand.cropType}
                        </h2>
                        <p className="text-sm text-[#775d3f] line-clamp-2">
                          {demand.details}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Package className="h-5 w-5 text-[#a24c02]" />
                          <span className="text-sm text-[#775d3f]">
                            {demand.quantity} Kg
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupeeIcon className="h-5 w-5 text-[#a24c02]" />
                          <span className="text-sm text-[#775d3f]">
                            ₹{demand.quantity * demand.perUnitPrice}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/farmers/crop-demands/${demand._id}`}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#a24c02] rounded-lg hover:bg-[#512601] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fec89a] transition-colors gap-2"
                      >
                        <Info className="h-4 w-4" />
                        View Details
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center bg-white/50 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-4">
                <Sprout className="h-12 w-12 text-[#a24c02]" />
                <p className="text-lg text-[#775d3f]">
                  No crop demands are currently available.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCropDemandsForFarmer;
