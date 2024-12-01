import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getABidForFarmer } from "../../../farmer-api-clients";
import { Printer, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Loader from "../../../components/Loader";

const ViewBidForFarmer = () => {
  const { bidId } = useParams();
  const { data: bid, isLoading } = useQuery("getABidForFarmer", () =>
    getABidForFarmer(bidId!)
  );

  const handlePrint = () => {
    window.print();
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return <CheckCircle className="text-green-500" />;
      case "pending":
        return <Clock className="text-yellow-500" />;
      case "rejected":
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!bid) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          The requested bid could not be found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bid Details</h1>
        <div className="space-x-2 print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bid Reference: {bid._id}</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(bid.status)}
              <span
                className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${
                  bid.status.toLowerCase() === "accepted"
                    ? "bg-green-100 text-green-800"
                    : ""
                }
                ${
                  bid.status.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : ""
                }
                ${
                  bid.status.toLowerCase() === "rejected"
                    ? "bg-red-100 text-red-800"
                    : ""
                }
              `}
              >
                {bid.status.at(0).toUpperCase() +
                  bid.status.slice(1, bid.length)}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Bid Amount</h3>
              <p className="text-2xl font-bold">
                ₹{bid.bidAmount.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">
                Submission Date
              </h3>
              <p className="text-lg">
                {new Date(bid.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Message</h3>
            <p className="text-lg border rounded-lg p-4 bg-gray-50">
              {bid.message}
            </p>
          </div>

          {bid.status.toString() === "accepted" && (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">
                Congratulations! Your bid has been accepted
              </AlertTitle>
              <AlertDescription className="text-green-700">
                <div className="mt-2 space-y-2">
                  <p>You can contact the partner using the details below:</p>
                  <p className="font-medium">
                    Contact Number:{" "}
                    {bid.demandId.companyId.contactNumber.toString()}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewBidForFarmer;
