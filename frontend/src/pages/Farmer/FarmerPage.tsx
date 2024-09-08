import React from "react";
import { ChevronDown, Dumbbell, BarChart, PieChart, Truck } from "lucide-react";
import FarmerCTA from "../../components/Farmer/FarmerCta";
import FarmerHero from "../../components/Farmer/FarmerHero";
import FarmerTestimonials from "../../components/Farmer/FarmerTestimonials";
import ServiceCard from "../../components/Farmer/ServiceCard";
import FarmerHeader from "../../components/Farmer/FarmerHeader";
import FarmerFooter from "../../components/Farmer/FarmerFooter";

const FarmerPage: React.FC = () => {
  const services = [
    {
      title: "Contract Bidding",
      description:
        "Access and bid on high-value crop contracts from top companies.",
      icon: Dumbbell,
      color: "indigo",
    },
    {
      title: "Crop Management",
      description: "Advanced tools to optimize your crop yield and quality.",
      icon: BarChart,
      color: "green",
    },
    {
      title: "Market Insights",
      description:
        "Real-time market data and trends to inform your farming decisions.",
      icon: PieChart,
      color: "blue",
    },
    {
      title: "Equipment Rentals",
      description:
        "Rent state-of-the-art farming equipment at competitive prices.",
      icon: Truck,
      color: "yellow",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <FarmerHeader />
      <main className="flex-grow">
        <FarmerHero />
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
              Our Services for Farmers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
        <div className="text-center py-12">
          <ChevronDown className="h-12 w-12 mx-auto text-gray-400 animate-bounce" />
        </div>
        <FarmerTestimonials />
        <FarmerCTA />
      </main>
      <FarmerFooter />
    </div>
  );
};

export default FarmerPage;
