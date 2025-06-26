import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faFilm,
  faFont,
  faLanguage,
  faLink,
  faR,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "pages/Admin/ProgressBar";
import Input from "components/common/Input/Input";
import DateRangeSelect from "components/common/DateRangeSelect/DateRangeSelect";
import GenresSelect from "components/common/GenreSelect/GenresSelect";
import { useContext, useState } from "react";
import Button, { ButtonType } from "components/common/Button/Button";
import { MovieContext } from "contexts/MovieContext/MovieContext";
import { Step } from "pages/Admin/AddMovie";

export interface GeneralProps {
  setFormStep: (step: Step) => void;
}

export default function General({ setFormStep }: GeneralProps) {
  const movieContext = useContext(MovieContext);
  const selectedStartDate = movieContext.startDate?.substring(0, 10);
  const selectedEndDate = movieContext.endDate?.substring(0, 10);
  const selectedDate =
    selectedStartDate || selectedEndDate
      ? selectedStartDate + " - " + selectedEndDate
      : undefined;
  const [director, setDirector] = useState<string>();

  function handleSaveToDrafts() {
    if (director) {
      movieContext.setPersonnel([
        {
          name: director,
          actorRoleName: undefined,
          role: "DIRECTOR",
        },
      ]);
    }

    movieContext.handleSubmit();
  }

  return (
    <>
      <div className="p-8 w-full">
        <ProgressBar step={"FIRST"} />
        <div className="grid grid-cols-2 grid-rows-4 mt-8 gap-x-4 gap-y-6">
          <Input
            dark={false}
            label="Movie name"
            icon={<FontAwesomeIcon icon={faFilm} />}
            placeholder="Type movie name"
            type="text"
            onChange={(e) => movieContext.setName(e.target.value)}
            defaultValue={movieContext.name}
          />
          <Input
            dark={false}
            label="PG Rating"
            icon={<FontAwesomeIcon icon={faR} />}
            placeholder="Type PG Rating"
            type="text"
            onChange={(e) => movieContext.setPGRating(e.target.value)}
            defaultValue={movieContext.pgRating}
          />
          <Input
            dark={false}
            label="Language"
            icon={<FontAwesomeIcon icon={faLanguage} />}
            placeholder="Type language"
            type="text"
            onChange={(e) => movieContext.setLanguage(e.target.value)}
            defaultValue={movieContext.language}
          />
          <Input
            dark={false}
            label="Movie Duration"
            icon={<FontAwesomeIcon icon={faClock} />}
            placeholder="Type movie duration"
            type="text"
            onChange={(e) => movieContext.setDuration(e.target.value)}
            defaultValue={movieContext.duration}
          />
          <div className="h-full w-full flex flex-col gap-1.5">
            <label className="font-semibold text-cinebhdark">
              Projection Date
            </label>
            <DateRangeSelect
              placeholder="Choose projection date"
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
              onStartDateChange={movieContext.setStartDate}
              onEndDateChange={movieContext.setEndDate}
              shadow={false}
              selected={selectedDate}
            />
          </div>
          <div className="h-full w-full flex flex-col gap-1.5">
            <label className="font-semibold text-cinebhdark">Genre</label>
            <GenresSelect
              selectedGenres={movieContext.genres}
              onGenresChange={movieContext.setGenres}
              shadow={false}
              placeholder="Choose genre"
              icon={<FontAwesomeIcon icon={faFilm} />}
            />
          </div>
          <Input
            dark={false}
            label="Director"
            icon={<FontAwesomeIcon icon={faUser} />}
            placeholder="Add director"
            type="text"
            onChange={(e) => setDirector(e.target.value)}
            defaultValue={director}
          />
          <Input
            dark={false}
            label="TMDB ID"
            icon={<FontAwesomeIcon icon={faStar} />}
            placeholder="Add TMDB ID"
            type="text"
            onChange={(e) => movieContext.setTmdbId(e.target.value)}
            defaultValue={movieContext.tmdbId}
          />
        </div>
        <div className="mt-6">
          <Input
            dark={false}
            label="Trailer"
            icon={<FontAwesomeIcon icon={faLink} />}
            placeholder="Insert trailer link"
            type="url"
            onChange={(e) => movieContext.setTrailer(e.target.value)}
            defaultValue={movieContext.trailer}
          />
        </div>
        <div className="w-full flex flex-col gap-1.5 mt-6 mb-19">
          <label className="font-semibold text-cinebhdark">Synopsis</label>
          <div className="flex border rounded-lg border-cinebhpale">
            <span className="pt-3 pl-3">
              <FontAwesomeIcon
                icon={faFont}
                className="text-cinebhlightgray mr-2"
              />
            </span>
            <textarea
              className="w-full pt-3 focus:outline-none text-cinebhlightgray min-h-40 resize-none"
              maxLength={1024}
              placeholder="Write Synopsis"
              onChange={(e) => movieContext.setSynopsis(e.target.value)}
              defaultValue={movieContext.synopsis}
            />
            <div className="text-cinebhlightgray pt-3 pr-3">
              {(movieContext.synopsis?.length ?? 0) + "/1024"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between max-h-12">
        <button
          disabled={true}
          className="text-cinebhdarkred underline font-semibold cursor-pointer disabled:cursor-default disabled:text-cinebhdust"
        >
          Back
        </button>
        <div className="flex gap-4">
          <Button variant={ButtonType.QUATERNARY} onClick={handleSaveToDrafts}>
            Save to Drafts
          </Button>
          <Button
            variant={ButtonType.PRIMARY}
            onClick={() => setFormStep("SECOND")}
            disabled={!movieContext.name}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
