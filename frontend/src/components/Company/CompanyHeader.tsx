import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import SignOutButton from "../Buttons/SignOutButton";

const CompanyHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCompany, user, isAuthenticated } = useAuthContext();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between border-b border-[#fae1dd] lg:border-none">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-[#512601] hover:text-[#a24c02] flex items-center"
            >
              <Leaf className="mr-2 text-[#fec89a]" />
              <span className="hidden sm:inline">TerraPact Company</span>
              <span className="sm:hidden">TerraPact</span>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:flex">
              {isAuthenticated && isCompany && (
                <>
                  <Link
                    to="/company/my-demands"
                    className="text-base font-medium text-[#512601] hover:text-[#a24c02]"
                  >
                    My Demands
                  </Link>
                  <Link
                    to="/crop-demands/new"
                    className="text-base font-medium text-[#512601] hover:text-[#a24c02]"
                  >
                    Raise Demand
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden lg:flex ml-10 items-center space-x-4">
            {isAuthenticated && isCompany ? (
              <>
                <span className="text-base font-medium text-[#512601] truncate max-w-[150px]">
                  {`Hello, ${user?.companyName}`}
                </span>
                <Link
                  to="/company/contracts/my-contracts"
                  className="text-base font-medium text-[#512601] hover:text-[#a24c02]"
                >
                  My Contracts
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  to="/company/login"
                  className="inline-block bg-[#fec89a] py-2 px-4 border border-transparent rounded-md text-base font-medium text-[#512601] hover:bg-[#ffd7ba]"
                >
                  Sign in
                </Link>
                <Link
                  to="/company/register"
                  className="inline-block bg-[#512601] py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-[#a24c02]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="bg-[#fec89a] rounded-md p-2 inline-flex items-center justify-center text-[#512601] hover:bg-[#ffd7ba] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#512601]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && isCompany && (
              <>
                <Link
                  to="/company/my-demands"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd]"
                >
                  My Demands
                </Link>
                <Link
                  to="/crop-demands/new"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd]"
                >
                  Raise Demand
                </Link>
                <Link
                  to="/company/contracts/my-contracts"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd]"
                >
                  My Contracts
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/company/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd]"
                >
                  Sign in
                </Link>
                <Link
                  to="/company/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd]"
                >
                  Sign up
                </Link>
              </>
            )}
            {isAuthenticated && isCompany && (
              <div className="px-3 py-2">
                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CompanyHeader;
