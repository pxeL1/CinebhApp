import moment, { Moment } from "moment";
import { PropsWithChildren, useState } from "react";

export interface DatePickerProps {
  onDateChange: (date: Moment) => void;
}

export interface DateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DateButton({
  onClick,
  disabled,
  children,
}: PropsWithChildren<DateButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-full flex flex-col py-4 items-center justify-center border rounded-lg border-cinebhpale shadow-md shadow-cinebhshadow text-cinebhdarkgray bg-cinebhneutral  disabled:text-cinebhneutral disabled:bg-cinebhdarkred cursor-pointer hover:bg-cinebhpale"
    >
      {children}
    </button>
  );
}

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const displayDates: Array<Moment> = [];

  for (let i = 0; i < 10; i++) {
    displayDates.push(moment().utc().add(i, "days"));
  }

  function handleClick(index: number) {
    setDateIndex(index);
    onDateChange(displayDates[index].utc().startOf("day"));
  }

  return (
    <div>
      <div className="w-full h-full flex gap-4">
        {displayDates.map((displayDate, index) => (
          <DateButton
            onClick={() => handleClick(index)}
            disabled={index === dateIndex}
            key={index}
          >
            <div className="font-semibold flex gap-1 mb-2">
              <div>{monthNames[displayDate.month()]}</div>
              <div>{displayDate.date()}</div>
            </div>
            <div>{index === 0 ? "Today" : dayNames[displayDate.day()]}</div>
          </DateButton>
        ))}
      </div>
      <div className="mt-5 text-cinebhlightgray text-sm italic">
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </div>
    </div>
  );
}
