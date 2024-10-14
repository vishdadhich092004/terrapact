import { Facebook, Twitter, Instagram, Linkedin, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const GlobalFooter = () => {
  return (
    <footer
      className="bg-white border-t border-[#fae1dd]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-[#fec89a] mr-2" />
              <span className="text-xl font-bold text-[#512601]">
                TerraPact
              </span>
            </Link>
            <p className="text-[#512601] text-base">
              Connecting farmers and companies for sustainable agriculture.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#512601] hover:text-[#a24c02]">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-[#512601] hover:text-[#a24c02]">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-[#512601] hover:text-[#a24c02]">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-[#512601] hover:text-[#a24c02]">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#a24c02] tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "Smart Bidding",
                    "Crop Analytics",
                    "Market Insights",
                    "Equipment Network",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-[#512601] hover:text-[#a24c02]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#a24c02] tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Pricing", "Documentation", "Guides", "API Status"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-[#512601] hover:text-[#a24c02]"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#a24c02] tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {["About", "Blog", "Jobs", "Press"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-[#512601] hover:text-[#a24c02]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#a24c02] tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Privacy", "Terms"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-[#512601] hover:text-[#a24c02]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#fae1dd] pt-8">
          <p className="text-base text-[#512601] xl:text-center">
            &copy; 2024 TerraPact, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
