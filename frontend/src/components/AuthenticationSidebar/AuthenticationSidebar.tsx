import { useContext, useEffect, useState } from "react";
import logo from "assets/images/Logo.png";
import Button, { ButtonType } from "components/common/Button/Button";
import {
  faArrowLeft,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "components/common/Sidebar/Sidebar";
import Input from "components/common/Input/Input";
import cameraImg from "assets/images/Group 26.png";
import filmImg from "assets/images/Group 25.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "contexts/UserContext/UserContext";
import post from "services/fetching/Post";
import { getLoginRequest, getRegisterRequest } from "services/fetching/API";
import { AuthResponse } from "models/AuthResponse";
import SignIn from "components/AuthenticationSidebar/SignIn";
import SignUp from "components/AuthenticationSidebar/SignUp";

export interface AuthenticationSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function AuthenticationSidebar({
  isOpen,
  setIsOpen,
}: AuthenticationSidebarProps) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const header = isLogin ? "Welcome back" : "Hello";

  useEffect(() => {
    if (!userContext.user) {
      setSuccessfulLogin(false);
      setSuccessfulRegister(false);
    }
  }, [userContext.user]);

  function handleSignIn(email: string, password: string, rememberMe: boolean) {
    const loginRequest = { email, password, rememberMe };

    post<AuthResponse>(getLoginRequest(), loginRequest)
      .then((data) => {
        userContext.setUser(data.user);
        localStorage.setItem("expiration", data.expiration);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccessfulLogin(true);
        setTimeout(() => {
          setIsOpen(false);
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }

  function handleSignUp(email: string, password: string, rememberMe: boolean) {
    const role = "USER";
    const registerRequest = { email, password, role, rememberMe };

    post<AuthResponse>(getRegisterRequest(), registerRequest)
      .then((data) => {
        userContext.setUser(data.user);
        localStorage.setItem("expiration", data.expiration);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccessfulRegister(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  if (successfulLogin) {
    return (
      <Sidebar isOpen={isOpen}>
        <SuccessfulSignIn isOpen={isOpen} setIsOpen={setIsOpen} />
      </Sidebar>
    );
  }

  if (successfulRegister) {
    return (
      <Sidebar isOpen={isOpen}>
        <SuccessfulSignUp isOpen={isOpen} setIsOpen={setIsOpen} />
      </Sidebar>
    );
  }

  return (
    <Sidebar isOpen={isOpen}>
      <div className="w-full h-full flex flex-col p-16 bg-cinebhdarkgray items-center max-w-132">
        <img src={logo} alt="Logo" className="w-1/3 mt-4 mb-8" />
        <div className="min-h-10 w-full flex">
          <div className="min-w-9 flex justify-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant={ButtonType.TERTIARY}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </div>
          <div className="font-bold text-cinebhdust w-full h-full flex justify-center items-center text-3xl -translate-x-4">
            {header}
          </div>
        </div>
        {isLogin ? (
          <SignIn
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            error={error}
            handleSubmit={handleSignIn}
          />
        ) : (
          <SignUp
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            error={error}
            handleSubmit={handleSignUp}
          />
        )}
        <div className="w-full flex justify-center items-center text-cinebhneutral my-8">
          <div className="border-b border-cinebhneutral w-full h-0"></div>
          <span className="mx-4">or</span>
          <div className="border-b border-cinebhneutral w-full h-0"></div>
        </div>
        <button
          className="text-cinebhneutral underline decoration-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Continue without Signing In
        </button>
      </div>
    </Sidebar>
  );
}

function SuccessfulSignIn({ isOpen, setIsOpen }: AuthenticationSidebarProps) {
  return (
    <div className="w-full h-full flex flex-col p-16 bg-cinebhdarkgray items-center max-w-132">
      <img src={logo} alt="Logo" className="w-1/3 mt-4 mb-8" />
      <div className="min-h-10 w-full flex">
        <div className="min-w-9 mr-20">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonType.TERTIARY}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </div>
        <div className="font-bold text-cinebhdust w-full h-full flex items-center text-xl">
          Sign In Successful! 🎉
        </div>
      </div>
      <div className="text-sm text-cinebhash mt-6 text-center mb-20">
        Please, wait. You will be directed to the <br />
        homepage.
      </div>
      <img src={cameraImg} alt="Camera" />
    </div>
  );
}

function SuccessfulSignUp({ isOpen, setIsOpen }: AuthenticationSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col p-16 bg-cinebhdarkgray items-center max-w-132">
      <img src={logo} alt="Logo" className="w-1/3 mt-4 mb-8" />
      <div className="min-h-10 w-full flex">
        <div className="min-w-9 mr-28">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonType.TERTIARY}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </div>
        <div className="font-bold text-cinebhdust w-full h-full flex items-center text-xl">
          You’re all set! 🎉
        </div>
      </div>
      <div className="text-sm text-cinebhash mt-6 text-center mb-20">
        Start exploring latest movies, venues, <br />
        and ticket options!
      </div>
      <img src={filmImg} alt="Film" />
      <div className="w-full mt-20">
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            navigate("/currently");
          }}
          variant={ButtonType.PRIMARY}
        >
          See Movies
        </Button>
      </div>
    </div>
  );
}
