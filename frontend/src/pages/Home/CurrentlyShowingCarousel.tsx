import PaginatedCarousel from "components/common/PaginatedCarousel/PaginatedCarousel";
import useFetchPage from "hooks/useFetchPage";
import { Movie } from "models/Movie";
import { getCurrentMoviesRequest } from "services/fetching/API";
import MovieCards from "pages/Home/MovieCards";
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
      <div className="flex p-96 justify-center items-center text-2xl text-cinebhdarkred">
        Error while loading content
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex p-96 justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full mb-10">
      <PaginatedCarousel
        title="Currently Showing"
        nextPage={nextPage}
        prevPage={previousPage}
        page={page}
      >
        <MovieCards page={page} />
      </PaginatedCarousel>
    </div>
  );
}
