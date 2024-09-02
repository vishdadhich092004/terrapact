import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import SignOutButton from "../Buttons/SignOutButton";

function CompanyHeader() {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          Company's Dashboard
        </Link>
      </div>

      <nav className="flex space-x-4">
        <Link to="/marketplace" className="hover:underline">
          Marketplace
        </Link>

        {/* Company-specific Links */}
        <Link to="/my-demands" className="hover:underline">
          My Demands
        </Link>
        <Link to="/crop-demands/new" className="hover:underline">
          Raise Demand
        </Link>

        {/* User Authentication Links */}
        {isAuthenticated ? (
          <>
            <span className="font-semibold">{`Hello, ${user?.companyName}`}</span>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link to="/company/login" className="hover:underline">
              Login
            </Link>
            <Link to="/company/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default CompanyHeader;
