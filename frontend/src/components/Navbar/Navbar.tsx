import logo from "assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationSIdebar from "components/AuthenticationSidebar/AuthenticationSidebar";
import { useContext, useState } from "react";
import { UserContext } from "contexts/UserContext/UserContext";
import { User } from "models/User";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonType } from "components/common/Button/Button";
import get from "services/fetching/Get";
import { getLogoutRequest } from "services/fetching/API";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    try {
      get(getLogoutRequest()).then(() => {
        setIsOpen(false);
        userContext.setUser(undefined);
        localStorage.removeItem("expiration");
        localStorage.removeItem("user");
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="w-full py-6 border-b border-cinebhlightgray bg-cinebhdarkgray flex items-center justify-between text-white">
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
          <Link to="/" className="no-underline mr-6 hover:text-cinebhdarkred invisible">
            Venues
          </Link>
        </div>
        {userContext?.user ? (
          <UserMenu user={userContext.user} handleLogout={handleLogout} />
        ) : (
          <button
            className="mr-24 px-5 py-3 bg-transparent border rounded-lg text-cinebhneutral hover:text-cinebhdarkred cursor-pointer font-semibold"
            onClick={() => setIsOpen(true)}
          >
            Sign In
          </button>
        )}
      </div>
      <AuthenticationSIdebar isOpen={isOpen} setIsOpen={setIsOpen} />
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
          "z-10 flex max-h-0 border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex-col p-0",
          { "flex max-h-60 border p-2": isOpen },
        )}
      >
        <Button variant={ButtonType.PRIMARY} onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}
