import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import SignOutButton from "../Buttons/SignOutButton";

function FarmerHeader() {
  const { user, isFarmer, isAuthenticated } = useAuthContext();

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          Farmer's Dashboard
        </Link>
      </div>

      <nav className="flex space-x-4">
        {isAuthenticated && isFarmer && (
          <>
            <Link to="/farmers/crop-demands" className="hover:underline">
              Marketplace
            </Link>

            <Link to="/farmers/my-bids" className="hover:underline">
              My Bids
            </Link>
          </>
        )}
        {/* <Link to="/new-crop" className="hover:underline">
          List a Crop
        </Link> */}

        {/* User Authentication Links */}
        {isFarmer ? (
          <>
            <span className="font-semibold">{`Hello, ${user?.name}`}</span>
            <Link
              to="/farmers/contracts/my-contracts"
              className="hover:underline"
            >
              My Contracts
            </Link>
            <SignOutButton />
          </>
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
