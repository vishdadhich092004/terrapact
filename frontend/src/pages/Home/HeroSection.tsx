import { Button } from "@/components/ui/button";
import hero from "../../images/hero.jpg";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated, isFarmer, isCompany } = useAuthContext();
  const navigate = useNavigate();
  const farmerLink =
    isAuthenticated && isFarmer ? "/farmer/user/dashboard" : "/farmer/login";

  const handleFarmer = () => {
    navigate(farmerLink);
  };
  const companyLink =
    isAuthenticated && isCompany ? "/company/user/dashboard" : "/company/login";
  const handleCompaany = () => {
    navigate(companyLink);
  };
  return (
    <div className="container mx-auto mt-16 pl-4 pr-3">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0 animate-fadeIn">
          <h2 className="text-4xl md:text-6xl font-bold text-[#512601] mb-6 leading-tight">
            Revolutionizing <br />
            <span className="text-[#a24c02]">Contract Farming</span>
          </h2>
          <p className="text-xl text-[#775d3f] mb-8">
            Connect, collaborate, and grow with TerraPact's innovative platform.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleFarmer}
              className="bg-[#fec89a] text-[#512601] hover:bg-[#ffd7ba] text-xl p-6"
            >
              For Farmers
            </Button>
            <Button
              onClick={handleCompaany}
              variant="outline"
              className="border-[#512601] text-[#512601] hover:bg-[#fec89a] text-xl p-6"
            >
              For Companies
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 overflow-hidden animate-grow mr-2">
          <img
            src={hero}
            alt="Farm landscape"
            className="rounded-lg shadow-2xl object-cover w-full h-[400px] "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
