export interface ButtonPrimaryProps {
    text: string;
    onClick?: () => void;
}

export default function ButtonPrimary({ text, onClick }: ButtonPrimaryProps) {
    return (
        <button className='w-28 h-12 rounded-lg bg-atlantdarkred text-atlantneutral cursor-pointer hover:bg-[#B44444] flex justify-center items-center' onClick={onClick}>{text}</button>
    )
}