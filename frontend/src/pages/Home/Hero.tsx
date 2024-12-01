import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export function Hero() {
  const { isAuthenticated, isFarmer, isCompany } = useAuthContext();
  const navigate = useNavigate();
  const farmerLink =
    isAuthenticated && isFarmer ? "/farmer/user/dashboard" : "/farmer/login";

  const handleFarmer = () => {
    navigate(farmerLink);
  };
  const companyLink =
    isAuthenticated && isCompany ? "/company/user/dashboard" : "/company/login";
  const handleCompany = () => {
    navigate(companyLink);
  };
  return (
    <div className="relative bg-[#512601] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-[#fec89a]">
              Connecting Farmers with Companies
            </h1>
            <p className="text-lg text-[#fec89a]/80">
              TerraPact revolutionizes contract farming by creating direct
              connections between farmers and companies. List your crop demands
              or bid on contracts - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleFarmer}
                className="bg-[#a24c02] text-white hover:bg-[#fec89a] hover:text-[#512601] text-lg px-8 py-6"
              >
                For Farmers <ArrowRight className="ml-2" />
              </Button>
              <Button
                onClick={handleCompany}
                variant="outline"
                className="bg-transparent text-[#fec89a] border-[#fec89a] hover:bg-[#fec89a] hover:text-[#512601] text-lg px-8 py-6"
              >
                For Companies
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden animate-grow ">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
              alt="Farming"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
