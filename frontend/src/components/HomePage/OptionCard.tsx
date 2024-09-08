import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BuildingOffice2Icon,
  TruckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface OptionCardProps {
  title: string;
  description: string;
  link: string;
  icon: "tractor" | "office-building";
  gradient: string;
  features?: string[];
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  link,
  icon,
  gradient,
  features = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icon === "tractor" ? TruckIcon : BuildingOffice2Icon;

  return (
    <div
      className={`${gradient} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div
              className={`absolute inset-0 bg-white opacity-20 rounded-full transition-all duration-300 ${
                isHovered ? "scale-150" : "scale-100"
              }`}
            ></div>
            <Icon className="h-20 w-20 text-white relative z-10 transition-all duration-300 transform" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-lg mb-6 text-white opacity-90">{description}</p>
        {features.length > 0 && (
          <ul className="mb-6 text-white">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 mr-2 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={link}
          className="inline-flex w-full items-center justify-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 group"
        >
          <span className="mr-2">Get Started</span>
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div
        className={`h-2 bg-white transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default OptionCard;
