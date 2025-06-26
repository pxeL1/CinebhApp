import { createContext } from "react";
import { MovieStatus } from "models/MovieStatus";
import { MovieImage } from "models/MovieImage";
import { Projection } from "models/Projection";
import { Personnel } from "models/Personnel";

export type MovieContextValues = {
  id?: number;
  setId: (id: number) => void;
  name?: string;
  setName: (name: string | undefined) => void;
  pgRating?: string;
  setPGRating: (rating: string | undefined) => void;
  language?: string;
  setLanguage: (language: string | undefined) => void;
  duration?: string;
  setDuration: (duration: string | undefined) => void;
  startDate?: string;
  setStartDate: (startDate: string | undefined) => void;
  endDate?: string;
  setEndDate: (endDate: string | undefined) => void;
  trailer?: string;
  setTrailer: (trailer: string | undefined) => void;
  tmdbId?: string;
  setTmdbId: (id: string | undefined) => void;
  synopsis?: string;
  setSynopsis: (synopsis: string | undefined) => void;
  status: MovieStatus;
  setStatus: (status: MovieStatus) => void;
  genres: Array<string>;
  setGenres: (genres: Array<string>) => void;
  images: Array<MovieImage>;
  setImages(images: Array<MovieImage>): void;
  projections: Array<Projection>;
  setProjections: (projections: Array<Projection>) => void;
  personnel: Array<Personnel>;
  setPersonnel: (personnel: Array<Personnel>) => void;
  handleSubmit: () => void;
};

export const MovieContext = createContext<MovieContextValues>({
  id: 0,
  setId: (id: number) => {},
  name: "",
  setName: (name: string | undefined) => {},
  pgRating: "",
  setPGRating: (pgRating: string | undefined) => {},
  language: "",
  setLanguage: (language: string | undefined) => {},
  duration: "",
  setDuration: (duration: string | undefined) => {},
  startDate: "",
  setStartDate: (startDate: string | undefined) => {},
  endDate: "",
  setEndDate: (endDate: string | undefined) => {},
  trailer: "",
  setTrailer: (trailer: string | undefined) => {},
  tmdbId: "",
  setTmdbId: (tmdbId: string | undefined) => {},
  synopsis: "",
  setSynopsis: (synopsis: string | undefined) => {},
  status: MovieStatus.DRAFT,
  setStatus: (status: MovieStatus) => {},
  genres: [],
  setGenres: (genres: Array<string>) => {},
  images: [],
  setImages: (images: Array<MovieImage>) => {},
  projections: [],
  setProjections: (projections: Array<Projection>) => {},
  personnel: [],
  setPersonnel: (personnel: Array<Personnel>) => {},
  handleSubmit: () => {},
});
