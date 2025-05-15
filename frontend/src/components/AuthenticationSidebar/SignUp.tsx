import { useState } from "react";
import Button, { ButtonType } from "components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "components/common/Input/Input";

export interface SignUpProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  error: boolean;
  handleSubmit: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => void;
}

export default function SignUp({
                                 isLogin,
                                 setIsLogin,
                                 handleSubmit,
                                 error,
                               }: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
    <>
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
    </>
  );
}
