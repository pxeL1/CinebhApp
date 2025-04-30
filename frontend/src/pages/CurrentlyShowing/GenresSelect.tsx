import useFetchData from "hooks/useFetchData";
import { Genre } from "models/Genre";
import { getAllGenresRequest } from "services/fetching/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import MultiSelect from "components/common/MultiSelect/MultiSelect";

export interface GenresSelectProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

export default function GenresSelect({
  selectedGenres,
  onGenresChange,
}: GenresSelectProps) {
  const { data, loading, error } = useFetchData<Array<Genre>>(
    getAllGenresRequest(),
  );
  const genresPlaceholder = (
    <div className="w-full h-full flex items-center text-cinebhlightgray">
      <span className="mr-2 ml-3">
        <FontAwesomeIcon icon={faLocationPin} />
      </span>
      <div className="overflow-hidden max-h-6 max-w-52">
        {selectedGenres.length !== 0 ? selectedGenres.toString() : "All Genres"}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full">
      {error ? <div>Error</div> : <></>}
      {loading ? <div>Loading...</div> : <></>}
      <MultiSelect
        placeholder={genresPlaceholder}
        items={data?.map((genre) => genre.name) ?? []}
        onItemChange={onGenresChange}
        selectedItems={selectedGenres}
      />
    </div>
  );
}
