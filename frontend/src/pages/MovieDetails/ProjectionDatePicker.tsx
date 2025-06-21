import { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import Button, { ButtonType } from "components/common/Button/Button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker, {
  DatePickerSize,
} from "components/common/DatePicker/DatePicker";

export interface ProjectionDatePickerProps {
  onDateChange: (date: Moment) => void;
}

export default function ProjectionDatePicker({
  onDateChange,
}: ProjectionDatePickerProps) {
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState<Moment>(
    moment().utc().startOf("day"),
  );

  useEffect(() => {
    const newStartDate = moment()
      .utc()
      .startOf("day")
      .add(7 * page, "days");
    setStartDate(newStartDate);
  }, [page]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <DatePicker
          startDate={startDate}
          numberOfDays={7}
          onDateChange={onDateChange}
          size={DatePickerSize.SMALL}
        />
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
