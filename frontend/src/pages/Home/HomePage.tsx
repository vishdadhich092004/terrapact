import GlobalFooter from "./GlobalFooter";
import { HowItWorks } from "./HowItWorks";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { CTASection } from "./CTASection";
import { GlobalHeader } from "./GlobalHeader";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fae1dd]">
      {/* Header */}
      <GlobalHeader />

      {/* Hero Section */}
      <Hero />
      <Features />
      <HowItWorks />
      {/* Footer */}
      <CTASection />
      <GlobalFooter />
    </div>
  );
};

export default HomePage;
