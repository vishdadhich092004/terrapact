import CompanyFooter from "../components/Company/CompanyFooter";
import CompanyHeader from "../components/Company/CompanyHeader";

type LayoutProps = {
  children: React.ReactNode;
};
function CompanyLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <CompanyHeader />
      <main className="flex-grow container mx-auto py-10">{children}</main>
      <CompanyFooter />
    </div>
  );
}

export default CompanyLayout;
