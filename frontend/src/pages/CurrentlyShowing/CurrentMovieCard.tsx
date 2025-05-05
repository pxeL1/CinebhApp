import { Movie } from "models/Movie";
import { defaultImage } from "defaultValues";
import moment from "moment";

export interface CurrentlyShowingMovieCardProps {
  movie: Movie;
}
const separator = <div className="border-cinebhdarkred h-5 border-l w-1"></div>;

export default function CurrentMovieCard({
  movie,
}: CurrentlyShowingMovieCardProps) {
  const coverImage = movie.images.find((image) => image.coverPhoto);
  const coverImageUrl: string = coverImage?.url ?? defaultImage;
  const showtimes = movie.projections.map((projection) => (
    <div
      className="max-h-12 p-3 border rounded-lg border-cinebhpale text-cinebhdarkgray font-bold text-xl flex items-center justify-center"
      key={projection.id}
    >
      {projection.time.substring(0, 5)}
    </div>
  ));
  const genres = movie.genres.map((movieGenre) => (
    <div
      className="rounded-lg bg-cinebhpale px-2 py-1.5 text-cinebhlightgray text-sm"
      key={movieGenre.id}
    >
      {movieGenre.genre.name}
    </div>
  ));

  return (
    <div className="w-full flex rounded-3xl border border-cinebhpale shadow-md shadow-cinebhshadow p-4">
      <img
        src={coverImageUrl}
        alt="Cover Image"
        className="w-full h-full max-h-72 max-w-64 rounded-2xl"
      />
      <div className="ml-6 flex flex-col justify-between">
        <div className="flex gap-24">
          <div className="flex flex-col gap-4 min-w-60">
            <div className="text-3xl font-bold text-cinebhdarkgray">
              {movie.name}
            </div>
            <div className="flex gap-3 items-center">
              {movie.pgRating}
              {separator}
              {movie.language}
              {separator}
              {movie.duration}
            </div>
            <div className="flex gap-4 max-w-60 flex-wrap">{genres}</div>
          </div>
          <div>
            <div className="text-cinebhdarkred font-bold text-xl mt-1 mb-4">
              Showtimes
            </div>
            <div className="flex gap-4 flex-wrap overflow-y-hidden">
              {showtimes}
            </div>
          </div>
        </div>
        <div className="text-sm italic text-cinebhlightgray">
          Playing in cinema until {moment(movie.endDate).format("DD.MM.YYYY")}
        </div>
      </div>
    </div>
  );
}
