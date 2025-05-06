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

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Error
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Select
        icon={icon}
        placeholder="All Cinemas"
        selected={selectedCinema}
        items={items}
        onItemChange={onCinemaChange}
      />
    </div>
  );
}
