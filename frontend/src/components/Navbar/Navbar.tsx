import logo from "assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/UserContext/UserContext";
import { User } from "models/User";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonType } from "components/common/Button/Button";
import get from "services/fetching/Get";
import { getLogoutRequest } from "services/fetching/API";
import { AuthSidebarContext } from "contexts/AuthSidebarContext/AuthSidebarContext";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const authSidebarContext = useContext(AuthSidebarContext);

  function handleLogout() {
    try {
      get(getLogoutRequest()).then(() => {
        userContext.setUser(undefined);
        localStorage.removeItem("expiration");
        localStorage.removeItem("user");
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignInClick() {
    const closeHandler = () => () => {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    };
    authSidebarContext.openAuthSidebar(closeHandler);
  }

  return (
    <div>
      <div className="min-w-screen w-full py-6 border-b border-cinebhlightgray bg-cinebhdarkgray flex items-center justify-between text-white">
        <Link to="/">
          <img className="h-8 w-32 ml-24" src={logo} alt="logo" />
        </Link>
        <div className="flex h-6">
          <Link
            to="/currently"
            className="no-underline mr-6 hover:text-cinebhdarkred"
          >
            Currently Showing
          </Link>
          <Link
            to="/upcoming"
            className="no-underline mr-6 hover:text-cinebhdarkred"
          >
            Upcoming Movies
          </Link>
          <Link
            to="/"
            className="no-underline mr-6 hover:text-cinebhdarkred invisible"
          >
            Venues
          </Link>
        </div>
        {userContext?.user ? (
          <UserMenu user={userContext.user} handleLogout={handleLogout} />
        ) : (
          <button
            className="mr-24 px-5 py-3 bg-transparent border rounded-lg text-cinebhneutral hover:text-cinebhdarkred cursor-pointer font-semibold"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

interface UserMenuProps {
  user: User;
  handleLogout: () => void;
}

function UserMenu({ user, handleLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const username = user.email.substring(0, user.email.indexOf("@"));
  const isAdmin =
    user.roles
      .map((userRole) => userRole.role)
      .find((role) => role.name === "ADMIN") !== undefined;
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="mr-24 px-5 py-3 bg-transparent border rounded-lg text-cinebhneutral hover:text-cinebhdarkred cursor-pointer font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {username}
        <span className="ml-2">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={classNames("transition-all duration-300", {
              "rotate-180": isOpen,
            })}
          />
        </span>
      </button>
      <div
        className={classNames(
          "z-10 flex max-h-0 border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex-col p-0 min-w-60",
          { "max-h-60 border p-2": isOpen },
        )}
      >
        {isAdmin && (
          <button
            className="py-3 px-2 text-cinebhdim hover:bg-cinebhpale rounded-lg cursor-pointer flex justify-start"
            onClick={() => navigate("/admin/movie")}
          >
            Admin
          </button>
        )}
        <button
          className="py-3 px-2 text-cinebhdarkred hover:bg-cinebhpale rounded-lg cursor-pointer flex justify-start"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
