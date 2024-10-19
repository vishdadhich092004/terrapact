import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCompanyDemands } from "../../../company-api-clients";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CropDemandType } from "../../../../../backend/src/shared/company/types";

const AllCropDemandsForCompany: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error, isPreviousData } = useQuery(
    ["cropDemands", page],
    () => getCompanyDemands(page, limit),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
        <Loader2 className="w-12 h-12 text-[#a24c02] animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading crop demands</p>
      </div>
    );

  const cropDemands = data?.allCropDemands || [];
  const totalPages = Math.ceil((data?.totalCropDemands || 0) / limit);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-[#512601] mb-8 text-center">
            Company Crop Demands
          </h1>
          {cropDemands.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 mb-8">
                {cropDemands.map((demand: CropDemandType) => {
                  const statusColor =
                    demand.status === "open"
                      ? "bg-green-600"
                      : demand.status === "closed"
                      ? "bg-red-600"
                      : "bg-[#a24c02]";

                  return (
                    <div
                      key={demand._id}
                      className="bg-white border border-[#fec89a] rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex"
                    >
                      <img
                        src={demand.image || "/api/placeholder/300/200"}
                        alt={demand.cropType}
                        className="w-1/3 object-cover"
                      />
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-2xl font-semibold text-[#a24c02]">
                            {demand.cropType}
                          </h5>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                              Bids: {demand.bids?.length || 0}
                            </span>
                            <span
                              className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
                            >
                              {demand.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[#775d3f]">
                            <span className="font-medium">Quantity: </span>
                            {demand.quantity} Kg
                          </p>
                          <p className="text-[#775d3f]">
                            <span className="font-medium">Location: </span>
                            {demand.location}
                          </p>
                          <p className="text-[#775d3f]">
                            <span className="font-medium">Details: </span>
                            {demand.details}
                          </p>
                        </div>
                        <Link
                          to={`/company/crop-demands/${demand._id}`}
                          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#a24c02] hover:bg-[#512601] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fec89a] transition-colors"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="bg-[#a24c02] hover:bg-[#512601] text-white"
                >
                  Previous Page
                </Button>
                <span className="flex items-center px-4">
                  Page {page} of {totalPages}
                </span>
                <Button
                  onClick={() => {
                    if (!isPreviousData && page < totalPages) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={isPreviousData || page >= totalPages}
                  className="bg-[#a24c02] hover:bg-[#512601] text-white"
                >
                  Next Page
                </Button>
              </div>
            </>
          ) : (
            <div className="text-[#775d3f] text-center bg-white p-8 rounded-lg shadow-md border border-[#fec89a]">
              No crop demands available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCropDemandsForCompany;
