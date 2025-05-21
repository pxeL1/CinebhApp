import moment, { Moment } from "moment";
import { PropsWithChildren, useEffect, useState } from "react";
import classNames from "classnames";
import { dayNames, monthNames } from "utility/time-utils";
import { isToday } from "utility/time-utils";

export enum DatePickerSize {
  REGULAR,
  SMALL,
}

export interface DatePickerProps {
  startDate: Moment;
  numberOfDays: number;
  onDateChange: (date: Moment) => void;
  size: DatePickerSize;
}

export default function DatePicker({
  startDate,
  numberOfDays,
  onDateChange,
  size,
}: DatePickerProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const [displayDates, setDisplayDates] = useState<Array<Moment>>([]);

  useEffect(() => {
    const newDisplayDates = [];

    for (let i = 0; i < numberOfDays; i++) {
      newDisplayDates.push(moment(startDate).utc().add(i, "days"));
    }

    setDisplayDates(newDisplayDates);
  }, [startDate, numberOfDays]);

  function handleClick(index: number) {
    setDateIndex(index);
    onDateChange(displayDates[index].utc().startOf("day"));
  }
  return (
    <>
      {displayDates.map((date, index) => {
        const today = isToday(date);

        return (
          <DateButton
            onClick={() => handleClick(index)}
            disabled={index === dateIndex}
            key={index}
            size={size}
          >
            <div
              className={classNames(
                "flex gap-1 mb-2",
                { "font-semibold": size === DatePickerSize.REGULAR },
                { "font-bold text-xl": size === DatePickerSize.SMALL },
              )}
            >
              <div>{monthNames[date.month()]}</div>
              <div>{date.date()}</div>
            </div>
            <div>{today ? "Today" : dayNames[date.day()]}</div>
          </DateButton>
        );
      })}
    </>
  );
}

interface DateButtonProps {
  onClick: () => void;
  disabled: boolean;
  size: DatePickerSize;
}

function DateButton({
  onClick,
  disabled,
  size,
  children,
}: PropsWithChildren<DateButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex flex-col items-center justify-center border rounded-lg border-cinebhpale text-cinebhdarkgray bg-cinebhneutral  disabled:text-cinebhneutral disabled:bg-cinebhdarkred cursor-pointer hover:bg-cinebhpale",
        {
          "w-full h-full py-4 shadow-md shadow-cinebhshadow":
            size === DatePickerSize.REGULAR,
        },
        { "min-w-20 p-2 ": size === DatePickerSize.SMALL },
      )}
    >
      {children}
    </button>
  );
}
