import useFetchData from "hooks/useFetchData";
import { Venue } from "models/Venue";
import { getAllVenuesRequest } from "services/fetching/API";
import Select from "components/common/Select/Select";
import { JSX } from "react";

export interface CinemaSelectProps {
  icon?: JSX.Element;
  selectedCinema: string | undefined;
  onCinemaChange: (cinema: string) => void;
}

export default function CinemaSelect({
  icon,
  selectedCinema,
  onCinemaChange,
}: CinemaSelectProps) {
  const { data, loading, error } = useFetchData<Array<Venue>>(
    getAllVenuesRequest(),
  );
  const items = data?.map((cinema) => cinema.name) ?? [];

  return (
    <div className="h-full w-full">
      {error ? <div>Error</div> : <></>}
      {loading ? <div>Loading...</div> : <></>}
      <Select
        icon={icon}
        placeholder={"All Cinemas"}
        selected={selectedCinema}
        items={items}
        onItemChange={onCinemaChange}
      />
    </div>
  );
}
