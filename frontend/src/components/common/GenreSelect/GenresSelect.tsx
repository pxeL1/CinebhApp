import useFetchData from "hooks/useFetchData";
import { Genre } from "models/Genre";
import { getAllGenresRequest } from "services/fetching/API";
import MultiSelect from "components/common/MultiSelect/MultiSelect";
import { JSX } from "react";

export interface GenresSelectProps {
  icon?: JSX.Element;
  selectedGenres: string[] | undefined;
  onGenresChange: (genres: string[]) => void;
}

export default function GenresSelect({
  icon,
  selectedGenres,
  onGenresChange,
}: GenresSelectProps) {
  const { data, loading, error } = useFetchData<Array<Genre>>(
    getAllGenresRequest(),
  );
  const items = data?.map((genre) => genre.name) ?? [];

  return (
    <div className="h-full w-full">
      {error ? <div>Error</div> : <></>}
      {loading ? <div>Loading...</div> : <></>}
      <MultiSelect
        icon={icon}
        placeholder={"All Genres"}
        selected={selectedGenres ?? []}
        items={items}
        onItemChange={onGenresChange}
        selectedItems={selectedGenres ?? []}
      />
    </div>
  );
}
