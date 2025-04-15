import { MovieGenre } from "./MovieGenre";
import { MovieImage } from "./MovieImage";
import { MovieStatus } from "models/MovieStatus";

export type Movie = {
  id: number;
  name: string;
  pgRating: string;
  language: string;
  duration: string;
  startDate: string;
  endDate: string;
  trailer: string;
  synopsis: string;
  status: MovieStatus;
  genres: MovieGenre[];
  images: MovieImage[];
};
