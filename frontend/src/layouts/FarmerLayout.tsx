import FarmerFooter from "../components/Farmer/FarmerFooter";
import FarmerHeader from "../components/Farmer/FarmerHeader";

type LayoutProps = {
  children: React.ReactNode;
};
function FarmerLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <FarmerHeader />
      <main className="flex-grow container mx-auto py-10">{children}</main>
      <FarmerFooter />
    </div>
  );
}

export default FarmerLayout;
