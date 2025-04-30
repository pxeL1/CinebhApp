import useFetchData from "hooks/useFetchData";
import { getCititesRequest } from "services/fetching/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { City } from "models/City";
import Select from "components/common/Select/Select";

export interface UpcomingCitySelectProps {
  selectedCity: string;
  onCityChange: (cinema: string) => void;
}

export default function UpcomingCitySelect({
  selectedCity,
  onCityChange,
}: UpcomingCitySelectProps) {
  const { data, loading, error } =
    useFetchData<Array<City>>(getCititesRequest());
  const citiesPlaceholder = (
    <div className="w-full h-full flex items-center text-cinebhlightgray">
      <span className="mr-2 ml-3">
        <FontAwesomeIcon icon={faLocationPin} />
      </span>
      {selectedCity.length !== 0 ? selectedCity : "All Cities"}
    </div>
  );

  return (
    <div className="h-full w-full">
      {error ? <div>Error</div> : <></>}
      {loading ? <div>Loading...</div> : <></>}
      <Select
        placeholder={citiesPlaceholder}
        items={data?.map((city) => city.name) ?? []}
        onItemChange={onCityChange}
      />
    </div>
  );
}
