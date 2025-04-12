import {MovieGenre} from "./MovieGenre.ts";
import {MovieImage} from "./MovieImage.ts";

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
    status: string;
    genres: MovieGenre[];
    images: MovieImage[];
}