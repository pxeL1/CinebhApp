import DateButton from "pages/CurrentlyShowing/DateButton";
import moment, { Moment } from "moment";
import { JSX, useState } from "react";

export interface DatePickerProps {
  onDateChange: (date: Moment) => void;
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

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const buttons: Array<JSX.Element> = [];
  const displayDates: Array<Moment> = [];

  for (let i = 0; i < 10; i++) {
    displayDates.push(moment().utc().add(i, "days"));
  }

  function handleClick(index: number) {
    setDateIndex(index);
    onDateChange(displayDates[index].utc().startOf('day'));
  }

  displayDates.map((displayDate, index) => {
    buttons.push(
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
      </DateButton>,
    );
  });

  return (
    <div>
      <div className="w-full h-20 flex gap-4">{buttons}</div>
      <div className="mt-5 text-cinebhlightgray text-sm italic">
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </div>
    </div>
  );
}
