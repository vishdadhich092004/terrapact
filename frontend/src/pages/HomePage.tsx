import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Farmer Section */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center min-h-[50vh] md:min-h-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1527847263472-aa5338d178b8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="bg-black bg-opacity-30 p-8 rounded-lg text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4 text-shadow">
            Are you a Farmer?
          </h2>
          <p className="text-lg text-white mb-6 text-shadow">
            Login or Signup to get started
          </p>
          <div className="space-x-4">
            <Link
              to="/farmer/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/farmer/register"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Company/Org Section */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center min-h-[50vh] md:min-h-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="bg-black bg-opacity-30 p-8 rounded-lg text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4 text-shadow">
            Are you a Company/Org?
          </h2>
          <p className="text-lg text-white mb-6 text-shadow">
            Login or Signup to get started
          </p>
          <div className="space-x-4">
            <Link
              to="/company/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/company/register"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
