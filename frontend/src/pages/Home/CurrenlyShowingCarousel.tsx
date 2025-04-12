import MediaCard from "../../components/MediaCard/MediaCard.tsx";
import MediaCarousel from "../../components/MediaCarousel/MediaCarousel.tsx";
import {useState} from "react";
import useFetchPage from "../../hooks/useFetchPage.ts";
import {Movie} from "../../models/Movie.ts";

export default function CurrenlyShowingCarousel() {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/cinebhapp-storage.firebasestorage.app/o/noimage.jpg?alt=media&token=04894a36-251b-4a09-ba23-3ea1cda92119";
    const defaultGenre = "No Genre";
    const [pageNumber, setPageNumber] = useState(0);
    const { page, loading, error } = useFetchPage<Movie>("/movie/current", pageNumber, 4);

    function nextPage() {
        setPageNumber(pageNumber + 1);
    }

    function prevPage() {
        setPageNumber(pageNumber - 1);
    }

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
        <MediaCarousel title='Currently Showing' nextPage={nextPage} prevPage={prevPage} range={((page.number + 1) + (page.number * page.size - page.number)) + " - " + ((page.number + 1) + (page.number * page.size - page.number) + (page.numberOfElements - 1))} totalElements={page.totalElements} nextActive={!page.last} prevActive={!page.first}>
            {page.content.map((movie, index, movies) => {
                const coverImage = movie.images.find(image => image.coverPhoto);
                const coverImageUrl: string = coverImage?.url ?? defaultImage;
                const genre = movie.genres.at(0)?.genre.name ?? defaultGenre;
                const isLastElement = index === movies.length - 1;

                return (
                    <MediaCard key={movie.id} imageUrl={coverImageUrl} title={movie.name} description={<div className='text-atlantlightgray text-sm h-5 flex ml-1'>{movie.duration}<div className='w-0 border-l ml-4 mr-3'></div>{genre}</div>} isLastElement={isLastElement}/>
                )
            })}
        </MediaCarousel>
    )
}