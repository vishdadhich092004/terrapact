import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#512601] py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-[#fec89a]" />
            <span className="text-[#fec89a] text-2xl font-bold">TerraPact</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-[#fec89a] hover:text-white transition-colors"
            >
              Home
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#fec89a]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a
              href="#"
              className="block text-[#fec89a] hover:text-white transition-colors"
            >
              Home
            </a>

            <a
              href="#"
              className="block text-[#fec89a] hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#"
              className="block text-[#fec89a] hover:text-white transition-colors"
            >
              Contact
            </a>
            <Button
              variant="outline"
              className="w-full bg-transparent text-[#fec89a] border-[#fec89a] hover:bg-[#fec89a] hover:text-[#512601]"
            >
              Sign In
            </Button>
            <Button className="w-full bg-[#a24c02] text-white hover:bg-[#fec89a] hover:text-[#512601]">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
