import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCropDemandByIdForFarmer } from "../../farmer-api-clients";
import { CropDemandType } from "../../../../backend/src/shared/company/types";
import { useAuthContext } from "../../contexts/AuthContext";
import Loader from "../../components/Loader";

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

  if (isLoading) return <Loader />;
  if (error || !data)
    return (
      <div className="text-red-600">Error loading crop demand details</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {data.cropType}
        </h1>
        <p className="text-lg mb-4 text-gray-800">
          Quantity Required: {data.quantity} kg
        </p>
        <p className="text-lg mb-4 text-gray-800">Details: {data.details}</p>
        <p className="text-lg mb-4 text-gray-800">Location: {data.location}</p>
        <p className="text-lg mb-4 text-gray-800">Status: {data.status}</p>

        {!existingBid ? (
          <Link
            to={`/farmers/${demandId}/bids/new`}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
          >
            Create a bid
          </Link>
        ) : (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-green-600">
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
                {existingBid.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDemandDetails;
