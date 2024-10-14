import GlobalFooter from "@/pages/Home/Footer";
import CompanyHeader from "../components/Company/CompanyHeader";

type LayoutProps = {
  children: React.ReactNode;
};
function CompanyLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#fae1dd]">
      <CompanyHeader />
      <main className="flex-grow container mx-auto py-10">{children}</main>
      <GlobalFooter />
    </div>
  );
}

export default CompanyLayout;
