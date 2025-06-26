import AdminSidebar from "pages/Admin/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import General from "pages/Admin/General";
import { MovieContext } from "contexts/MovieContext/MovieContext";
import { JSX, useContext, useEffect, useState } from "react";
import get from "services/fetching/Get";
import { PartialMovie } from "models/PartialMovie";
import { getMovieRequest } from "services/fetching/API";
import Details from "pages/Admin/Details";
import Venues from "pages/Admin/Venues";

export type Step = "FIRST" | "SECOND" | "THIRD";

export default function AddMovie() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieContext = useContext(MovieContext);
  const [formStep, setFormStep] = useState<Step>("FIRST");

  const general: JSX.Element = <General setFormStep={setFormStep} />;
  const details: JSX.Element = <Details setFormStep={setFormStep} />;
  const venues: JSX.Element = <Venues setFormStep={setFormStep} />;

  const formComponentMap = new Map<Step, JSX.Element>([
    ["FIRST", general],
    ["SECOND", details],
    ["THIRD", venues],
  ]);

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) return;

    get<PartialMovie>(getMovieRequest(id)).then((movie) => {
      const genres = movie.genres.map((movieGenre) => movieGenre.genre.name);

      movieContext.setId(movie.id);
      movieContext.setName(movie.name);
      movieContext.setLanguage(movie.language);
      movieContext.setPGRating(movie.pgRating);
      movieContext.setDuration(movie.duration);
      movieContext.setStartDate(movie.startDate);
      movieContext.setEndDate(movie.endDate);
      movieContext.setTrailer(movie.trailer);
      movieContext.setTmdbId(movie.tmdbId);
      movieContext.setSynopsis(movie.synopsis);
      movieContext.setGenres(genres);
      movieContext.setImages(movie.images);
      movieContext.setProjections(movie.projections);
      movieContext.setPersonnel(movie.personnel);
    });
  }, [searchParams]);

  return (
    <div>
      <div className="flex">
        <AdminSidebar />
        <div className="p-8 w-full">
          <div className="flex justify-between mb-7">
            <div className="font-bold text-xl text-cinebhdarkgray mb-4">
              Add New Movie
            </div>
            <button
              className="border rounded-lg border-cinebhdarkred text-cinebhdarkred px-4 py-2.5 cursor-pointer hover:bg-cinebhdarkred hover:text-cinebhneutral"
              onClick={() => navigate("/admin/movie")}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          {formComponentMap.get(formStep)}
        </div>
      </div>
    </div>
  );
}
