import * as apiClient from "../../company-api-clients";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useState } from "react";

interface AcceptBidButtonProps {
  bidId: string;
  demandId: string;
}

const AcceptBidButton = ({ bidId, demandId }: AcceptBidButtonProps) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAcceptBid = async () => {
    setLoading(true);
    try {
      await apiClient.acceptBid(bidId, demandId);
      showToast({ message: "Bid accepted successfully", type: "SUCCESS" });
      navigate("/crop-demands");
    } catch (e) {
      showToast({
        message: "Error accepting bid. Please try again later.",
        type: "ERROR",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-colors ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleAcceptBid}
      disabled={loading}
      aria-label="Accept bid"
    >
      {loading ? "Processing..." : "Accept"}
    </button>
  );
};

export default AcceptBidButton;
