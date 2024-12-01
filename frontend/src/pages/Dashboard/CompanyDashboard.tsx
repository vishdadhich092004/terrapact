/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getCompanyDemands,
  getCompanyContracts,
} from "../../company-api-clients";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ContractType,
  CropDemandType,
} from "../../../../backend/src/shared/types";
import { Link } from "react-router-dom";
import { timeLeft } from "@/utils/timeCalc";
import Loader from "../../components/Loader";

const CompanyDashboard = () => {
  const [demands, setDemands] = useState<CropDemandType[]>([]);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [demandsResponse, contractsResponse] = await Promise.all([
          getCompanyDemands(1, 100), // Get more demands for the dashboard
          getCompanyContracts(),
        ]);
        setDemands(demandsResponse.allCropDemands || []);
        setContracts(contractsResponse || []);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>
    );

  const demandChartData = demands.map((demand) => ({
    name: demand.cropType,
    quantity: demand.quantity,
  }));

  const activeDemands = demands.filter((demand) => demand.status === "open");
  const activeContracts = contracts;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#512601]">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Demands</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-[#a24c02]">
            {activeDemands.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Contracts</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-[#a24c02]">
            {activeContracts.length}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demands" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="demands" className="flex-1">
            Crop Demands
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex-1">
            Contracts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="demands">
          <Card>
            <CardHeader>
              <CardTitle>Recent Crop Demands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop Type</TableHead>
                    <TableHead>Quantity (Kg)</TableHead>
                    <TableHead>Active Bids</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demands.slice(0, 5).map((demand) => (
                    <TableRow key={demand._id}>
                      <TableCell>{demand.cropType}</TableCell>
                      <TableCell>{demand.quantity}</TableCell>
                      <TableCell>{demand.bids?.length || 0}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            demand.status === "open"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {demand.status.toString().at(0)?.toUpperCase() +
                            demand.status
                              .toString()
                              .slice(1, demand.status.toString().length)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/company/crop-demands/${demand._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Time Left</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.slice(0, 5).map((contract) => (
                    <TableRow key={contract._id}>
                      <TableCell>{contract.farmerId.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            contract.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {contract.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {timeLeft(new Date(contract.deliveryDate))}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/company/contracts/${contract._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Crop Demand Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#a24c02" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
