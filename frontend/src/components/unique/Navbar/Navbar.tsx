import logo from "assets/images/Logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full py-6 border-b border-atlantlightgray bg-atlantdarkgray flex items-center justify-between text-white">
      <Link to="/">
        <img className="h-8 w-32 ml-24" src={logo} alt="logo" />
      </Link>
      <div className="flex h-6 hidden">
        <Link to="/" className="no-underline mr-6 hover:text-atlantdarkred">
          Currently Showing
        </Link>
        <Link to="/" className="no-underline mr-6 hover:text-atlantdarkred">
          Upcoming Movies
        </Link>
        <Link to="/" className="no-underline mr-6 hover:text-atlantdarkred">
          Venues
        </Link>
      </div>
      <button className="mr-24 px-5 py-3 bg-transparent border rounded-lg text-atlantneutral hover:text-atlantdarkred cursor-pointer font-semibold hidden">
        Sign In
      </button>
    </div>
  );
}
