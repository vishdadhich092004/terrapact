import React from "react";
import { Target, Users, Leaf } from "lucide-react";

const MissionStatement: React.FC = () => {
  const missionPoints = [
    {
      title: "Technology-Driven Innovation",
      description:
        "We leverage cutting-edge technologies to solve complex agricultural challenges and boost productivity.",
      icon: Target,
    },
    {
      title: "Farmer Empowerment",
      description:
        "We provide farmers with tools, knowledge, and market access to thrive in the modern agricultural landscape.",
      icon: Users,
    },
    {
      title: "Sustainable Practices",
      description:
        "We champion eco-friendly farming methods to ensure long-term environmental and economic sustainability.",
      icon: Leaf,
    },
  ];

  return (
    <div className="bg-blue-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Our Mission
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Innovating for a Sustainable Agricultural Future
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            At Farmify, we're dedicated to transforming agriculture through
            technology, sustainability, and farmer empowerment.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {missionPoints.map((point, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <point.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    {point.title}
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {point.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
