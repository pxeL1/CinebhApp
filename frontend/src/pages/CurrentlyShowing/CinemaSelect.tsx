import useFetchData from "hooks/useFetchData";
import { Venue } from "models/Venue";
import { getAllVenuesRequest } from "services/fetching/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Select from "components/common/Select/Select";

export interface CinemaSelectProps {
  selectedCinema: string;
  onCinemaChange: (cinema: string) => void;
}

export default function CinemaSelect({ selectedCinema, onCinemaChange }: CinemaSelectProps) {
  const { data, loading, error} = useFetchData<Array<Venue>>(getAllVenuesRequest());
  const cinemasPlaceholder = <div className="w-full h-full flex items-center text-cinebhlightgray"><span className="mr-2 ml-3"><FontAwesomeIcon icon={faLocationPin} /></span>{selectedCinema.length !== 0 ? selectedCinema : "All Cinemas"}</div>;

  return (
    <div className="h-full w-full">
      {error ? (<div>Error</div>) : (<></>)}
      {loading ? (<div>Loading...</div>) : (<></>)}
      <Select placeholder={cinemasPlaceholder} items={data?.map(cinema => cinema.name) ?? []} onItemChange={onCinemaChange} />
    </div>
  )
}
