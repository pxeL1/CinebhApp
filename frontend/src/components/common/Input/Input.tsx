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

function PasswordInput(props: InputProps) {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className="h-full w-full flex flex-col gap-1.5">
      <label className={classNames(
        "font-semibold",
        {"text-cinebhneutral": props.dark && !props.error},
        {"text-cinebhdark": !props.dark && !props.error},
        {"text-cinebherrorlight": props.error}
      )
      }>{props.label}</label>
      <div className={classNames(
        "w-full h-full flex bg-cinebhneutral rounded-lg px-3 border",
        {"border-cinebhpale": !props.error},
        {"border-cinebherrordark": props.error}
      )}>
        <span className={classNames(
          "flex items-center mr-1.5",
          {"text-cinebhdark": !props.error},
          {"text-cinebherrordark": props.error}
        )}>
          {props.icon}
        </span>
        <input type={isShowed ? "text" : "password"} placeholder={props.placeholder} onChange={props.onChange}
               className={classNames(
                 "w-full h-full py-3 focus:outline-none",
                 {"text-cinebhlightgray placeholder-cinebhlightgray": !props.error},
                 {"text-cinebherrordark placeholder-cinebherrordark": props.error}
               )}/>
        <span>
          <button onClick={() => setIsShowed(!isShowed)}
                  className={classNames(
                    "h-full flex items-center cursor-pointer",
                    {"text-cinebhdark hover:text-cinebhlightgray": !props.error},
                    {"text-cinebherrordark hover:text-cinebherrorlight": props.error}
                  )}>
            {isShowed ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </button>
        </span>
      </div>
    </div>
  );
}

export default function Input(props: InputProps) {

  if(props.type === "password") {
    return (
      <PasswordInput {...props}/>
    );
  }

  return (
    <div className="h-full w-full flex flex-col gap-1.5">
      <label className={classNames(
        "font-semibold",
        {"text-cinebhneutral": props.dark && !props.error},
        {"text-cinebhdark": !props.dark && !props.error},
        {"text-cinebherrorlight": props.error}
      )
      }>{props.label}</label>
      <div className={classNames(
        "w-full h-full flex bg-cinebhneutral rounded-lg px-3 border",
        {"border-cinebhpale": !props.error},
        {"border-cinebherrordark": props.error}
      )}>
        <span className={classNames(
          "flex items-center mr-1.5",
          {"text-cinebhdark": !props.error},
          {"text-cinebherrordark": props.error}
        )}>
          {props.icon}
        </span>
        <input type={props.type} placeholder={props.placeholder} onChange={props.onChange}
               className={classNames(
                 "w-full h-full py-3 focus:outline-none",
                 {"text-cinebhlightgray placeholder-cinebhlightgray": !props.error},
                 {"text-cinebherrordark placeholder-cinebherrordark": props.error}
               )}/>
      </div>
    </div>
  );
}
