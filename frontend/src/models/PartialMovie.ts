import { MovieStatus } from "models/MovieStatus";
import { MovieGenre } from "models/MovieGenre";
import { MovieImage } from "models/MovieImage";
import { Projection } from "models/Projection";
import { Personnel } from "models/Personnel";

export type PartialMovie = {
  id: number;
  name?: string;
  pgRating?: string;
  language?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  trailer?: string;
  tmdbId?: string;
  synopsis?: string;
  status: MovieStatus;
  genres: MovieGenre[];
  images: MovieImage[];
  projections: Projection[];
  personnel: Personnel[];
};
