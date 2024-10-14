import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import GlobalFooter from "./Footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fae1dd]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold text-[#512601] flex items-center">
            <Leaf className="mr-2 text-[#fec89a]" />
            TerraPact
          </h1>
          <nav className="space-x-2">
            <Button
              variant="ghost"
              className="text-[#512601] hover:text-[#a24c02]"
            >
              Login
            </Button>
            <Button className="bg-[#fec89a] text-[#512601] hover:bg-[#ffd7ba]">
              Sign Up
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
};

export default HomePage;
