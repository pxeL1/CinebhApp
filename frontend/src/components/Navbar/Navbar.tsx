import logo from "assets/images/Logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full py-6 border-b border-cinebhlightgray bg-cinebhdarkgray flex items-center text-white">
      <Link to="/">
        <img className="h-8 w-32 ml-24 mr-96" src={logo} alt="logo" />
      </Link>
      <div className="flex h-6">
        <Link
          to="/currently"
          className="no-underline mr-6 hover:text-cinebhdarkred"
        >
          Currently Showing
        </Link>
        <Link
          to="/upcoming"
          className="no-underline mr-6 hover:text-cinebhdarkred"
        >
          Upcoming Movies
        </Link>
        <Link to="/" className="no-underline mr-6 hover:text-cinebhdarkred">
          Venues
        </Link>
      </div>
      <button className="mr-24 px-5 py-3 bg-transparent border rounded-lg text-cinebhneutral hover:text-cinebhdarkred cursor-pointer font-semibold hidden">
        Sign In
      </button>
    </div>
  );
}
