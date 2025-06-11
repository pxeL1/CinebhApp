import CitySelect from "components/common/CitySelect/CitySelect";
import { useContext, useEffect, useState } from "react";
import CinemaSelect from "components/common/CinemaSelect/CinemaSelect";
import { faBuilding, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Projection } from "models/Projection";
import ProjectionDatePicker from "pages/MovieDetails/ProjectionDatePicker";
import moment, { Moment } from "moment";
import { getFormattedTime } from "utility/time-utils";
import Button, { ButtonType } from "components/common/Button/Button";
import { UserContext } from "contexts/UserContext/UserContext";
import { AuthSidebarContext } from "contexts/AuthSidebarContext/AuthSidebarContext";
import { useNavigate } from "react-router-dom";

export interface ProjectionPickerProps {
  projections: Array<Projection>;
}

export default function ProjectionPicker({
  projections,
}: ProjectionPickerProps) {
  const [city, setCity] = useState<string>();
  const [cinema, setCinema] = useState<string>();
  const [date, setDate] = useState<Moment>(moment());
  const [projection, setProjection] = useState<Projection>();
  const [filteredProjections, setFilteredProjections] =
    useState<Array<Projection>>(projections);
  const userContext = useContext(UserContext);
  const authSidebarContext = useContext(AuthSidebarContext);
  const navigate = useNavigate();

  useEffect(() => {
    let newProjections = projections;

    if (city) {
      newProjections = newProjections?.filter(
        (projection) => projection.hall.venue.city.name === city,
      );
    }
    if (cinema) {
      newProjections = newProjections?.filter(
        (projection) => projection.hall.venue.name === cinema,
      );
    }

    setFilteredProjections(newProjections);
  }, [cinema, city, projections]);

  function handleButtonClick() {
    if (!userContext.user) {
      authSidebarContext.openAuthSidebar(() => {});
      return;
    }

    navigate(`/projection/${projection?.id}/${date?.toISOString()}`);
  }

  return (
    <div className="border border-cinebhpale shadow-xl shadow-cinebhshadow rounded-2xl">
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <CitySelect
            selectedCity={city}
            onCityChange={setCity}
            icon={<FontAwesomeIcon icon={faLocationPin} />}
          />
          <CinemaSelect
            selectedCinema={cinema}
            onCinemaChange={setCinema}
            icon={<FontAwesomeIcon icon={faBuilding} />}
          />
        </div>
        <div>
          <ProjectionDatePicker onDateChange={setDate} />
        </div>
        <div className="h-full min-h-48">
          <div className="font-bold text-cinebhdarkgray text-xl mb-4">
            Standard
          </div>
          <div className="flex gap-4">
            {filteredProjections?.map((project) => (
              <ProjectionButton
                key={project.id}
                onProjectionClick={setProjection}
                disabled={project.id === projection?.id}
                projection={project}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cinebhpale px-6 pt-6 pb-8">
        <div className="flex">
          <Button
            variant={ButtonType.PRIMARY}
            onClick={handleButtonClick}
            disabled={!projection}
          >
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ProjectionButtonProps {
  projection: Projection;
  onProjectionClick: (projection: Projection) => void;
  disabled: boolean;
}

function ProjectionButton({
  projection,
  onProjectionClick,
  disabled,
}: ProjectionButtonProps) {
  return (
    <button
      onClick={() => onProjectionClick(projection)}
      disabled={disabled}
      className="max-h-12 p-3 border rounded-lg border-cinebhpale text-cinebhdarkgray font-bold text-xl flex items-center justify-center cursor-pointer hover:bg-cinebhshadow disabled:bg-cinebhdarkred disabled:border-cinebhdarkred disabled:text-cinebhneutral disabled:cursor-default"
    >
      {getFormattedTime(projection.time)}
    </button>
  );
}
