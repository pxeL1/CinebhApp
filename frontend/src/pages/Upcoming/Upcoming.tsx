import Footer from "components/Footer/Footer";
import { useEffect, useState } from "react";
import SearchBar from "components/common/SearchBar/SearchBar";
import UpcomingCitySelect from "pages/Upcoming/UpcomingCitySelect";
import UpcomingCinemaSelect from "pages/Upcoming/UpcomingCinemaSelect";
import UpcomingGenresSelect from "pages/Upcoming/UpcomingGenresSelect";
import UpcomingDateRangeSelect from "pages/Upcoming/UpcomingDateRangeSelect";
import { Movie } from "models/Movie";
import usePagination from "hooks/usePagination";
import fetchPage from "services/fetching/fetchPage";
import { getFilteredMoviesRequest } from "services/fetching/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpcomingMovieCards from "pages/Upcoming/UpcomingMovieCards";

const emptyState = (
  <div className="rounded-3xl border border-cinebhpale px-64 py-20 shadow-xs shadow-cinebhshadow w-full flex flex-col justify-center items-center">
    <FontAwesomeIcon
      icon={faFilm}
      className="min-w-16 min-h-16 mb-6 text-cinebhdarkgray"
    />
    <div className="font-semibold text-cinebhdarkgray mb-4">
      No movies to preview for current date
    </div>
    <div className="text-cinebhlightgray text-center mb-4">
      We are working on updating our schedule for upcoming movies. Stay tuned
      for amazing movie experience or explore our other exciting cinema features
      in the meantime!
    </div>
    <Link
      to="/currently"
      className="text-cinebhdarkred underline decoration-0 font-semibold"
    >
      Explore Currently Showing
    </Link>
  </div>
);

export default function Upcoming() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [cinema, setCinema] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const [moreContent, setMoreContent] = useState<boolean>(false);
  const { pageNumber, pageSize, nextPage, setPageNumber } = usePagination(12);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();
    newQueryParams.set("type", "upcoming");
    newQueryParams.set("search", search);
    newQueryParams.set("city", city);
    newQueryParams.set("venue", cinema);
    newQueryParams.set("genres", genres.toString());
    newQueryParams.set("startDate", startDate);
    newQueryParams.set("endDate", endDate);
    setQueryParams(newQueryParams);
    fetchPage<Movie>(
      getFilteredMoviesRequest(),
      0,
      pageSize,
      newQueryParams,
    ).then((response) => {
      setMoreContent(response.numberOfElements >= 12);
      setMovies(response.content);
      setPageNumber(0);
    });
  }, [search, city, cinema, genres, startDate, endDate]);

  function handleLoadMore() {
    nextPage();
    fetchPage<Movie>(
      getFilteredMoviesRequest(),
      pageNumber + 1,
      pageSize,
      queryParams,
    ).then((response) => {
      setMovies([...movies, ...response.content]);
      setMoreContent(response.numberOfElements >= 12);
    });
  }

  return (
    <div>
      <div className="max-w-360 min-h-360 w-full px-24 mx-auto mb-11">
        <div className="mb-6 mt-10 font-bold text-cinebhdarkgray text-4xl">
          Upcoming Movies({movies.length})
        </div>
        <SearchBar
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movies"
        />
        <div className="mt-4 mb-6 flex gap-4">
          <UpcomingCitySelect selectedCity={city} onCityChange={setCity} />
          <UpcomingCinemaSelect
            selectedCinema={cinema}
            onCinemaChange={setCinema}
          />
          <UpcomingGenresSelect
            selectedGenres={genres}
            onGenresChange={setGenres}
          />
          <UpcomingDateRangeSelect
            selectedStartDate={startDate}
            onStartDateChange={setStartDate}
            selectedEndDate={endDate}
            onEndDateChange={setEndDate}
          />
        </div>
        <div className="w-full h-full flex gap-6 items-center mt-4 flex-col">
          {movies.length > 0 ? (
            <div className="w-full grid grid-cols-4 gap-4">
              <UpcomingMovieCards movies={movies} />
            </div>
          ) : (
            emptyState
          )}
          <button
            className={`w-20 h-min underline text-cinebhdarkred cursor-pointer hover:text-cinebhlightred font-semibold decoration-0 ${!moreContent ? "hidden" : ""}`}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
