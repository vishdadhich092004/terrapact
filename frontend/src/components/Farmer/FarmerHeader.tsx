import React, { useState } from "react";
import { Menu, X, UserCircle, Leaf } from "lucide-react";
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

const FarmerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isFarmer, isAuthenticated } = useAuthContext();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-[#fec89a] mr-2" />
              <span className="text-xl font-bold text-[#512601] hidden sm:inline">
                TerraPact <span className="text-xs ">Farmer-Side</span>
              </span>
              <span className="text-xl font-bold text-[#512601] sm:hidden">
                TerraPact
              </span>
            </Link>
            <div className="hidden md:flex ml-10 items-center space-x-4">
              {isAuthenticated && isFarmer && (
                <>
                  <NavLink to="/farmers/crop-demands">Marketplace</NavLink>
                  <NavLink to="/farmers/my-bids">My Bids</NavLink>
                  <NavLink to="/farmers/contracts/my-contracts">
                    My Contracts
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated && isFarmer ? (
              <div className="flex items-center space-x-4">
                <UserCircle className="h-8 w-8 text-[#fec89a]" />
                <SignOutButton />
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/farmer/login"
                  className="bg-[#fec89a] text-[#512601] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#ffd7ba]"
                >
                  Login
                </Link>
                <Link
                  to="/farmer/register"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && isFarmer ? (
              <>
                <NavLink to="/farmers/crop-demands">Marketplace</NavLink>
                <NavLink to="/farmers/my-bids">My Bids</NavLink>
                <NavLink to="/farmers/contracts/my-contracts">
                  My Contracts
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/farmer/login">Login</NavLink>
                <NavLink to="/farmer/register">Register</NavLink>
              </>
            )}
          </div>
          {isAuthenticated && isFarmer && (
            <div className="pt-4 pb-3 border-t border-[#fae1dd]">
              <div className="flex items-center px-5">
                <UserCircle className="h-8 w-8 text-[#fec89a] mr-3" />
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default FarmerHeader;
