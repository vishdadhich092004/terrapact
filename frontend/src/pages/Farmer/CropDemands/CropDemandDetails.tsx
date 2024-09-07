import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCropDemandByIdForFarmer } from "../../../farmer-api-clients";
import { CropDemandType } from "../../../../../backend/src/shared/company/types";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../components/Loader";
const CropDemandDetails = () => {
  const { user } = useAuthContext();
  const { demandId } = useParams<{ demandId: string }>();
  const { data, isLoading, error } = useQuery<CropDemandType>(
    ["crop-demand", demandId],
    () => getCropDemandByIdForFarmer(demandId!)
  );

  // Check if the farmer has already placed a bid
  const existingBid = data?.bids.find(
    (bid) => bid.farmerId.toString() === user?._id.toString()
  );

  // Determine if the demand is closed or open
  const isBidClosed =
    existingBid &&
    (existingBid.status === "accepted" || existingBid.status === "rejected");

  if (isLoading) return <Loader />;
  if (error || !data)
    return (
      <div className="text-red-600">Error loading crop demand details</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          {data.cropType}
        </h1>
        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-white font-semibold ${
              isBidClosed ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isBidClosed ? "Closed" : "Open"}
          </span>
        </div>
        <div className="text-lg space-y-4 text-gray-800">
          <p>
            <span className="font-bold">Quantity Required:</span>{" "}
            {data.quantity} kg
          </p>
          <p>
            <span className="font-bold">Details:</span> {data.details}
          </p>
          <p>
            <span className="font-bold">Location:</span> {data.location}
          </p>
        </div>

        {!existingBid ? (
          <div className="mt-6">
            <Link
              to={`/farmers/${demandId}/bids/new`}
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            >
              Create a Bid
            </Link>
          </div>
        ) : (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-green-600">
              You have already placed a bid
            </h2>
            <p className="text-md mt-2">
              Bid Status:{" "}
              <span
                className={`font-bold ${
                  existingBid.status === "accepted"
                    ? "text-green-600"
                    : existingBid.status === "rejected"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {existingBid.status.charAt(0).toUpperCase() +
                  existingBid.status.slice(1)}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDemandDetails;
