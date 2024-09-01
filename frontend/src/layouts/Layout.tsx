import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
