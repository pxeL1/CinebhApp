import { JSX, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  Heading,
  RangeCalendar,
} from "react-aria-components";

export interface DateRangeSelectProps {
  placeholder: JSX.Element;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangeSelect({
  placeholder,
  onStartDateChange,
  onEndDateChange,
}: DateRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("--/--/----");
  const [endDate, setEndDate] = useState("--/--/----");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  function handleSubmit() {}

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
          "z-20 max-h-0 min-w-80 w-full border-cinebhpale shadow-md shadow-cinebhshadow rounded-lg bg-cinebhneutral overflow-y-auto mt-2 absolute offset transition-all duration-500 flex flex-col p-0":
            true,
          "max-h-[471px] border p-4": isOpen,
        })}
      >
        <div className="flex gap-4 mb-4">
          <div className="w-full h-full py-2.5 px-4 border border-cinebhdust rounded-xl">
            <div className="text-xs text-cinebhlightgray">Start Date</div>
            <div className="text-cinebhdarkgray">{startDate}</div>
          </div>
          <div className="w-full h-full py-2.5 px-4 border border-cinebhdust rounded-xl">
            <div className="text-xs text-cinebhlightgray">End Date</div>
            <div className="text-cinebhdarkgray">{endDate}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <RangeCalendar
            aria-label="Movie range"
            className="w-full flex flex-col"
          >
            <header className="flex justify-between w-full text-cinebhdarkgray mb-6">
              <Button slot="previous">
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <Heading />
              <Button slot="next">
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </header>
            <CalendarGrid weekdayStyle={"short"}>
              {(date) => (
                <CalendarCell
                  date={date}
                  className="cursor-default text-xs text-center p-3 rounded-full hover:bg-cinebhdarkred hover:text-cinebhneutral"
                />
              )}
            </CalendarGrid>
          </RangeCalendar>
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
