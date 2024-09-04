import { useQuery } from "react-query";
import * as apiClient from "../../../company-api-clients";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { BidType } from "../../../../../backend/src/shared/farmer/types";

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
  if (error) return <div>Error loading bids</div>;

  return (
    <div>
      <h2>All Bids for Demand ID: {demandId}</h2>
      <ul>
        {bids.map((bid: BidType) => (
          <li key={bid._id}>
            <p>Farmer: {bid.farmerId.name}</p>
            <p>Amount: {bid.bidAmount}</p>
            <Link to={`${bid._id}`}>View Bid</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllBidsForADemand;
