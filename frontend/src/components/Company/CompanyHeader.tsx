import React, { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import SignOutButton from "../Buttons/SignOutButton";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-[#512601] hover:text-[#a24c02] px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

const CompanyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCompany, isAuthenticated, user } = useAuthContext();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-[#fec89a] mr-2" />
              <span className="text-xl font-bold text-[#512601] hidden sm:inline">
                TerraPact <span className="text-xs">Company-Side</span>
              </span>
              <span className="text-xl font-bold text-[#512601] sm:hidden">
                TerraPact
              </span>
            </Link>
            <div className="hidden md:flex ml-10 items-center space-x-4">
              {isAuthenticated && isCompany && (
                <>
                  <NavLink to="/company/my-demands">My Demands</NavLink>
                  <NavLink to="/crop-demands/new">Raise Demand</NavLink>
                  <NavLink to="/company/contracts/my-contracts">
                    My Contracts
                  </NavLink>
                  <NavLink to="/company/user/dashboard">My Dashboard</NavLink>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated && isCompany ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-[#512601] truncate max-w-[150px]">
                  {`Hello, ${user?.companyName}`}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/company/login"
                  className="bg-[#fec89a] text-[#512601] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#ffd7ba]"
                >
                  Login
                </Link>
                <Link
                  to="/company/register"
                  className="bg-[#512601] text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#a24c02]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#512601] hover:text-[#a24c02] hover:bg-[#fae1dd] focus:outline-none"
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
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {isAuthenticated && isCompany ? (
              <>
                <NavLink to="/company/my-demands">My Demands</NavLink>
                <NavLink to="/crop-demands/new">Raise Demand</NavLink>
                <NavLink to="/company/contracts/my-contracts">
                  My Contracts
                </NavLink>
                <NavLink to="/company/user/dashboard">My Dashboard</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/company/login">Login</NavLink>
                <NavLink to="/company/register">Register</NavLink>
              </>
            )}
          </div>
          {isAuthenticated && isCompany && (
            <div className="pt-4 pb-3 border-t border-[#fae1dd]">
              <div className="flex items-center px-5">
                <span className="text-sm font-medium text-[#512601] truncate max-w-[150px] mr-3">
                  {`Hello, ${user?.companyName}`}
                </span>
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default CompanyHeader;
