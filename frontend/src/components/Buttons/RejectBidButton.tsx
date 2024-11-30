import * as apiClient from "../../company-api-clients";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useState } from "react";

interface RejectBidButtonProps {
  bidId: string;
  demandId: string;
}

const RejectBidButton = ({ bidId, demandId }: RejectBidButtonProps) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRejectBid = async () => {
    setLoading(true);
    try {
      await apiClient.rejectBid(bidId, demandId);
      showToast({ message: "Bid rejected successfully", type: "SUCCESS" });
      navigate(`/company/crop-demands/${demandId}`);
    } catch (error) {
      showToast({
        message: "Error rejecting bid. Please try again later.",
        type: "ERROR",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition-colors ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleRejectBid}
      disabled={loading}
      aria-label="Reject bid"
    >
      {loading ? "Processing..." : "Reject"}
    </button>
  );
};

export default RejectBidButton;
