import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import SignOutButton from "../Buttons/SignOutButton";
import { UserCircle } from "lucide-react";

function FarmerHeader() {
  const { isFarmer, isAuthenticated } = useAuthContext();

  return (
    <header className="bg-green-500 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          Farmer's Dashboard
        </Link>
      </div>

      <nav className="flex items-center space-x-6">
        {isAuthenticated && isFarmer && (
          <>
            <Link to="/farmers/crop-demands" className="hover:underline">
              Marketplace
            </Link>
            <Link to="/farmers/my-bids" className="hover:underline">
              My Bids
            </Link>
            <Link
              to="/farmers/contracts/my-contracts"
              className="hover:underline"
            >
              My Contracts
            </Link>
          </>
        )}

        {isFarmer ? (
          <div className="flex items-center space-x-4">
            <UserCircle className="w-6 h-6" />
            <SignOutButton />
          </div>
        ) : (
          <>
            <Link to="/farmer/login" className="hover:underline">
              Login
            </Link>
            <Link to="/farmer/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default FarmerHeader;
