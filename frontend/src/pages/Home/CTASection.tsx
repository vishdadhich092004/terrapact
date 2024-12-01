import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
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
    <div className="bg-[#512601] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#fec89a] mb-6">
          Ready to Transform Your Farming Business?
        </h2>
        <p className="text-lg text-[#fec89a]/80 mb-8 max-w-2xl mx-auto">
          Join thousands of farmers and companies already benefiting from our
          platform. Start your journey towards more profitable and sustainable
          farming today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleFarmer}
            className="bg-[#a24c02] text-white hover:bg-[#fec89a] hover:text-[#512601] text-lg px-8 py-6"
          >
            Join as Farmer <ArrowRight className="ml-2" />
          </Button>
          <Button
            onClick={handleCompany}
            variant="outline"
            className="bg-transparent text-[#fec89a] border-[#fec89a] hover:bg-[#fec89a] hover:text-[#512601] text-lg px-8 py-6"
          >
            Join as Company
          </Button>
        </div>
      </div>
    </div>
  );
}
