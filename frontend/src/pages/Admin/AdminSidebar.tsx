import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-full w-1/5 bg-cinebhdarkgray p-8 border-r border-cinebhpale">
      <div className="text-2xl mb-10 font-bold text-cinebhneutral">Admin</div>
      <div className="border-b border-cinebhlightgray w-full mb-7"></div>
      <button className="flex items-center gap-2 text-cinebhdust hover:text-cinebhneutral disabled:text-cinebhneutral disabled:font-semibold disabled:underline"
      disabled={location.pathname === "/admin/movie"}
      onClick={() => navigate("/admin/movie")}>
        <span><FontAwesomeIcon icon={faFilm} /></span>
        <div>
          Movies
        </div>
      </button>
    </div>
  )
}
