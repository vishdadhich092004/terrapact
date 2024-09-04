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
  if (error) return <div>Error loading bid details</div>;

  const isRejected = bid.status.toString() === "rejected";
  const isAccepted = bid.status.toString() === "accepted";
  const isPending = bid.status.toString() === "pending";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Bid Details</h2>
        <p>
          <strong>Crop Type:</strong> {bid.demandId.cropType}
        </p>
        <p>
          <strong>Quantity:</strong> {bid.quantity} tons
        </p>
        <p>
          <strong>Location:</strong> {bid.demandId.location}
        </p>
        <p>
          <strong>Details:</strong> {bid.demandId.details}
        </p>
        <p>
          <strong>Farmer:</strong> {bid.farmerId.name}
        </p>
        <p>
          <strong>Price:</strong> ${bid.bidAmount}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        {isPending && (
          <>
            <AcceptBidButton bidId={bidId!} demandId={demandId!} />
            <RejectBidButton bidId={bidId!} demandId={demandId!} />
          </>
        )}
        {isAccepted && <h3>Accepted</h3>}
        {isRejected && <h3>Rejected</h3>}
      </div>
    </div>
  );
}

export default ViewBid;
