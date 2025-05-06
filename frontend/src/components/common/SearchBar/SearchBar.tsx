import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export interface SearchBarProps {
  onChange: (search: string) => void;
  placeholder: string;
}

export default function SearchBar({ onChange, placeholder }: SearchBarProps) {
  return (
    <div className="w-full h-full flex items-center border rounded-lg border-cinebhpale shadow-md shadow-cinebhshadow">
      <span>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-cinebhlightgray ml-3 mr-1"
        />
      </span>
      <input
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full rounded-lg py-3 px-1 focus:outline-none text-cinebhlightgray placeholder-cinebhlightgray"
        placeholder={placeholder}
      />
    </div>
  );
}
