import React from "react";
import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import Hero from "../components/HomePage/Hero";
import OptionCard from "../components/HomePage/OptionCard";
import CallToAction from "../components/HomePage/CallToAction";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="py-16 bg-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Choose Your Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <OptionCard
                title="For Companies"
                description="Raise a demand for crops and find the best bids from experienced farmers."
                link="/company"
                icon="office-building"
                gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
              <OptionCard
                title="For Farmers"
                description="Bid on crop contracts, secure deals, and maximize your income."
                link="/farmer"
                icon="tractor"
                gradient="bg-gradient-to-br from-green-500 to-green-600"
              />
            </div>
          </div>
        </section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
