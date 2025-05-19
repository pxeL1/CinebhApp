import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "models/Movie";
import get from "services/fetching/Get";
import { getMovieRequest } from "services/fetching/API";
import Footer from "components/Footer/Footer";
import { getFormattedDate } from "utility/time-utils";
import PersonnelTable from "pages/MovieDetails/PersonnelTable";
import ProjectionPicker from "pages/MovieDetails/ProjectionPicker";
import SeeAlsoCarousel from "pages/MovieDetails/SeeAlsoCarousel";
import Video from "components/common/Video/Video";
import { MovieImage } from "models/MovieImage";
import { defaultImage } from "defaultValues";

const separator = <div className="border-cinebhdarkred h-5 border-l w-1"></div>;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [images, setImages] = useState<Array<MovieImage>>([]);

  useEffect(() => {
    if (!id) return;

    get<Movie>(getMovieRequest(id)).then((data) => {
      setMovie(data);
      setStartDate(getFormattedDate(data.startDate));
      setEndDate(getFormattedDate(data.endDate));
      setImages(data.images.filter((image) => !image.coverPhoto));
    });
  }, [id]);

  return (
    <div>
      <div className="w-full h-full px-24 py-14">
        <div className="text-2xl font-bold text-cinebhdarkgray mb-7">
          Movie Details
        </div>
        <div className="flex rounded-2xl overflow-hidden gap-4 mb-9 max-h-100">
          <div className="w-1/2">
            <Video src={movie?.trailer ?? ""} alt={defaultImage} />
          </div>
          <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-4">
            <img
              className="h-full w-full"
              src={images.at(0)?.url}
              alt="movie image 1"
            />
            <img
              className="h-full w-full"
              src={images.at(1)?.url}
              alt="movie image 2"
            />
            <img
              className="h-full w-full"
              src={images.at(2)?.url}
              alt="movie image 3"
            />
            <img
              className="h-full w-full"
              src={images.at(3)?.url}
              alt="movie image 4"
            />
          </div>
        </div>
        <div className="flex mb-56">
          <div className="flex flex-col w-1/2">
            <div className="text-4xl font-bold text-cinebhdarkgray mb-4">
              {movie?.name}
            </div>
            <div className="flex gap-3 items-center text-cinebhdarkgray mb-4">
              {movie?.pgRating}
              {separator}
              {movie?.language}
              {separator}
              {movie?.duration}
              {separator}
              Projection date: {startDate} - {endDate}
            </div>
            <div className="flex gap-4">
              {movie?.genres.map((movieGenre) => (
                <div
                  key={movieGenre.genre.id}
                  className="px-2 py-1.5 rounded-lg bg-cinebhpale text-cinebhdark flex items-center justify-center mb-4"
                >
                  {movieGenre.genre.name}
                </div>
              ))}
            </div>
            <div className="text-cinebhdarkgray mb-6 h-full pr-6">
              {movie?.synopsis}
            </div>
            <PersonnelTable id={id ?? ""} />
          </div>
          <div className="w-1/2">
            <ProjectionPicker projections={movie?.projections ?? []} />
          </div>
        </div>
        <div>
          <SeeAlsoCarousel />
        </div>
      </div>
      <Footer />
    </div>
  );
}
