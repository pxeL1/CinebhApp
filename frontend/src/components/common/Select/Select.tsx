import { JSX, useState } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface SelectProps {
  icon?: JSX.Element;
  placeholder: string;
  selected?: string;
  items: Array<string>;
  onItemChange: (item: string) => void;
}

export default function Select({
  icon,
  placeholder,
  selected,
  items,
  onItemChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full relative">
      <div
        className={classNames(
          "w-full h-full py-3 border flex items-center rounded-lg shadow-md hover:bg-cinebhpale cursor-pointer",
          {
            "border-cinebhdarkred shadow-cinebhlightred text-cinebhdarkred":
              isOpen,
          },
          {
            "border-cinebhpale shadow-cinebhshadow text-cinebhlightgray":
              !isOpen,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full h-full flex items-center text-cinebhlightgray">
          <span className="mr-2 ml-3">{icon}</span>
          {selected ?? placeholder}
        </div>
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
        className={classNames(
          "z-20 w-full flex max-h-0 border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex-col p-0",
          { "flex max-h-60 border p-2": isOpen },
        )}
      >
        {items.map((item, index) => (
          <div
            className="flex p-4 text-xs hover:bg-cinebhpale cursor-pointer text-cinebhlightgray py-2 rounded-lg max-h-8"
            onClick={() => {
              setIsOpen(!isOpen);
              onItemChange(item);
            }}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
