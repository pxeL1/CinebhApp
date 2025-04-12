import {ReactNode} from "react";

export interface MediaCardProps {
    imageUrl: string;
    title: string;
    description: ReactNode;
    isLastElement: boolean;
}

export default function MediaCard({ imageUrl, title, description, isLastElement }: MediaCardProps) {
    return (
        <div className={`h-[395px] w-[302px] rounded-3xl shadow-md shadow-atlantshadow border border-atlantpale p-4 ${isLastElement ? '' : 'mr-4'}`}>
            <img src={imageUrl} alt='img' className='w-[270px] h-72 rounded-2xl'/>
            <div className='text-atlantdarkgray font-bold text-xl mt-4 mb-2'>{title}</div>
            {description}
        </div>
    )
}