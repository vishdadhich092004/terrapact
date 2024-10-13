import { Link } from "react-router-dom";
import handshake from "../images/handshake.png";
const Home = () => {
  return (
    <div className="relative flex h-screen">
      <div className="flex-1 relative">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className=" absolute inset-0 flex justify-center items-center z-20">
          <h1 className="text-black font-bold">Companty Side</h1>
          <Link to="company/login" className="bg-yellow-300 p-3 ">
            Sign in
          </Link>
        </div>
      </div>
      <h1 className="absolute inset-0 flex justify-center items-center text-black font-bold text-8xl z-10">
        Hello
      </h1>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <img
          className="w-32 h-32 object-contain bg-transparent"
          src={handshake}
          alt="Handshake"
        />
      </div>
      <div className="flex-1 relative">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className=" absolute inset-0 flex justify-center items-center z-20">
          <h1 className="text-black font-bold">Farmer Side</h1>
          <Link to="farmer/login" className="bg-yellow-300 p-3 ">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
