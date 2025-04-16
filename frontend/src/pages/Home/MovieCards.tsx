import { Page } from "models/Page";
import { Movie } from "models/Movie";
import {
  defaultImage,
} from "defaultValues";
import Card from "components/common/Card/Card";

export interface MovieCardsProps {
  page: Page<Movie>
}

export default function MovieCards({ page }: MovieCardsProps) {
  return page?.content.map((movie) => {
    const coverImage = movie.images.find((image) => image.coverPhoto);
    const coverImageUrl: string = coverImage?.url ?? defaultImage;
    const genre = movie.genres.at(0)?.genre.name;

    function getCardDescription() {
      return (
        <div className="text-cinebhlightgray text-sm h-5 flex ml-1">
          {movie.duration} <div className='w-0 border-l ml-4 mr-3'></div> {genre}
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
