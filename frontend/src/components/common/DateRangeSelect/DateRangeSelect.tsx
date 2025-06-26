import { JSX, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { getLocalTimeZone, today } from "@internationalized/date";
import { RangeCalendar } from "components/Calendar/RangeCalendar";
import { DateValue } from "react-aria-components";
import moment from "moment";

export interface DateRangeSelectProps {
  icon?: JSX.Element;
  placeholder: string;
  selected?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  shadow?: boolean;
}

export default function DateRangeSelect({
  icon,
  placeholder,
  selected,
  onStartDateChange,
  onEndDateChange,
  shadow,
}: DateRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()) as DateValue,
    end: today(getLocalTimeZone()) as DateValue,
  });

  function handleSubmit() {
    onStartDateChange(
      moment(value.start.toDate("UTC").toString()).startOf("day").toISOString(),
    );
    onEndDateChange(
      moment(value.end.toDate("UTC").toString()).startOf("day").toISOString(),
    );
  }

  return (
    <div className="w-full h-full relative">
      <div
        className={classNames(
          "w-full h-full py-3 border flex items-center rounded-lg hover:bg-cinebhpale cursor-pointer",
          {
            "border-cinebhdarkred shadow-cinebhlightred text-cinebhdarkred":
              isOpen,
          },
          {
            "border-cinebhpale shadow-cinebhshadow text-cinebhlightgray":
              !isOpen,
          },
          { "shadow-md": shadow ?? true },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full h-full flex items-center text-cinebhlightgray">
          <span className="mr-2 ml-3">{icon}</span>
          {selected !== undefined ? selected : placeholder}
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
          "z-20 max-h-0 min-w-80 max-w-80 w-full border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex flex-col p-0",
          { "max-h-132 border p-4": isOpen },
        )}
      >
        <div className="flex gap-4 mb-4">
          <div className="w-full h-full py-2.5 px-4 border border-cinebhdust rounded-xl">
            <div className="text-xs text-cinebhlightgray">Start Date</div>
            <div className="text-cinebhdarkgray">{value.start.toString()}</div>
          </div>
          <div className="w-full h-full py-2.5 px-4 border border-cinebhdust rounded-xl">
            <div className="text-xs text-cinebhlightgray">End Date</div>
            <div className="text-cinebhdarkgray">{value.end.toString()}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <RangeCalendar
            minValue={today(getLocalTimeZone())}
            defaultValue={value}
            onChange={setValue}
          />
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            className="text-cinebhdarkred border border-cinebhdarkred py-2 px-4 rounded-lg text-xs cursor-pointer hover:bg-cinebhpale"
            onClick={() => setIsOpen(!isOpen)}
          >
            Cancel
          </button>
          <button
            className="text-cinebhneutral border bg-cinebhdarkred py-2 px-4 rounded-lg text-xs cursor-pointer hover:bg-cinebhlightred"
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
