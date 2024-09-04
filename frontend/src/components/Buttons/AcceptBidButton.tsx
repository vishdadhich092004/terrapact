import * as apiClient from "../../company-api-clients";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

interface AcceptBidButtonProps {
  bidId: string;
  demandId: string;
}

const AcceptBidButton = ({ bidId, demandId }: AcceptBidButtonProps) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const handleAcceptBid = async () => {
    try {
      await apiClient.acceptBid(bidId, demandId);
      showToast({ message: "Bid accepted successfully", type: "SUCCESS" });
      navigate("/crop-demands");
    } catch (e) {
      showToast({ message: "Error accepting bid", type: "ERROR" });
      console.log(e);
    }
  };

  return (
    <button
      className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-colors"
      onClick={handleAcceptBid}
    >
      Accept
    </button>
  );
};

export default AcceptBidButton;
