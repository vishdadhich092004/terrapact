import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import SignOutButton from "../Buttons/SignOutButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCompany, user, isAuthenticated } = useAuthContext();

  return (
    <header className="bg-blue-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-blue-700 lg:border-none">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-blue-200"
            >
              Company's Dashboard
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {isAuthenticated && isCompany && (
                <>
                  <Link
                    to="/company/my-demands"
                    className="text-base font-medium text-white hover:text-blue-200"
                  >
                    My Demands
                  </Link>
                  <Link
                    to="/crop-demands/new"
                    className="text-base font-medium text-white hover:text-blue-200"
                  >
                    Raise Demand
                  </Link>
                </>
              )}
              <Link
                to=""
                className="text-base font-medium text-white hover:text-blue-200"
              >
                Services
              </Link>
              <Link
                to=""
                className="text-base font-medium text-white hover:text-blue-200"
              >
                About
              </Link>
              <Link
                to=""
                className="text-base font-medium text-white hover:text-blue-200"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {isAuthenticated && isCompany ? (
              <>
                <span className="text-base font-medium text-white">
                  {`Hello, ${user?.companyName}`}
                </span>
                <Link
                  to="/company/contracts/my-contracts"
                  className="text-base font-medium text-white hover:text-blue-200"
                >
                  My Contracts
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  to="/company/login"
                  className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Sign in
                </Link>
                <Link
                  to="/company/register"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-800 hover:bg-blue-50"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="bg-blue-700 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
                >
                  My Demands
                </Link>
                <Link
                  to="/crop-demands/new"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
                >
                  Raise Demand
                </Link>
                <Link
                  to="/company/contracts/my-contracts"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
                >
                  My Contracts
                </Link>
              </>
            )}
            <Link
              to=""
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
            >
              Services
            </Link>
            <Link
              to=""
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
            >
              About
            </Link>
            <Link
              to=""
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
