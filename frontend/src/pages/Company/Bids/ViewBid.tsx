import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import Loader from "../../../components/Loader";
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

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-red-600 text-center">Error loading bid details</div>
    );

  const isRejected = bid.status.toString() === "rejected";
  const isAccepted = bid.status.toString() === "accepted";
  const isPending = bid.status.toString() === "pending";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-teal-600">
          Bid Details
        </h2>
        <p className="text-gray-800 mb-2">
          <strong>Crop Type:</strong> {bid.demandId.cropType}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Quantity:</strong> {bid.quantity} tons
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Location:</strong> {bid.demandId.location}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Details:</strong> {bid.demandId.details}
        </p>
        <p className="text-gray-800 mb-2">
          <strong>Farmer:</strong> {bid.farmerId.name}
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Price:</strong> ${bid.bidAmount}
        </p>
      </div>
      <div className="flex justify-between mt-4 w-full max-w-md">
        {isPending && (
          <>
            <AcceptBidButton bidId={bidId!} demandId={demandId!} />
            <RejectBidButton bidId={bidId!} demandId={demandId!} />
          </>
        )}
        {isAccepted && (
          <h3 className="text-green-600 font-semibold mt-4">Accepted</h3>
        )}
        {isRejected && (
          <h3 className="text-red-600 font-semibold mt-4">Rejected</h3>
        )}
      </div>
    </div>
  );
}

export default ViewBid;
