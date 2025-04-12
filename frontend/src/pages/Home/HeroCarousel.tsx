import useFetchPage from "../../hooks/useFetchPage.ts";
import {Movie} from "../../models/Movie.ts";
import {useState} from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary.tsx";
import CarouselControl from "../../components/CarouselControl/CarouselControl.tsx";

export default function HeroCarousel() {
    const {page, loading, error} = useFetchPage<Movie>("/movie/current", 0, 3);
    const [index, setIndex] = useState(0);

    if(error) {
        return (
            <div className='h-[620px] flex justify-center items-center text-2xl text-atlantdarkred'>Error while loading content</div>
        )
    }

    if(loading) {
        return (
            <div className='h-[620px] flex justify-center items-center text-2xl'>Loading...</div>
        )
    }

    function changeIndex(newIndex: number) {
        setIndex(newIndex);
    }

    return (
        <div className='h-[810px] flex flex-col justify-end'>
            <img src={page.content.at(index)?.images[0].url ?? ''} alt="No image" className='h-[810px] w-full absolute pointer-events-none -z-[1] object-cover' />
            <div className='w-xl ml-24 flex flex-col mb-10'>
                <div className='w-20 h-8 rounded-lg bg-atlantpale text-black flex items-center justify-center mb-4'>
                    {page.content.at(index)?.genres[0].genre.name ?? ''}
                </div>
                <div className='text-5xl font-bold text-atlantneutral mb-4'>
                    {page.content.at(index)?.name ?? ''}
                </div>
                <div className='text-xl font-bold text-atlantneutral mb-8'>
                    {page.content.at(index)?.synopsis ?? ''}
                </div>
                <ButtonPrimary onClick={() => {}} text='Buy Ticket'></ButtonPrimary>
            </div>
            <div className='w-full flex justify-center items-center p-8'>
                <div className='flex justify-between w-36'>
                    <CarouselControl isActive={index === 0} onClick={() => changeIndex(0)}/>
                    <CarouselControl isActive={index === 1} onClick={() => changeIndex(1)}/>
                    <CarouselControl isActive={index === 2} onClick={() => changeIndex(2)}/>
                </div>
            </div>
        </div>
    )
}