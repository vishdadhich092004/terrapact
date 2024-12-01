import { CircleDot } from "lucide-react";

const steps = [
  {
    title: "Register & Verify",
    description:
      "Create your account as a farmer or company and complete the verification process.",
  },
  {
    title: "Browse Opportunities",
    description:
      "Companies list their requirements, farmers explore and find matching opportunities.",
  },
  {
    title: "Place Bids",
    description:
      "Farmers can bid on contracts that match their capabilities and interests.",
  },
  {
    title: "Secure Contracts",
    description:
      "Once both parties agree, smart contracts are automatically generated.",
  },
];

export function HowItWorks() {
  return (
    <div className="bg-[#FFF9F5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#512601] mb-4">
            How TerraPact Works
          </h2>
          <p className="text-lg text-[#a24c02] max-w-2xl mx-auto">
            Our simple four-step process makes contract farming accessible to
            everyone
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-[#fec89a]" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#fec89a] flex items-center justify-center mb-4">
                  <CircleDot className="w-8 h-8 text-[#512601]" />
                </div>
                <h3 className="text-xl font-semibold text-[#512601] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#a24c02]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
