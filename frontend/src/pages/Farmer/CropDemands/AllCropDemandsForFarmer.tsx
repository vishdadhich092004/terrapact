import React from "react";
import { useQuery } from "react-query";
import { getAllCropDemandsForFarmer } from "../../../farmer-api-clients";
import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-[#512601] mb-8 text-center">
            Available Crop Demands
          </h1>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {data.map((demand) => {
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
                        <span
                          className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
                        >
                          {demand.status.toString().at(0)?.toUpperCase() +
                            demand.status
                              .toString()
                              .slice(1, demand.status.toString().length)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[#775d3f]">
                          <span className="font-medium">Quantity: </span>
                          {demand.quantity} Kg
                        </p>
                        <p className="text-[#775d3f]">
                          <span className="font-medium">Details: </span>
                          {demand.details}
                        </p>
                        <p className="text-[#775d3f]">
                          <span className="font-medium">
                            Expected Profit :{" "}
                          </span>
                          {demand.quantity * demand.perUnitPrice}
                        </p>
                      </div>
                      <Link
                        to={`/farmers/crop-demands/${demand._id}`}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#a24c02] hover:bg-[#512601] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fec89a] transition-colors"
                      >
                        <Sprout className="h-5 w-5 mr-2" />
                        View More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
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

export default AllCropDemandsForFarmer;
