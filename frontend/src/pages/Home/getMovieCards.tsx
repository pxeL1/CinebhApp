import { Page } from "models/Page";
import { Movie } from "models/Movie";
import {
  defaultGenre,
  defaultImage,
} from "assets/default_values/defaultValues";
import Card from "components/common/Card/Card";

export default function getMovieCards(page: Page<Movie>) {
  return page.content.map((movie) => {
    const coverImage = movie.images.find((image) => image.coverPhoto);
    const coverImageUrl: string = coverImage?.url ?? defaultImage;
    const genre = movie.genres.at(0)?.genre.name ?? defaultGenre;

    function getCardDescription() {
      return (
        <div className="text-atlantlightgray text-sm h-5 flex ml-1">
          {movie.duration} | {genre}
        </div>
      );
    }

    return (
      <Card
        key={movie.id}
        imageUrl={coverImageUrl}
        title={movie.name}
        description={getCardDescription()}
      />
    );
  });
}
