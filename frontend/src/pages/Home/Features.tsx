import { Handshake, Sprout, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: <Handshake className="h-12 w-12" />,
    title: "Secure Contracts",
    description:
      "Legally binding smart contracts ensure fair deals between farmers and companies.",
  },
  {
    icon: <Sprout className="h-12 w-12" />,
    title: "Quality Assurance",
    description:
      "Standardized quality metrics and verification processes for all produce.",
  },
  {
    icon: <BarChart3 className="h-12 w-12" />,
    title: "Market Insights",
    description:
      "Real-time market data and pricing trends to make informed decisions.",
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: "Risk Management",
    description:
      "Built-in insurance and risk management tools for both parties.",
  },
];

export function Features() {
  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#512601] mb-4">
            Why Choose TerraPact?
          </h2>
          <p className="text-lg text-[#a24c02]">
            We provide the tools and security you need for successful contract
            farming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-[#fec89a]/10 hover:bg-[#fec89a]/20 transition-colors"
            >
              <div className="text-[#a24c02] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#512601] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#a24c02]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
