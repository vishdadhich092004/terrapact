import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { MenuIcon } from "@heroicons/react/outline";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-2xl font-extrabold bg-clip-text text-transparent bg-white">
                TerraPact
              </span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-green-700 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {/* <MenuIcon className="h-6 w-6" aria-hidden="true" /> */}
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-medium text-white hover:text-green-200 transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-green-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/api/placeholder/40/40"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-green-200">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600"
            >
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600"
            >
              Settings
            </Link>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
