import { JSX, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export interface MultiSelectProps {
  icon?: JSX.Element;
  placeholder: string;
  items: Array<string>;
  onItemChange: (item: Array<string>) => void;
  selectedItems: Array<string>;
}

export default function MultiSelect({
  icon,
  placeholder,
  items,
  onItemChange,
  selectedItems,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(item: string) {
    if (!selectedItems.includes(item)) {
      onItemChange([...selectedItems, item]);
    } else {
      const newItems = selectedItems.filter((newItem) => newItem !== item);
      onItemChange(newItems);
    }
  }

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
          <div className="overflow-hidden max-h-6 max-w-52">
            {selectedItems.length > 0 ? selectedItems.toString() : placeholder}
          </div>
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
          "z-20 max-h-0 w-full border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex flex-col p-0",
          { "max-h-60 border p-2": isOpen },
        )}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-lg flex items-center hover:bg-cinebhpale cursor-pointer max-h-8 py-2"
            >
              <input
                type="checkbox"
                id={`${index}`}
                className="mr-2 p-4 ml-4 cursor-pointer accent-cinebhdarkred"
                onChange={() => handleChange(item)}
              />
              <label
                htmlFor={`${index}`}
                className="text-xs text-cinebhlightgray w-full h-full flex items-center cursor-pointer"
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
