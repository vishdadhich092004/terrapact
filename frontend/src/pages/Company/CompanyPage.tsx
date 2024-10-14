import React, { useState } from "react";
import {
  FaUserPlus,
  FaFileContract,
  FaHandshake,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const companySteps: Step[] = [
  {
    icon: <FaUserPlus className="text-blue-600 text-5xl mb-4" />,
    title: "Step 1: Register",
    description:
      "Sign up, create your company profile, and start connecting with farmers for reliable crop supplies.",
  },
  {
    icon: <FaFileContract className="text-green-600 text-5xl mb-4" />,
    title: "Step 2: Browse Listings",
    description:
      "Explore crop listings and filter based on type, location, and availability to find what you need.",
  },
  {
    icon: <FaHandshake className="text-yellow-600 text-5xl mb-4" />,
    title: "Step 3: Negotiate & Agree",
    description:
      "Communicate directly with farmers, negotiate terms, and digitally sign contracts securely.",
  },
  {
    icon: <FaMoneyBillWave className="text-indigo-600 text-5xl mb-4" />,
    title: "Step 4: Pay & Receive Crops",
    description:
      "Make payments securely via our platform and receive crops as per the agreed schedule.",
  },
];

interface StepTrackerProps {
  currentStep: number;
  totalSteps: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-6">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 w-8 rounded-full ${
            index < currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface StepNavigatorProps {
  steps: Step[];
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <StepTracker currentStep={currentStep + 1} totalSteps={steps.length} />

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
        {steps[currentStep].icon}
        <h3 className="text-2xl font-semibold text-gray-800">
          {steps[currentStep].title}
        </h3>
        <p className="mt-4 text-gray-600">{steps[currentStep].description}</p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-2 bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-md"
            disabled={currentStep === 0}
          >
            <AiOutlineArrowLeft /> <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            disabled={currentStep === steps.length - 1}
          >
            <span>Next</span> <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const CompanyLandingPage: React.FC = () => (
  <StepNavigator steps={companySteps} />
);
export default CompanyLandingPage;
