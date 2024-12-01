import { useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../../farmer-api-clients";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

type Bid = {
  _id: string;
  demandId: string;
  farmerId: string;
  bidAmount: number;
  message: string;
  createdAt: string;
};

const MyBids = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useQuery<Bid[], Error>(
    "myBids",
    apiClient.allBidsForAFarmer
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8 bg-[#fec89a]/10 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          Error loading bids: {error.message}
        </p>
      </div>
    );
  }
  const handleViewBid = (bidId: string) => {
    const bidUrl = `/farmers/my-bids/${bidId}`;
    navigate(bidUrl);
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-[#fec89a]/10 to-[#ffd7ba]/20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#512601]">
            My Bids
          </h1>
          <p className="text-[#775d3f] mt-2">
            Track and manage your crop demand bids
          </p>
        </div>

        {!data || data.length === 0 ? (
          <Card className="bg-white/80 border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-[#775d3f]">
                No bids found. Start bidding to see your offers here!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((bid) => (
              <Card
                key={bid._id}
                className="bg-white shadow-md border-0 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer hover:scale-105 "
              >
                <CardContent
                  className="p-6"
                  onClick={() => handleViewBid(bid._id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-grow">
                      <span className="text-2xl font-semibold text-[#512601]">
                        ₹{bid.bidAmount.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-sm text-[#775d3f]">
                      {new Date(bid.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-[#775d3f]">
                        Message
                      </label>
                      <p className="mt-1 text-[#512601] whitespace-pre-wrap">
                        {bid.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#fec89a]/20">
                      <label className="text-sm font-medium text-[#775d3f]">
                        Reference ID
                      </label>
                      <p className="mt-1 text-sm font-mono text-[#512601]">
                        {bid._id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
