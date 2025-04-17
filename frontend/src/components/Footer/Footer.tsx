import whiteLogo from "assets/images/Logo - white.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="min-w-360 w-screen p-14 bg-gradient-to-r from-cinebhcarbon to-cinebhdarkred flex flex-col justify-center items-center text-white">
      <img className="w-32 h-8 mb-4" src={whiteLogo} />
      <div className="mb-4 h-4 flex tracking-wider">
        <Link to="/about" className="text-xs font-bold mr-4">
          ABOUT US
        </Link>
        <div className="w-[1px] h-4 border-l mr-4"></div>
        <Link to="/pricing" className="text-xs font-bold">
          TICKETS
        </Link>
      </div>
      <div className="text-sm">
        Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
      </div>
    </div>
  );
}
