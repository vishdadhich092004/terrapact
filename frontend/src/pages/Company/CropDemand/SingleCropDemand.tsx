import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../../../company-api-clients";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Loader2, Edit, ListFilter, MapPin, Info } from "lucide-react";

function CropDemandDetails() {
  const { isAuthenticated, isCompany, user } = useAuthContext();
  const { cropDemandId } = useParams<{ cropDemandId: string }>();

  const {
    data: cropDemand,
    isLoading,
    error,
  } = useQuery(["cropDemand", cropDemandId], () =>
    apiClient.getCropDemandByIdForCompany(cropDemandId!)
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Error loading crop demand</p>
      </div>
    );

  if (!cropDemand) {
    return (
      <div className="text-center text-blue-800 p-8 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Crop Demand Not Found</p>
      </div>
    );
  }

  const isOwner =
    isAuthenticated &&
    isCompany &&
    user?._id.toString() === cropDemand?.companyId.toString();

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
          Crop Demand Details
        </h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              {cropDemand.cropType}
            </h2>
            <div className="space-y-4">
              <InfoItem
                icon={<ListFilter />}
                label="Quantity"
                value={`${cropDemand.quantity} tons`}
              />
              <InfoItem
                icon={<MapPin />}
                label="Location"
                value={cropDemand.location}
              />
              <InfoItem
                icon={<Info />}
                label="Details"
                value={cropDemand.details}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {isOwner && (
            <Link
              className="w-full sm:w-auto block bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
              to={`/crop-demands/${cropDemandId}/edit`}
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Demand
            </Link>
          )}
          <Link
            to={`bids`}
            className="w-full sm:w-auto block bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <ListFilter className="w-5 h-5 mr-2" />
            See All Bids
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-5 h-5 text-blue-600",
        })}
      </div>
      <div>
        <p className="text-sm font-medium text-blue-600">{label}</p>
        <p className="mt-1 text-lg text-blue-900">{value}</p>
      </div>
    </div>
  );
}

export default CropDemandDetails;
