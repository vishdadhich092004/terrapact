import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import {
  User,
  IndianRupeeIcon,
  MapPin,
  Crop,
  Info,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import AcceptBidButton from "../../../components/Buttons/AcceptBidButton";
import RejectBidButton from "../../../components/Buttons/RejectBidButton";
import Loader from "../../../components/Loader";

function ViewBid() {
  const { demandId, bidId } = useParams<{ demandId: string; bidId: string }>();

  const {
    data: bid,
    isLoading,
    error,
  } = useQuery(["bid", demandId, bidId], () =>
    apiClient.viewBid(demandId!, bidId!)
  );

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading bid details</p>
      </div>
    );

  const isRejected = bid.status.toString() === "rejected";
  const isAccepted = bid.status.toString() === "accepted";
  const isPending = bid.status.toString() === "pending";

  const getStatusIcon = () => {
    if (isAccepted) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (isRejected) return <XCircle className="w-6 h-6 text-red-600" />;
    return <Clock className="w-6 h-6 text-[#a24c02]" />;
  };

  const getStatusText = () => {
    if (isAccepted) return "Accepted";
    if (isRejected) return "Rejected";
    return "Pending";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 p-4 sm:p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#fec89a] max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#512601]">Bid Details</h2>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#fec89a]">
            {getStatusIcon()}
            <span
              className={`font-semibold ${
                isAccepted
                  ? "text-green-600"
                  : isRejected
                  ? "text-red-600"
                  : "text-[#a24c02]"
              }`}
            >
              {getStatusText()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Crop className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Crop Type</p>
                <p className="font-semibold text-[#512601]">
                  {bid.demandId.cropType}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Quantity</p>
                <p className="font-semibold text-[#512601]">
                  {bid.demandId.quantity} Kg
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Location</p>
                <p className="font-semibold text-[#512601]">
                  {bid.demandId.location}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Farmer</p>
                <p className="font-semibold text-[#512601]">
                  {bid.farmerId.name}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <IndianRupeeIcon className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Bid Amount</p>
                <p className="font-semibold text-[#512601]">{bid.bidAmount}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-[#a24c02] mt-1" />
              <div>
                <p className="text-sm text-[#775d3f]">Submission Date</p>
                <p className="font-semibold text-[#512601]">
                  {new Date(bid.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#fec89a]">
          <p className="text-sm text-[#775d3f] mb-2">
            {bid.farmerId.name} messaged{" "}
          </p>
          <p className="text-[#512601]">{bid.message}</p>
        </div>

        {isPending && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <AcceptBidButton bidId={bidId!} demandId={demandId!} />
            <RejectBidButton bidId={bidId!} demandId={demandId!} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBid;
