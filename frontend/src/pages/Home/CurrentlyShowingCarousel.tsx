import MediaCarousel from "components/common/MediaCarousel/MediaCarousel";
import useFetchPage from "hooks/useFetchPage";
import { Movie } from "models/Movie";
import { getCurrentMoviesRequest } from "services/fetching/API";
import getMovieCards from "pages/Home/getMovieCards";
import usePagination from "hooks/usePagination";

export default function CurrentlyShowingCarousel() {
  const { pageNumber, pageSize, nextPage, previousPage } = usePagination(4);
  const { page, loading, error } = useFetchPage<Movie>(
    getCurrentMoviesRequest(),
    pageNumber,
    pageSize,
  );

  if (error) {
    return (
      <div className="h-[620px] flex justify-center items-center text-2xl text-atlantdarkred">
        Error while loading content
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[620px] flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[1256px] mb-10">
      <MediaCarousel
        title="Currently Showing"
        nextPage={nextPage}
        prevPage={previousPage}
        page={page}
      >
        {getMovieCards(page)}
      </MediaCarousel>
    </div>
  );
}
