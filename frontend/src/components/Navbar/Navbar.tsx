import logo from "../../assets/images/Logo.png";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full h-[80px] border-b border-atlantlightgray bg-atlantdarkgray flex items-center justify-between text-white">
            <img className="min-w-[129px] h-[32px] w-[129px] ml-[92px]" src={logo} alt="logo" />
            <div className="flex h-[24]">
                <Link to="/" className="no-underline mr-[24px] hover:text-atlantdarkred">Currently Showing</Link>
                <Link to="/" className="no-underline mr-[24px] hover:text-atlantdarkred">Upcoming Movies</Link>
                <Link to="/" className="no-underline mr-[24px] hover:text-atlantdarkred">Venues</Link>
            </div>
            <button className="mr-[92px] h-[48px] min-w-[89px] w-[89px] bg-transparent border rounded-lg hover:text-atlantdarkred cursor-pointer font-semibold">Sign In</button>
        </div>
    )
}