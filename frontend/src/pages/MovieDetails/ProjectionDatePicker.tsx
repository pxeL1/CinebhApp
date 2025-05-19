import { PropsWithChildren, useEffect, useState } from "react";
import { DateButtonProps } from "pages/CurrentlyShowing/DatePicker";
import moment, { Moment } from "moment";
import Button, { ButtonType } from "components/common/Button/Button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dayNames, monthNames } from "utility/time-utils";

export interface ProjectionDatePickerProps {
  onDateChange: (date: Moment) => void;
}

export default function ProjectionDatePicker({
  onDateChange,
}: ProjectionDatePickerProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const [displayDates, setDisplayDates] = useState<Array<Moment>>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const dates: Moment[] = [];
    const pageOffset = page * 7;

    for (let i = 0; i < 7; i++) {
      dates.push(
        moment()
          .utc()
          .add(i + pageOffset, "days"),
      );
    }
    setDisplayDates(dates);
  }, [page]);

  function handleClick(index: number) {
    setDateIndex(index);
    onDateChange(displayDates[index].utc().startOf("day"));
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        {displayDates.map((date, index) => (
          <ProjectionDateButton
            onClick={() => handleClick(index)}
            disabled={index === dateIndex}
          >
            <div className="font-bold text-xl flex gap-1 mb-2">
              <div>{monthNames[date.month()]}</div>
              <div>{date.date()}</div>
            </div>
            <div className="text-md">
              {index === 0 && page === 0 ? "Today" : dayNames[date.day()]}
            </div>
          </ProjectionDateButton>
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => setPage(page - 1)}
          variant={ButtonType.SECONDARY}
          disabled={page === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          variant={ButtonType.SECONDARY}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
}

function ProjectionDateButton({
  onClick,
  disabled,
  children,
}: PropsWithChildren<DateButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="min-w-20 p-2 flex flex-col items-center justify-center border rounded-lg border-cinebhpale text-cinebhdarkgray bg-cinebhneutral  disabled:text-cinebhneutral disabled:bg-cinebhdarkred cursor-pointer hover:bg-cinebhpale"
    >
      {children}
    </button>
  );
}
