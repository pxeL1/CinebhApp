import useFetchData from "hooks/useFetchData";
import { Genre } from "models/Genre";
import { getAllGenresRequest } from "services/fetching/API";
import MultiSelect from "components/common/MultiSelect/MultiSelect";
import { JSX } from "react";

export interface GenresSelectProps {
  icon?: JSX.Element;
  placeholder?: string;
  selectedGenres: string[] | undefined;
  onGenresChange: (genres: string[]) => void;
  shadow?: boolean;
}

export default function GenresSelect({
  icon,
  placeholder,
  selectedGenres,
  onGenresChange,
  shadow,
}: GenresSelectProps) {
  const { data, loading, error } = useFetchData<Array<Genre>>(
    getAllGenresRequest(),
  );
  const items = data?.map((genre) => genre.name) ?? [];

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
      <MultiSelect
        icon={icon}
        placeholder={placeholder ?? "All Genres"}
        items={items}
        onItemChange={onGenresChange}
        selectedItems={selectedGenres ?? []}
        shadow={shadow ?? true}
      />
    </div>
  );
}
