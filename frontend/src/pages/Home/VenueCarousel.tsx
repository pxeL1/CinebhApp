import {useState} from "react";
import useFetchPage from "../../hooks/useFetchPage.ts";
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel.tsx";
import MediaCard from "../../components/MediaCard/MediaCard.tsx";
import {Venue} from "../../models/Venue.ts";

export default function VenueCarousel() {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/cinebhapp-storage.firebasestorage.app/o/noimage.jpg?alt=media&token=04894a36-251b-4a09-ba23-3ea1cda92119";
    const [pageNumber, setPageNumber] = useState(0);
    const { page, loading, error } = useFetchPage<Venue>("/venue", pageNumber, 4);

    function nextPage() {
        setPageNumber(pageNumber + 1);
    }

    function prevPage() {
        setPageNumber(pageNumber - 1);
    }

    if(error) {
        return (
            <div className='h-[620px] flex justify-center items-center text-2xl text-atlantdarkred'>Error while loading page</div>
        )
    }

    if(loading) {
        return (
            <div className='h-[620px] flex justify-center items-center text-2xl'>Loading...</div>
        )
    }

    return (
        <MediaCarousel title='Venues' nextPage={nextPage} prevPage={prevPage} range={((page.number + 1) + (page.number * page.size - page.number)) + " - " + ((page.number + 1) + (page.number * page.size - page.number) + (page.numberOfElements - 1))} totalElements={page.totalElements} nextActive={!page.last} prevActive={!page.first}>
            {page.content.map((venue, index, venues) => {
                const coverImage = venue.image;
                const coverImageUrl: string = coverImage?.url ?? defaultImage;
                const isLastElement = index === venues.length - 1

                return (
                    <MediaCard key={venue.id} imageUrl={coverImageUrl} title={venue.name} description={<div className='text-atlantlightgray text-sm h-5 flex ml-1'>{venue.streetAddress}, {venue.city}</div>} isLastElement={isLastElement}/>
                )
            })}
        </MediaCarousel>
    )
}