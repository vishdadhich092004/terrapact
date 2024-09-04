import * as apiClient from "../../company-api-clients";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

interface RejectBidButtonProps {
  bidId: string;
  demandId: string;
}

const RejectBidButton = ({ bidId, demandId }: RejectBidButtonProps) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const handleRejectBid = async () => {
    try {
      await apiClient.rejectBid(bidId, demandId);
      showToast({ message: "Bid rejected successfully", type: "SUCCESS" });
      navigate("/crop-demands");
    } catch (error) {
      showToast({ message: "Error rejecting bid", type: "ERROR" });
      console.log(error);
    }
  };

  return (
    <button
      className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition-colors"
      onClick={handleRejectBid}
    >
      Reject
    </button>
  );
};

export default RejectBidButton;
