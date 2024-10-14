/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getAllCropDemandsForFarmer,
  allBidsForAFarmer,
  getFarmerContracts,
} from "../../farmer-api-clients";
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
import { BidType } from "../../../../backend/src/shared/farmer/types";
import { ContractType } from "../../../../backend/src/shared/types";

const FarmerDashboard = () => {
  const [cropDemands, setCropDemands] = useState<CropDemandType[]>([]);
  const [bids, setBids] = useState<BidType[]>([]);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [demandsData, bidsData, contractsData] = await Promise.all([
          getAllCropDemandsForFarmer(),
          allBidsForAFarmer(),
          getFarmerContracts(),
        ]);
        setCropDemands(demandsData);
        setBids(bidsData);
        setContracts(contractsData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  const bidChartData = bids.map((bid) => ({
    name: bid.demandId.cropType,
    amount: bid.bidAmount,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Crop Demands</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {cropDemands.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Bids</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {bids.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Contracts</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {
              contracts.filter((contract) => contract.status === "active")
                .length
            }
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cropDemands" className="mb-6">
        <TabsList>
          <TabsTrigger value="cropDemands">Crop Demands</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>
        <TabsContent value="cropDemands">
          <Card>
            <CardHeader>
              <CardTitle>Available Crop Demands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cropDemands.map((demand) => (
                    <TableRow key={demand._id}>
                      <TableCell>{demand.cropType}</TableCell>
                      <TableCell>{demand.quantity}</TableCell>
                      <TableCell>{demand.companyId.companyName}</TableCell>
                      <TableCell>{demand.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bids">
          <Card>
            <CardHeader>
              <CardTitle>My Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bid Id</TableHead>
                    <TableHead>Crop Demand</TableHead>
                    <TableHead>Bid Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid._id}>
                      <TableCell>{bid._id}</TableCell>
                      <TableCell>{bid.demandId.cropType}</TableCell>
                      <TableCell>{bid.bidAmount}</TableCell>
                      <TableCell>{bid.status}</TableCell>
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
                    <TableHead>Company</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract._id}>
                      <TableCell>{contract._id}</TableCell>
                      <TableCell>{contract.companyId.companyName}</TableCell>
                      <TableCell>{contract.cropDemandId.cropType}</TableCell>
                      <TableCell>{contract.status}</TableCell>
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
          <CardTitle>My Bids Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bidChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
