import { Hall } from "models/Hall";
import { MovieDTO } from "models/MovieDTO";

export type ProjectionDTO = {
  id: number;
  time: string;
  hall: Hall;
  movie: MovieDTO;
}
