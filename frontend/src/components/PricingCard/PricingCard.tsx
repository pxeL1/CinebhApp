import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export interface PricingProps {
    type: string;
    price: string;
    list: string[];
}

export default function PricingCard({type, price, list}: PricingProps) {
    return (
        <div className='flex flex-col h-[564px] w-[408px] border border-atlantpale rounded-xl ml-4 pt-[32px] hover:h-[644px] hover:pt-[72px] hover:border-atlantash transition-all duration-300 group'>
            <div className='flex justify-center text-xl font-bold mb-[24px]'>{type}</div>
            <div className='flex justify-center text-[32px] font-bold mb-[24px] group-hover:text-atlantdarkred'>{price}</div>
            <div className='flex justify-center mb-[32px]'>*per ticket</div>
            {list.map((item) => <div className='ml-[24px] mb-[24px]'><span className='text-atlantdarkred mr-4'><FontAwesomeIcon icon={faCheck} /></span>{item}</div>)}
            <div className='flex justify-center'><button className='w-[149px] h-[48px] border text-atlantdarkred rounded-lg cursor-pointer mt-[34px] hover:bg-atlantdarkred hover:text-white'>Explore movies</button></div>
        </div>
    )
}