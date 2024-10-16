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
import { CropDemandType } from "../../../../backend/src/shared/company/types";
import { ContractType } from "../../../../backend/src/shared/types";
import { Link } from "react-router-dom";
import { timeLeft } from "@/utils.ts/timeCalc";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const [demands, setDemands] = useState<CropDemandType[]>([]);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [demandsData, contractsData] = await Promise.all([
          getCompanyDemands(),
          getCompanyContracts(),
        ]);
        setDemands(demandsData);
        setContracts(contractsData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center item-center">
        <Loader />
      </div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  const demandChartData = demands.map((demand) => ({
    name: demand.cropType,
    quantity: demand.quantity,
  }));

  console.log(contracts);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Demands</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {demands.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Contracts</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {contracts.length}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demands" className="mb-6">
        <TabsList>
          <TabsTrigger value="demands">Crop Demands</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>
        <TabsContent value="demands">
          <Card>
            <CardHeader>
              <CardTitle>Crop Demands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Demand Id</TableHead>
                    <TableHead>Crop Name</TableHead>
                    <TableHead>Active Bids</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>More Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demands.map((demand) => (
                    <TableRow key={demand._id}>
                      <TableCell>{demand._id}</TableCell>
                      <TableCell>{demand.cropType}</TableCell>
                      <TableCell>{demand.bids.length}</TableCell>
                      <TableCell>{demand.status}</TableCell>
                      <TableCell>
                        <Link
                          to={`/company/crop-demands/${demand._id}`}
                          className="text-blue-500"
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
              <CardTitle>Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Delivery Time Left</TableHead>
                    <TableHead>More Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract._id}>
                      <TableCell>{contract._id}</TableCell>
                      <TableCell>{contract.status}</TableCell>
                      <TableCell>{contract.farmerId.name}</TableCell>
                      <TableCell>
                        {timeLeft(new Date(contract.deliveryDate))}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/company/contracts/${contract._id}`}
                          className="text-blue-500"
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
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
