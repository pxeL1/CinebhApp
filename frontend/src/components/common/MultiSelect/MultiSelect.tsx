import { JSX, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export interface MultiSelectProps {
  placeholder: JSX.Element;
  items: Array<string>;
  onItemChange: (item: Array<string>) => void;
  selectedItems: Array<string>;
}

export default function MultiSelect({
  placeholder,
  items,
  onItemChange,
  selectedItems,
}: MultiSelectProps) {
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
        {items.map((item, index) => {
          function handleChange() {
            if (!selectedItems.includes(item)) {
              onItemChange([...selectedItems, item]);
            } else {
              selectedItems.splice(selectedItems.indexOf(item), 1);
              onItemChange([...selectedItems]);
            }
          }

          return (
            <div
              key={index}
              className="rounded-lg flex items-center hover:bg-cinebhpale cursor-pointer max-h-8 py-2"
            >
              <input
                type="checkbox"
                id={`${index}`}
                className="mr-2 w-4 h-4 ml-4 flex items-center cursor-pointer accent-cinebhdarkred"
                onChange={handleChange}
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
