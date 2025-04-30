import PaginatedCarousel from "components/common/PaginatedCarousel/PaginatedCarousel";
import useFetchPage from "hooks/useFetchPage";
import { Movie } from "models/Movie";
import { getUpcomingMoviesRequest } from "services/fetching/API";
import usePagination from "hooks/usePagination";
import MovieCards from "pages/Home/MovieCards";

export default function UpcomingCarousel() {
  const { pageNumber, pageSize, nextPage, previousPage } = usePagination(4);
  const { page, loading, error } = useFetchPage<Movie>(
    getUpcomingMoviesRequest(),
    pageNumber,
    pageSize,
  );

  if (error) {
    return (
      <div className="p-96 flex justify-center items-center text-2xl text-cinebhdarkred">
        Error while loading page
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-96 flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full mb-10">
      <PaginatedCarousel
        title="Upcoming Movies"
        seeAllPath="/"
        nextPage={nextPage}
        prevPage={previousPage}
        page={page}
      >
        <MovieCards page={page} />
      </PaginatedCarousel>
    </div>
  );
}
