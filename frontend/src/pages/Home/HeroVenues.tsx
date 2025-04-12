import useFetchPage from "../../hooks/useFetchPage.ts";
import {Venue} from "../../models/Venue.ts";

export default function HeroVenues() {
    const {page, loading, error} = useFetchPage<Venue>('/venue', 0, 5);

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

    return (
        <div className='w-full h-40 py-12 flex justify-center px-[100px]'>
            {page.content.map((venue, index, venues) => {
                const isLastElement = index === venues.length - 1;
                return (<div key={venue.id} className={`h-16 border border-atlantpale rounded-lg flex justify-center items-center p-4 text-atlantash text-2xl font-bold ${isLastElement ? '' : 'mr-10'}`}>{venue.name}</div>)
            })}
        </div>
    )
}