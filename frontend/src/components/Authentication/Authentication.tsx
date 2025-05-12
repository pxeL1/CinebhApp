import { useContext, useState } from "react";
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
import { UserContext } from "contexts/UserContext";
import post from "services/fetching/Post";
import { getLoginRequest, getRegisterRequest } from "services/fetching/API";
import { AuthResponse } from "models/AuthResponse";

export interface AuthenticationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Authentication({
  isOpen,
  setIsOpen,
}: AuthenticationProps) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);

  function handleSignIn(
    email: string | undefined,
    password: string | undefined,
    rememberMe: boolean,
  ) {
    if (!email || !password) {
      return;
    }

    const loginRequest = { email, password, rememberMe };

    post<AuthResponse>(getLoginRequest(), loginRequest)
      .then((data) => {
        userContext?.setUser(data.user);
        localStorage.setItem("expiration", data.expiration);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccessfulLogin(true);
        setTimeout(() => {
          setIsOpen(false);
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  function handleSignUp(
    email: string | undefined,
    password: string | undefined,
    rememberMe: boolean,
  ) {
    if (!email || !password) {
      return;
    }

    const role = "USER";
    const registerRequest = { email, password, role, rememberMe };

    post<AuthResponse>(getRegisterRequest(), registerRequest)
      .then((data) => {
        userContext?.setUser(data.user);
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
      {isLogin ? (
        <SignIn
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          error={error}
          handleSubmit={handleSignIn}
        />
      ) : (
        <SignUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          error={error}
          handleSubmit={handleSignUp}
        />
      )}
    </Sidebar>
  );
}

export interface SignInSignUpProps extends AuthenticationProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  error: boolean;
  handleSubmit: (
    email: string | undefined,
    password: string | undefined,
    rememberMe: boolean,
  ) => void;
}

function SignIn({
  isOpen,
  setIsOpen,
  isLogin,
  setIsLogin,
  error,
  handleSubmit,
}: SignInSignUpProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rememberMe, setRememberMe] = useState(false);

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
        <div className="font-bold text-cinebhdust w-full h-full flex items-center text-3xl">
          Welcome Back
        </div>
      </div>
      <div className="w-full flex flex-col mt-7">
        <div className="max-h-19 mb-4">
          <Input
            error={error}
            dark={true}
            type="text"
            label="Email"
            placeholder="Email Address"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="max-h-19">
          <Input
            error={error}
            dark={true}
            type="password"
            label="Password"
            placeholder="Password"
            icon={<FontAwesomeIcon icon={faLock} />}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-cinebherrorlight text-xs mt-1">
            Email or Password that you've entered is incorrect.
          </div>
        )}
      </div>
      <div className="flex w-full mt-4 gap-2 items-center">
        <input
          id="rememberMe"
          type="checkbox"
          className="min-h-5 min-w-5 accent-cinebhdarkred cursor-pointer"
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label
          htmlFor="rememberMe"
          className="text-cinebhash cursor-pointer font-semibold"
        >
          Remember me
        </label>
      </div>
      <div className="w-full max-h-12 mt-8">
        <Button
          onClick={() => handleSubmit(email, password, rememberMe)}
          variant={ButtonType.PRIMARY}
        >
          Sign in
        </Button>
      </div>
      <div className="mt-8 flex gap-2 text-cinebhneutral">
        <div>Don’t have an account yet?</div>
        <button
          className="underline decoration-0 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          Sign up
        </button>
      </div>
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
  );
}

function SignUp({
  isOpen,
  setIsOpen,
  isLogin,
  setIsLogin,
  handleSubmit,
  error,
}: SignInSignUpProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rePassword, setRePassword] = useState<string>();
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  function handlePasswordCheck() {
    if (password !== rePassword) {
      setPasswordMatch(false);
      return;
    }

    handleSubmit(email, password, rememberMe);
  }

  return (
    <div className="w-full h-full flex flex-col p-16 bg-cinebhdarkgray items-center max-w-132">
      <img src={logo} alt="Logo" className="w-1/3 mt-4 mb-8" />
      <div className="min-h-10 w-full flex">
        <div className="min-w-9 mr-36">
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            variant={ButtonType.TERTIARY}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </div>
        <div className="font-bold text-cinebhdust w-full h-full flex items-center text-3xl">
          Hello
        </div>
      </div>
      <div className="w-full flex flex-col mt-7">
        <div className="max-h-19 mb-4">
          <Input
            error={error}
            dark={true}
            type="text"
            label="Email"
            placeholder="Email Address"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="max-h-19">
          <Input
            error={error || !passwordMatch}
            dark={true}
            type="password"
            label="Password"
            placeholder="Password"
            icon={<FontAwesomeIcon icon={faLock} />}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!passwordMatch && (
          <div className="text-cinebherrorlight text-xs mt-1">
            Passwords do not match.
          </div>
        )}
        <div className="max-h-19 mt-4">
          <Input
            error={error || !passwordMatch}
            dark={true}
            type="password"
            label="Confirm Password"
            placeholder="Retype Password"
            icon={<FontAwesomeIcon icon={faLock} />}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        {!passwordMatch && (
          <div className="text-cinebherrorlight text-xs mt-1">
            Passwords do not match.
          </div>
        )}
        {error && (
          <div className="text-cinebherrorlight text-xs mt-1">
            Account with Email already exists.
          </div>
        )}
      </div>
      <div className="flex w-full mt-4 gap-2 items-center">
        <input
          id="rememberMe"
          type="checkbox"
          className="min-h-5 min-w-5 accent-cinebhdarkred cursor-pointer"
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label
          htmlFor="rememberMe"
          className="text-cinebhash cursor-pointer font-semibold"
        >
          Remember me
        </label>
      </div>
      <div className="w-full max-h-12 mt-8">
        <Button onClick={handlePasswordCheck} variant={ButtonType.PRIMARY}>
          Sign up
        </Button>
      </div>
      <div className="mt-8 flex gap-2 text-cinebhneutral">
        <div>Already have an account?</div>
        <button
          className="underline decoration-0 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          Sign in
        </button>
      </div>
      <div className="w-full flex justify-center items-center text-cinebhneutral my-8">
        <div className="border-b border-cinebhneutral w-full h-0"></div>
        <span className="mx-4">or</span>
        <div className="border-b border-cinebhneutral w-full h-0"></div>
      </div>
      <button
        className="text-cinebhneutral underline decoration-0 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Continue without Signing Up
      </button>
    </div>
  );
}

function SuccessfulSignIn({ isOpen, setIsOpen }: AuthenticationProps) {
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

function SuccessfulSignUp({ isOpen, setIsOpen }: AuthenticationProps) {
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
