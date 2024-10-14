import GlobalFooter from "@/pages/Home/Footer";
import FarmerHeader from "../components/Farmer/FarmerHeader";

type LayoutProps = {
  children: React.ReactNode;
};
function FarmerLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#fae1dd]">
      <FarmerHeader />
      <main className="flex-grow container mx-auto py-10">{children}</main>
      <GlobalFooter />
    </div>
  );
}

export default FarmerLayout;
