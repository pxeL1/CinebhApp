import useFetchData from "hooks/useFetchData";
import { City } from "models/City";
import { getCititesRequest } from "services/fetching/API";
import Select from "components/common/Select/Select";
import { JSX } from "react";

export interface CurrentCitySelectProps {
  icon?: JSX.Element;
  selectedCity: string | undefined;
  onCityChange: (city: string) => void;
  shadow?: boolean;
  placeholder?: string;
}

export default function CitySelect({
  icon,
  selectedCity,
  onCityChange,
  shadow,
  placeholder,
}: CurrentCitySelectProps) {
  const { data, loading, error } =
    useFetchData<Array<City>>(getCititesRequest());
  const items = data?.map((city) => city.name) ?? [];

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
        placeholder={placeholder ?? "All Cities"}
        selected={selectedCity}
        items={items}
        onItemChange={onCityChange}
        shadow={shadow ?? true}
      />
    </div>
  );
}
