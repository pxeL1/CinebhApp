import { JSX, useState } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface SelectProps {
  placeholder: JSX.Element;
  items: Array<string>;
  onItemChange: (item: string) => void;
}

export default function Select({
  placeholder,
  items,
  onItemChange,
}: SelectProps) {
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
          "z-20 max-h-0 w-full border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex flex-col p-0":
            true,
          "max-h-60 border p-2": isOpen,
        })}
      >
        {items.map((item, index) => (
          <div
            className={classNames({
              "flex p-4 text-xs hover:bg-cinebhpale cursor-pointer text-cinebhlightgray py-2 rounded-lg max-h-8":
                true,
            })}
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
