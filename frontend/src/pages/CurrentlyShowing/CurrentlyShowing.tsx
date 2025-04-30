import SearchBar from "components/common/SearchBar/SearchBar";
import Footer from "components/Footer/Footer";
import DatePicker from "pages/CurrentlyShowing/DatePicker";
import { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { getFilteredMoviesRequest } from "services/fetching/API";
import { Movie } from "models/Movie";
import CurrentlyShowingMovieCard from "pages/CurrentlyShowing/CurrentlyShowingMovieCard";
import CitySelect from "pages/CurrentlyShowing/CitySelect";
import CinemaSelect from "pages/CurrentlyShowing/CinemaSelect";
import GenresSelect from "pages/CurrentlyShowing/GenresSelect";
import ProjectionTimesSelect from "pages/CurrentlyShowing/ProjectionTimesSelect";
import usePagination from "hooks/usePagination";
import fetchPage from "services/fetching/fetchPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
      to="/upcoming"
      className="text-cinebhdarkred underline decoration-0 font-semibold"
    >
      Explore Upcoming Movies
    </Link>
  </div>
);

export default function CurrentlyShowing() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Moment>(moment().utc().startOf("day"));
  const [city, setCity] = useState("");
  const [cinema, setCinema] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const [moreContent, setMoreContent] = useState<boolean>(false);
  const { pageNumber, pageSize, nextPage, setPageNumber } = usePagination(9);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();
    newQueryParams.set("type", "current");
    newQueryParams.set("search", search);
    newQueryParams.set("date", date.toISOString());
    newQueryParams.set("city", city);
    newQueryParams.set("venue", cinema);
    newQueryParams.set("genres", genres.toString());
    newQueryParams.set("fromTime", fromTime);
    newQueryParams.set("toTime", toTime);
    setQueryParams(newQueryParams);
    fetchPage<Movie>(
      getFilteredMoviesRequest(),
      0,
      pageSize,
      newQueryParams,
    ).then((response) => {
      setMoreContent(response.numberOfElements >= 9);
      setMovies(response.content);
      setPageNumber(0);
    });
  }, [search, date, city, cinema, genres, fromTime, toTime]);

  function handleLoadMore() {
    nextPage();
    fetchPage<Movie>(
      getFilteredMoviesRequest(),
      pageNumber + 1,
      pageSize,
      queryParams,
    ).then((response) => {
      setMovies([...movies, ...response.content]);
      setMoreContent(response.numberOfElements >= 9);
    });
  }

  return (
    <div>
      <div className="max-w-360 min-h-360 w-full px-24 mx-auto mb-11">
        <SearchBar
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movies"
        />
        <div className="mt-4 mb-6 flex gap-4">
          <CitySelect selectedCity={city} onCityChange={setCity} />
          <CinemaSelect selectedCinema={cinema} onCinemaChange={setCinema} />
          <GenresSelect selectedGenres={genres} onGenresChange={setGenres} />
          <ProjectionTimesSelect
            selectedFromTime={fromTime}
            onFromTimeChange={setFromTime}
            selectedToTime={toTime}
            onToTimeChange={setToTime}
          />
        </div>
        <DatePicker onDateChange={setDate} />
        <div className="w-full h-full flex flex-col gap-6 items-center mt-4">
          {movies.length > 0
            ? movies.map((movie) => (
                <CurrentlyShowingMovieCard
                  movie={movie}
                  key={movie.id}
                  date={date.toISOString()}
                />
              ))
            : emptyState}
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
