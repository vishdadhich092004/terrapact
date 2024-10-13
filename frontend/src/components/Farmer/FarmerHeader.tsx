import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import SignOutButton from "../Buttons/SignOutButton";

const FarmerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isFarmer, isAuthenticated } = useAuthContext();

  return (
    <header className="border border-b-2 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-green-700 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Farmer's Dashboard
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {isAuthenticated && isFarmer && (
                <>
                  <Link
                    to="/farmers/crop-demands"
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    Marketplace
                  </Link>
                  <Link
                    to="/farmers/my-bids"
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    My Bids
                  </Link>
                  <Link
                    to="/farmers/contracts/my-contracts"
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    My Contracts
                  </Link>
                  <a
                    href="http://13.232.145.198:5000"
                    target="_blank"
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    Crop Recommendation
                  </a>
                  <a
                    href="http://3.111.53.110:8502/"
                    target="_blank"
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    Plant Disease Detection
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {isAuthenticated && isFarmer ? (
              <div className="flex items-center space-x-4">
                <UserCircle className="w-6 h-6 text-white" />
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link
                  to="/farmer/login"
                  className="inline-block bg-green-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Login
                </Link>
                <Link
                  to="/farmer/register"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-green-800 hover:bg-green-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden">
            <button
              type="button"
              className="bg-green-700 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && isFarmer ? (
              <>
                <Link
                  to="/farmers/crop-demands"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-700"
                >
                  Marketplace
                </Link>
                <Link
                  to="/farmers/my-bids"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-700"
                >
                  My Bids
                </Link>
                <Link
                  to="/farmers/contracts/my-contracts"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-700"
                >
                  My Contracts
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/farmer/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-700"
                >
                  Login
                </Link>
                <Link
                  to="/farmer/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default FarmerHeader;
