import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import {
  Loader2,
  User,
  IndianRupeeIcon,
  MapPin,
  Crop,
  Info,
} from "lucide-react";
import AcceptBidButton from "../../../components/Buttons/AcceptBidButton";
import RejectBidButton from "../../../components/Buttons/RejectBidButton";

function ViewBid() {
  const { demandId, bidId } = useParams<{ demandId: string; bidId: string }>();

  const {
    data: bid,
    isLoading,
    error,
  } = useQuery(["bid", demandId, bidId], () =>
    apiClient.viewBid(demandId!, bidId!)
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading bid details</p>
      </div>
    );

  const isRejected = bid.status.toString() === "rejected";
  const isAccepted = bid.status.toString() === "accepted";
  const isPending = bid.status.toString() === "pending";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Bid Details
        </h2>
        <div className="space-y-4">
          <p className="text-blue-700 flex items-center">
            <Crop className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Crop Type:</strong> {bid.demandId.cropType}
          </p>
          <p className="text-blue-700 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Quantity:</strong> {bid.quantity} Kg
          </p>
          <p className="text-blue-700 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Location:</strong> {bid.demandId.location}
          </p>
          <p className="text-blue-700 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Details:</strong> {bid.demandId.details}
          </p>
          <p className="text-blue-700 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Farmer:</strong> {bid.farmerId.name}
          </p>
          <p className="text-blue-700 flex items-center">
            <IndianRupeeIcon className="w-5 h-5 mr-2 text-blue-600" />
            <strong>Price:</strong> {bid.bidAmount}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-6 w-full max-w-md">
        {isPending && (
          <>
            <AcceptBidButton bidId={bidId!} demandId={demandId!} />
            <RejectBidButton bidId={bidId!} demandId={demandId!} />
          </>
        )}
        {isAccepted && (
          <h3 className="text-green-600 font-semibold bg-white px-4 py-2 rounded-full shadow-md">
            Accepted
          </h3>
        )}
        {isRejected && (
          <h3 className="text-red-600 font-semibold bg-white px-4 py-2 rounded-full shadow-md">
            Rejected
          </h3>
        )}
      </div>
    </div>
  );
}

export default ViewBid;
