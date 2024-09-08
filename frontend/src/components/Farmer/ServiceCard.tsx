import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className={`p-6 bg-${color}-100`}>
        <div
          className={`inline-flex items-center justify-center p-3 bg-${color}-500 rounded-full shadow-lg`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-semibold text-${color}-600 mb-2`}>
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
        <a
          href="#"
          className={`mt-4 inline-block text-${color}-500 hover:text-${color}-600 font-medium`}
        >
          Learn more &rarr;
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
