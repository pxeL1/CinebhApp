import {
  MovieContext,
  MovieContextValues,
} from "contexts/MovieContext/MovieContext";
import { PropsWithChildren, useState } from "react";
import moment from "moment";
import { MovieStatus } from "models/MovieStatus";
import { MovieImage } from "models/MovieImage";
import { Projection } from "models/Projection";
import { Personnel } from "models/Personnel";
import put from "services/fetching/Put";
import {
  getMovieCreateRequest,
  getMovieUpdateRequest,
} from "services/fetching/API";
import { useNavigate } from "react-router-dom";
import post from "services/fetching/Post";
import { PartialMovie } from "models/PartialMovie";

export default function MovieContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [pgRating, setPGRating] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [trailer, setTrailer] = useState<string>();
  const [tmdbId, setTmdbId] = useState<string>();
  const [synopsis, setSynopsis] = useState<string>();
  const [status, setStatus] = useState<MovieStatus>(MovieStatus.DRAFT);
  const [genres, setGenres] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<MovieImage>>([]);
  const [projections, setProjections] = useState<Array<Projection>>([]);
  const [personnel, setPersonnel] = useState<Array<Personnel>>([]);

  function handleSubmit() {
    const movieRequest = {
      name: name,
      pgRating: pgRating,
      language: language,
      duration: duration,
      startDate: moment(startDate),
      endDate: moment(endDate),
      trailer: trailer,
      tmdbId: tmdbId,
      synopsis: synopsis,
      status: status,
      genres: genres,
      images: images,
      projections: projections,
      personnel: personnel,
    };

    if (id) {
      put<PartialMovie>(
        getMovieUpdateRequest(id.toString()),
        movieRequest,
      ).then(() => {
        navigate("/admin/movie");
      });
    } else {
      post<PartialMovie>(getMovieCreateRequest(), movieRequest).then(() => {
        navigate("/admin/movie");
      });
    }
  }

  const movieContextValues: MovieContextValues = {
    id: id,
    setId: setId,
    name: name,
    setName: setName,
    pgRating: pgRating,
    setPGRating: setPGRating,
    language: language,
    setLanguage: setLanguage,
    duration: duration,
    setDuration: setDuration,
    startDate: startDate,
    setStartDate: setStartDate,
    endDate: endDate,
    setEndDate: setEndDate,
    trailer: trailer,
    setTrailer: setTrailer,
    tmdbId: tmdbId,
    setTmdbId: setTmdbId,
    synopsis: synopsis,
    setSynopsis: setSynopsis,
    status: status,
    setStatus: setStatus,
    genres: genres,
    setGenres: setGenres,
    images: images,
    setImages: setImages,
    projections: projections,
    setProjections: setProjections,
    personnel: personnel,
    setPersonnel: setPersonnel,
    handleSubmit: handleSubmit,
  };

  return (
    <MovieContext.Provider value={movieContextValues}>
      {children}
    </MovieContext.Provider>
  );
}
