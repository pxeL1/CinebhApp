import ProgressBar from "pages/Admin/ProgressBar";
import Button, { ButtonType } from "components/common/Button/Button";
import { Step } from "pages/Admin/AddMovie";
import { JSX, useContext, useEffect, useState } from "react";
import CinemaSelect from "components/common/CinemaSelect/CinemaSelect";
import ProjectionTimeSelect from "components/common/ProjectionTimeSelect/ProjectionTimeSelect";
import {
  faBuilding,
  faClock,
  faLocationPin,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Venue } from "models/Venue";
import get from "services/fetching/Get";
import { getAllVenuesRequest } from "services/fetching/API";
import { Projection } from "models/Projection";
import { MovieContext } from "contexts/MovieContext/MovieContext";
import { ProjectionRequest } from "models/ProjectionRequest";

export interface VenuesProps {
  setFormStep: (step: Step) => void;
}

interface ProjectionModel {
  element: JSX.Element;
  projection: ProjectionRequest;
}

export default function Venues({ setFormStep }: VenuesProps) {
  const movieContext = useContext(MovieContext);
  const [isAddable, setIsAddable] = useState<boolean>(false);
  const firstProjection: ProjectionRequest = { time: undefined, venue: undefined };
  const [projectionComponents, setProjectionComponents] = useState<
    Array<ProjectionModel>
  >([]);

  useEffect(() => {
    setProjectionComponents([{element: <ProjectionComponent
        index={0}
        projection={firstProjection}
        onProjectionComplete={setIsAddable}
        projectionComponents={projectionComponents}
        setProjectionComponents={setProjectionComponents}
      />, projection: firstProjection}])
  }, []);

  function addProjection() {
    const projection: ProjectionRequest = { time: undefined, venue: undefined };
    const projectionComponent = (
      <ProjectionComponent
        index={projectionComponents.length}
        projection={projection}
        onProjectionComplete={setIsAddable}
        projectionComponents={projectionComponents}
        setProjectionComponents={setProjectionComponents}
      />
    );

    const newProjectionComponent: ProjectionModel = {
      element: projectionComponent,
      projection: projection,
    };
    setIsAddable(false);
    const newProjectionComponents = [
      ...projectionComponents,
      newProjectionComponent,
    ];
    setProjectionComponents(newProjectionComponents);
  }

  function handleSaveToDrafts() {
    movieContext.handleSubmit();
  }

  return (
    <>
      <div className="p-8 w-full min-h-screen">
        <ProgressBar step={"THIRD"} />
        {projectionComponents.map((component) => component.element)}
        <div className="w-full flex justify-center">
          <button
            className="text-cinebhdarkred cursor-pointer flex gap-2 items-center disabled:text-cinebhdust disabled:cursor-default"
            onClick={addProjection}
            disabled={!isAddable}
          >
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <div className="font-semibold underline">Add projection</div>
          </button>
        </div>
      </div>
      <div className="flex justify-between max-h-12">
        <button
          className="text-cinebhdarkred underline font-semibold cursor-pointer disabled:cursor-default disabled:text-cinebhdust"
          onClick={() => setFormStep("SECOND")}
        >
          Back
        </button>
        <div className="flex gap-4">
          <Button variant={ButtonType.QUATERNARY} onClick={handleSaveToDrafts}>
            Save to Drafts
          </Button>
          <Button variant={ButtonType.PRIMARY} onClick={handleSaveToDrafts} disabled={!isAddable}>
            Add Movie
          </Button>
        </div>
      </div>
    </>
  );
}

interface ProjectionProps {
  index: number;
  projection: ProjectionRequest;
  projectionComponents: Array<ProjectionModel>;
  setProjectionComponents: (newProjectionComponents: Array<ProjectionModel>) => void;
  onProjectionComplete: (status: boolean) => void;
}

function ProjectionComponent({
  index,
  projection,
  projectionComponents,
  setProjectionComponents,
  onProjectionComplete,
}: ProjectionProps) {
  const [city, setCity] = useState<string>("Choose city");
  const [venue, setVenue] = useState<string>();
  const [time, setTime] = useState<string>();
  const [venues, setVenues] = useState<Array<Venue>>([]);

  useEffect(() => {
    get<Array<Venue>>(getAllVenuesRequest()).then((data) => {
      setVenues(data);
    });
  }, []);

  useEffect(() => {
    projection.venue = venues
      .filter((ven) => ven.name === venue)
      .at(0);
    projection.time = time + ":00";
    if (venue && time) {
      onProjectionComplete(true);
    }
  }, [venue, time, venues]);

  function onProjectionDelete(index: number) {
    const newProjectionComponents = projectionComponents.filter(
      (component, componentIndex) => componentIndex !== index,
    );
    setProjectionComponents(newProjectionComponents);
  }

  function onVenueChange(venue: string) {
    setVenue(venue);

    const city = venues.filter((ven) => ven.name === venue)[0].city.name;
    setCity(city);
  }

  return (
    <div className="flex gap-4 my-8">
      <div className="h-full w-full flex flex-col gap-1.5">
        <label className="font-semibold text-cinebhdark">City</label>
        <div className="w-full h-full py-3 border flex items-center rounded-lg border-cinebhpale text-cinebhlightgray">
          <span className="mr-2 ml-3">
            <FontAwesomeIcon icon={faLocationPin} />
          </span>
          {city}
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-1.5">
        <label className="font-semibold text-cinebhdark">Venue</label>
        <CinemaSelect
          selectedCinema={venue}
          onCinemaChange={onVenueChange}
          shadow={false}
          placeholder="Choose venue"
          icon={<FontAwesomeIcon icon={faBuilding} />}
        />
      </div>
      <div className="h-full w-full flex flex-col gap-1.5">
        <label className="font-semibold text-cinebhdark">Projection Time</label>
        <ProjectionTimeSelect
          selectedTime={time}
          onTimeChange={setTime}
          shadow={false}
          placeholder="Choose time"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
      </div>
      <div className="h-full pt-8 ml-2">
        <button
          onClick={() => onProjectionDelete(index)}
          className="flex justify-center items-center p-4 text-cinebhdarkred cursor-pointer bg-cinebhrosered rounded-lg disabled:text-cinebhdust disabled:bg-cinebhneutral disabled:cursor-default"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
