import { RatingSupplier } from "services/RatingSupplier/RatingSupplier";
import { Movie } from "models/Movie";
import { Rating } from "models/Rating";

type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
};

type Review = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export class TMDBRatingSupplier implements RatingSupplier {
  private access_token: string = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  private options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + this.access_token,
    },
  };

  async getRating(movie: Movie): Promise<Rating> {
    const url =
      "https://api.themoviedb.org/3/movie/" + movie.tmdbId + "/reviews";
    const res = await fetch(url, this.options);
    const resJson = await res.json();

    const results = resJson.results;
    const ratings: Array<number> = results.map(
      (review: Review) => review.author_details.rating,
    );
    const ratingsSum = ratings.reduce((prev, current) => prev + current, 0);

    return { author: "TMDB", rating: ratingsSum / ratings.length };
  }
}
