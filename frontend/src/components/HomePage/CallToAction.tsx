import React from "react";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Ready to Get Started?
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-white opacity-90 max-w-3xl mx-auto">
          Join the platform that maximizes your income and connects you with the
          best opportunities in agriculture.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
