import { ChangeEvent, HTMLProps, ReactNode, useState } from "react";
import classNames from "classnames";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
  dark: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

function PasswordInput({
  icon,
  label,
  dark,
  onChange,
  error,
  placeholder,
  ...rest
}: InputProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="h-full w-full flex flex-col gap-1.5">
      <label
        className={classNames(
          "font-semibold",
          { "text-cinebhneutral": dark && !error },
          { "text-cinebhdark": !dark && !error },
          { "text-cinebherrorlight": error },
        )}
      >
        {label}
      </label>
      <div
        className={classNames(
          "w-full h-full flex bg-cinebhneutral rounded-lg px-3 border",
          { "border-cinebhpale": !error },
          { "border-cinebherrordark": error },
        )}
      >
        <span
          className={classNames(
            "flex items-center mr-1.5",
            { "text-cinebhdark": !error },
            { "text-cinebherrordark": error },
          )}
        >
          {icon}
        </span>
        <input
          type={isShown ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
          className={classNames(
            "w-full h-full py-3 focus:outline-none",
            {
              "text-cinebhlightgray placeholder-cinebhlightgray": !error,
            },
            { "text-cinebherrordark placeholder-cinebherrordark": error },
          )}
        />
        <span>
          <button
            onClick={() => setIsShown(!isShown)}
            className={classNames(
              "h-full flex items-center cursor-pointer",
              { "text-cinebhdark hover:text-cinebhlightgray": !error },
              {
                "text-cinebherrordark hover:text-cinebherrorlight": error,
              },
            )}
          >
            <FontAwesomeIcon icon={isShown ? faEye : faEyeSlash} />
          </button>
        </span>
      </div>
    </div>
  );
}

export default function Input({
  icon,
  label,
  dark,
  onChange,
  error,
  type,
  placeholder,
  ...rest
}: InputProps) {
  if (type === "password") {
    return (
      <PasswordInput
        icon={icon}
        dark={dark}
        onChange={onChange}
        label={label}
        error={error}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  return (
    <div className="h-full w-full flex flex-col gap-1.5">
      <label
        className={classNames(
          "font-semibold",
          { "text-cinebhneutral": dark && !error },
          { "text-cinebhdark": !dark && !error },
          { "text-cinebherrorlight": error },
        )}
      >
        {label}
      </label>
      <div
        className={classNames(
          "w-full h-full flex bg-cinebhneutral rounded-lg px-3 border",
          { "border-cinebhpale": !error },
          { "border-cinebherrordark": error },
        )}
      >
        <span
          className={classNames(
            "flex items-center mr-1.5",
            { "text-cinebhdark": !error },
            { "text-cinebherrordark": error },
          )}
        >
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
          className={classNames(
            "w-full h-full py-3 focus:outline-none",
            {
              "text-cinebhlightgray placeholder-cinebhlightgray": !error,
            },
            { "text-cinebherrordark placeholder-cinebherrordark": error },
          )}
        />
      </div>
    </div>
  );
}
