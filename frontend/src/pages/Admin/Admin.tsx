import AdminSidebar from "pages/Admin/AdminSidebar";
import { useState } from "react";

type MovieType = "DRAFTS" | "CURRENT" | "UPCOMING" | "ARCHIVED";

export default function Admin() {
  const [movieType, setMovieType] = useState<MovieType>("DRAFTS");
  const movieCount = new Map<string, number>([
    ["DRAFTS", 0],
    ["CURRENT", 0],
    ["UPCOMING", 0],
    ["ARCHIVED", 0],
  ]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-8">
        <div className="font-bold text-xl text-cinebhdarkgray mb-4">Movies</div>

      </div>
    </div>
  )
}

interface FilterBarProps {
  selectedMovieType: MovieType;
  onMovieTypeSelect(movieType: MovieType): void;
  moviesCount: Map<string, number>;
}

function FilterBar() {
  return (
    <div>

    </div>
  )
}
