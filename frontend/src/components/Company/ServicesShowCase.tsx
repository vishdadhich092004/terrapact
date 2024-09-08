import React from "react";
import { ClipboardList, BarChart, PieChart, Truck } from "lucide-react";

const services = [
  {
    title: "Contract Bidding",
    description:
      "Access and bid on high-value crop contracts from top companies.",
    icon: ClipboardList,
    color: "blue",
  },
  {
    title: "Crop Management",
    description: "Advanced tools to optimize your crop yield and quality.",
    icon: BarChart,
    color: "blue",
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
    color: "blue",
  },
];

const ServicesShowcase: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Empowering Farmers with Innovative Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Discover how Farmify's comprehensive suite of services can transform
            your farming business.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {services.map((service) => (
              <div key={service.title} className="relative">
                <dt>
                  <div
                    className={`absolute flex items-center justify-center h-12 w-12 rounded-md bg-${service.color}-500 text-white`}
                  >
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {service.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ServicesShowcase;
