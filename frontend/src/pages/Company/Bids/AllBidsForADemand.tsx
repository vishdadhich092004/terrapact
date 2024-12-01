import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link, useParams } from "react-router-dom";
import {
  User,
  Eye,
  IndianRupeeIcon,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { BidType } from "../../../../../backend/src/shared/types";
import Loader from "../../../components/Loader";

function AllBidsForADemand() {
  const { demandId } = useParams<{ demandId: string }>();

  const {
    data: bids,
    isLoading,
    error,
  } = useQuery(["getAllBidsForADemandForACompany", demandId], () =>
    apiClient.getAllBidsForADemandForACompany(demandId!)
  );

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading bids</p>
      </div>
    );

  if (!bids || bids.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#512601] mb-4">
            No Bids Yet
          </h2>
          <p className="text-[#775d3f]">
            There are currently no bids for this demand.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#fec89a] mb-8">
          <h2 className="text-3xl font-bold text-[#512601] text-center">
            Bids Overview
          </h2>
          <p className="text-[#775d3f] text-center mt-2">
            Total Bids: {bids.length} | Demand ID: {demandId}
          </p>
        </div>

        <div className="grid gap-6">
          {bids.map((bid: BidType) => (
            <div
              key={bid._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#fec89a]/50 hover:border-[#fec89a] transform hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-[#775d3f]">
                      <User className="w-5 h-5 mr-2 text-[#a24c02]" />
                      <div>
                        <p className="text-sm font-medium">Farmer</p>
                        <p className="font-semibold text-[#512601]">
                          {bid.farmerId.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-[#775d3f]">
                      <IndianRupeeIcon className="w-5 h-5 mr-2 text-[#a24c02]" />
                      <div>
                        <p className="text-sm font-medium">Bid Amount</p>
                        <p className="font-semibold text-[#512601]">
                          {bid.bidAmount}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-[#775d3f]">
                      <Calendar className="w-5 h-5 mr-2 text-[#a24c02]" />
                      <div>
                        <p className="text-sm font-medium">Submitted</p>
                        <p className="font-semibold text-[#512601]">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-[#775d3f]">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#a24c02]" />
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="font-semibold text-[#512601]">
                          {bid.status.toString().at(0)?.toUpperCase() +
                            bid.status
                              .toString()
                              .slice(1, bid.status.toString().length)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`${bid._id}`}
                  className="inline-flex items-center px-6 py-3 bg-[#a24c02] text-white font-medium rounded-lg hover:bg-[#512601] transition-colors duration-300 shadow-md hover:shadow-lg group"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBidsForADemand;
