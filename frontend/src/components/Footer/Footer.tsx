import whiteLogo from "../../assets/images/Logo - white.png"
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div className="w-full min-w-[1440px] h-[212px] bg-gradient-to-r from-atlantcarbon to-atlantdarkred flex flex-col justify-center items-center text-white">
            <img className='min-w-[130px] w-[130px] h-[32px] mb-[16px]' src={whiteLogo}/>
            <div className='mb-[16px] h-[16px] flex'>
                <Link to="/about" className='text-xs font-semibold mr-[16px]'>ABOUT US</Link>
                <div className='w-[1px] h-[16px] border-l mr-[16px]'></div>
                <Link to="/pricing" className='text-xs font-semibold'>TICKETS</Link>
            </div>
            <div className='text-sm'>
                Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
            </div>
        </div>
    )
}