import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      ></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
          Empowering Farmers, Elevating Businesses
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fadeIn opacity-90 max-w-2xl mx-auto">
          The platform where demand meets supply for maximum profitability.
        </p>
        <a
          href="#learn-more"
          className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300 animate-fadeIn shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
