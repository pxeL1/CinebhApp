import AdminSidebar from "pages/Admin/AdminSidebar";
import { useState } from "react";
import classNames from "classnames";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonType } from "components/common/Button/Button";
import { useNavigate } from "react-router-dom";

type MovieType = "DRAFTS" | "CURRENT" | "UPCOMING" | "ARCHIVED";

export default function AdminMovies() {
  const [movieType, setMovieType] = useState<MovieType>("DRAFTS");
  const movieCount = new Map<string, number>([
    ["DRAFTS", 0],
    ["CURRENT", 0],
    ["UPCOMING", 0],
    ["ARCHIVED", 0],
  ]);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-8 w-full">
        <div className="flex justify-between">
          <div className="font-bold text-xl text-cinebhdarkgray mb-4">
            Movies
          </div>
          <div className="max-w-32">
            <Button
              onClick={() => navigate("/admin/movie/add")}
              variant={ButtonType.PRIMARY}
            >
              Add Movie
            </Button>
          </div>
        </div>
        <FilterBar
          selectedMovieType={movieType}
          onMovieTypeSelect={setMovieType}
          moviesCount={movieCount}
        />
        <NoMoviesPlaceholder />
      </div>
    </div>
  );
}

interface FilterBarProps {
  selectedMovieType: MovieType;
  onMovieTypeSelect(movieType: MovieType): void;
  moviesCount: Map<string, number>;
}

function FilterBar({
  selectedMovieType,
  onMovieTypeSelect,
  moviesCount,
}: FilterBarProps) {
  return (
    <div className="flex gap-8 border-b border-cinebhpale w-full">
      <div
        className={classNames("pb-2 text-cinebhdarkgray cursor-pointer", {
          "border-b border-cinebhdarkred text-cinebhdarkred hover:text-cinebhdarkred":
            selectedMovieType === "DRAFTS",
        })}
        onClick={() => onMovieTypeSelect("DRAFTS")}
      >
        {`Drafts (${moviesCount.get("DRAFTS")})`}
      </div>
      <div
        className={classNames("pb-2 text-cinebhdarkgray cursor-pointer", {
          "border-b border-cinebhdarkred text-cinebhdarkred":
            selectedMovieType === "CURRENT",
        })}
        onClick={() => onMovieTypeSelect("CURRENT")}
      >
        {`Currently Showing (${moviesCount.get("CURRENT")})`}
      </div>
      <div
        className={classNames("pb-2 text-cinebhdarkgray cursor-pointer", {
          "border-b border-cinebhdarkred text-cinebhdarkred":
            selectedMovieType === "UPCOMING",
        })}
        onClick={() => onMovieTypeSelect("UPCOMING")}
      >
        {`Currently Showing (${moviesCount.get("UPCOMING")})`}
      </div>
      <div
        className={classNames("pb-2 text-cinebhdarkgray cursor-pointer", {
          "border-b border-cinebhdarkred text-cinebhdarkred":
            selectedMovieType === "ARCHIVED",
        })}
        onClick={() => onMovieTypeSelect("ARCHIVED")}
      >
        {`Currently Showing (${moviesCount.get("ARCHIVED")})`}
      </div>
    </div>
  );
}

function NoMoviesPlaceholder() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <div className="py-24 flex flex-col items-center gap-6">
        <FontAwesomeIcon
          icon={faFilm}
          className="text-cinebhlightgray text-5xl"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl text-cinebhdarkgray font-bold">
            No movies added
          </div>
          <div className="text-cinebhlightgray">
            You can add movie via Add Movie button
          </div>
        </div>
        <div className="max-w-32">
          <Button
            onClick={() => navigate("/admin/movie/add")}
            variant={ButtonType.PRIMARY}
          >
            Add Movie
          </Button>
        </div>
      </div>
    </div>
  );
}
