import { Movie } from "models/Movie";
import { Rating } from "models/Rating";

export interface RatingSupplier {
  getRating(movie: Movie): Promise<Rating>;
}
