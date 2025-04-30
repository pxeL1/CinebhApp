import { JSX, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export interface TimeRangeSelectProps {
  placeholder: JSX.Element;
  onFromTimeChange: (time: string) => void;
  onToTimeChange: (time: string) => void;
}

export default function TimeRangeSelect({
  placeholder,
  onFromTimeChange,
  onToTimeChange,
}: TimeRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full relative">
      <div
        className={classNames({
          "w-full h-full py-3 border flex items-center rounded-lg border-cinebhpale shadow-md shadow-cinebhshadow hover:bg-cinebhpale cursor-pointer text-cinebhlightgray":
            !isOpen,
          "w-full h-full py-3 border flex items-center rounded-lg border-cinebhdarkred shadow-md shadow-cinebhlightred hover:bg-cinebhpale cursor-pointer text-cinebhdarkred":
            isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {placeholder}
        <span className="mr-3">
          <FontAwesomeIcon
            icon={faChevronUp}
            className={classNames({
              "rotate-180": !isOpen,
              "transition-all duration-300": true,
            })}
          />
        </span>
      </div>
      <div
        className={classNames({
          "z-10 max-h-0 w-full border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex flex-col":
            true,
          "max-h-60 border p-4": isOpen,
        })}
      >
        <div className="flex gap-4">
          <div className="rounded-xl border border-cinebhash w-full h-full flex flex-col p-2">
            <div className="text-xs text-cinebhlightgray">From:</div>
            <input
              type="time"
              className="flex justify-center"
              onChange={(e) => onFromTimeChange(e.target.value)}
            />
          </div>
          <div className="rounded-xl border border-cinebhash w-full h-full flex flex-col p-2">
            <div className="text-xs text-cinebhlightgray">To:</div>
            <input
              type="time"
              className="flex justify-center"
              onChange={(e) => onToTimeChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
