import { Movie } from "models/Movie";
import { defaultImage } from "defaultValues";
import Card from "components/common/Card/Card";
import moment from "moment";

export interface UpcomingMovieCardsProps {
  movies: Array<Movie>;
}

export default function UpcomingMovieCards({
  movies,
}: UpcomingMovieCardsProps) {
  return movies.map((movie) => {
    const coverImage = movie.images.find((image) => image.coverPhoto);
    const coverImageUrl: string = coverImage?.url ?? defaultImage;
    const genre = movie.genres.at(0)?.genre.name;

    function getCardDescription() {
      return (
        <div className="text-cinebhlightgray text-sm h-5 flex ml-1">
          {movie.duration} <div className="w-0 border-l ml-4 mr-3"></div>{" "}
          {genre}
        </div>
      );
    }

    function getStartDate() {
      const startDate = moment(movie.startDate);

      if (moment(startDate).isSame(new Date(), "week")) {
        return "Opens " + startDate.format("dddd");
      }

      return startDate.format("ddd, MMM MM, YYYY");
    }

    return (
      <div>
        <div className="absolute z-10 rounded-xl bg-cinebhdarkred text-cinebhneutral p-1.5 mt-8 ml-40">
          {getStartDate()}
        </div>
        <div className="relative">
          <Card
            key={movie.id}
            imageUrl={coverImageUrl}
            title={movie.name}
            description={getCardDescription()}
          />
        </div>
      </div>
    );
  });
}
