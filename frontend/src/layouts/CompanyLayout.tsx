import { AnimatePresence, motion } from "framer-motion";
import GlobalFooter from "@/pages/Home/Footer";
import CompanyHeader from "../components/Company/CompanyHeader";

type LayoutProps = {
  children: React.ReactNode;
};

function CompanyLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#fae1dd]">
      <CompanyHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key="page-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow container mx-auto py-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <GlobalFooter />
    </div>
  );
}

export default CompanyLayout;
