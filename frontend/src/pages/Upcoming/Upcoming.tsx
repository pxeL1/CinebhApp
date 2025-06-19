import Footer from "components/Footer/Footer";
import { useEffect, useState } from "react";
import SearchBar from "components/common/SearchBar/SearchBar";
import UpcomingDateRangeSelect from "pages/Upcoming/UpcomingDateRangeSelect";
import { Movie } from "models/Movie";
import usePagination from "hooks/usePagination";
import fetchPage from "services/fetching/fetchPage";
import { getFilteredMoviesRequest } from "services/fetching/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarDays,
  faClapperboard,
  faFilm,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpcomingMovieCards from "pages/Upcoming/UpcomingMovieCards";
import CitySelect from "components/common/CitySelect/CitySelect";
import CinemaSelect from "components/common/CinemaSelect/CinemaSelect";
import GenresSelect from "components/common/GenreSelect/GenresSelect";
import moment from "moment";
import classNames from "classnames";

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
  const [search, setSearch] = useState<string>();
  const [city, setCity] = useState<string>();
  const [cinema, setCinema] = useState<string>();
  const [genres, setGenres] = useState<Array<string>>();
  const [startDate, setStartDate] = useState<string>(moment().toISOString());
  const [endDate, setEndDate] = useState<string>();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const [moreContent, setMoreContent] = useState<boolean>(false);
  const { pageNumber, pageSize, nextPage, setPageNumber } = usePagination(12);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();

    newQueryParams.set("search", search ?? "");
    newQueryParams.set("city", city ?? "");
    newQueryParams.set("venue", cinema ?? "");
    newQueryParams.set("genres", genres?.toString() ?? "");
    newQueryParams.set("endDate", endDate ?? "");
    newQueryParams.set("startDate", startDate);
    newQueryParams.set("status", "PUBLISHED");


    setQueryParams(newQueryParams);

    fetchPage<Movie>(
      getFilteredMoviesRequest(),
      0,
      pageSize,
      newQueryParams,
    ).then((response) => {
      setMoreContent(!response.last);
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
      setMoreContent(!response.last);
    });
  }

  return (
    <div>
      <div className="max-w-360 min-h-360 w-full px-24 mx-auto mb-11">
        <div className="mb-6 mt-10 font-bold text-cinebhdarkgray text-4xl">
          Upcoming Movies({movies.length})
        </div>
        <div className="my-4">
          <SearchBar onChange={setSearch} placeholder="Search Movies" />
        </div>
        <div className="mt-4 mb-6 flex gap-4">
          <CitySelect
            icon={<FontAwesomeIcon icon={faLocationPin} />}
            selectedCity={city}
            onCityChange={setCity}
          />
          <CinemaSelect
            icon={<FontAwesomeIcon icon={faBuilding} />}
            selectedCinema={cinema}
            onCinemaChange={setCinema}
          />
          <GenresSelect
            icon={<FontAwesomeIcon icon={faClapperboard} />}
            selectedGenres={genres}
            onGenresChange={setGenres}
          />
          <UpcomingDateRangeSelect
            icon={<FontAwesomeIcon icon={faCalendarDays} />}
            selectedStartDate={startDate}
            onStartDateChange={setStartDate}
            selectedEndDate={endDate}
            onEndDateChange={setEndDate}
          />
        </div>
        <div className="w-full h-full flex gap-6 items-center mt-4 flex-col">
          {!movies.length && emptyState}
          <div className="w-full grid grid-cols-4 gap-4">
            <UpcomingMovieCards movies={movies} />
          </div>
          <button
            className={classNames(
              "w-20 h-min underline text-cinebhdarkred cursor-pointer hover:text-cinebhlightred font-semibold decoration-0",
              { hidden: !moreContent },
            )}
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
