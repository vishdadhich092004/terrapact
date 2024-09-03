import { Link } from "react-router-dom";

function FarmerFooter() {
  return (
    <footer className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-lg">
            Farmer's Dashboard
          </Link>
          <p className="mt-2">
            &copy; 2024 Farmer's Platform. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default FarmerFooter;
