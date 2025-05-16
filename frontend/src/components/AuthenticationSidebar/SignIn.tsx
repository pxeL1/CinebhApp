import { useState } from "react";
import Button, { ButtonType } from "components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "components/common/Input/Input";

export interface SignInProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  error: boolean;
  handleSubmit: (email: string, password: string, rememberMe: boolean) => void;
}

export default function SignIn({
  isLogin,
  setIsLogin,
  error,
  handleSubmit,
}: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
      <div className="w-full max-h-12 mt-8 flex">
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
    </>
  );
}
