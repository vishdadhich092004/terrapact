import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2, Shield, Zap } from "lucide-react";
function FeaturesSection() {
  return (
    <section className="container mx-auto mt-32 px-4  mb-8">
      <h3 className="text-5xl font-semibold text-[#512601] mb-16 text-center">
        Key Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Shield className="w-12 h-12 mb-4 text-[#fec89a]" />
            <CardTitle className="text-[#512601] text-2xl">
              Secure Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[#775d3f] text-lg">
              Create and manage secure farming contracts with ease.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <BarChart2 className="w-12 h-12 mb-4 text-[#fec89a]" />
            <CardTitle className="text-[#512601] text-2xl">
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[#775d3f] text-lg">
              Access real-time market data and pricing trends.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Zap className="w-12 h-12 mb-4 text-[#fec89a]" />
            <CardTitle className="text-[#512601] text-2xl">
              Secure Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[#775d3f] text-lg">
              Enjoy secure and timely payments through our platform.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default FeaturesSection;
