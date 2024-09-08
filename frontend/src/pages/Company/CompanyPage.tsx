import React from "react";

import CompanyHero from "../../components/Company/CompanyHero";
import MissionStatement from "../../components/Company/MissionStatement";
import CompanyHeader from "../../components/Company/CompanyHeader";
import CompanyFooter from "../../components/Company/CompanyFooter";
import ServicesShowcase from "../../components/Company/ServicesShowCase";

const CompanyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CompanyHeader />
      <main className="flex-grow">
        <CompanyHero />
        <ServicesShowcase />
        <MissionStatement />
      </main>
      <CompanyFooter />
    </div>
  );
};

export default CompanyPage;
