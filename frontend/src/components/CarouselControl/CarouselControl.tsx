export interface CarouselControlProps {
    isActive: boolean;
    onClick?: () => void;
}

export default function CarouselControl({ isActive, onClick }: CarouselControlProps) {
    return (
        <button className={`w-8 h-1 rounded  cursor-pointer ${isActive ? 'bg-atlantneutral' : 'bg-atlantash'}`} onClick={onClick}></button>
    )
}