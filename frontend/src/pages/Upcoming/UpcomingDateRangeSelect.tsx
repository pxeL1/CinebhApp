import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DateRangeSelect from "components/common/DateRangeSelect/DateRangeSelect";

export interface UpcomingDateRangeSelectProps {
  selectedStartDate: string;
  selectedEndDate: string;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
}

export default function UpcomingDateRangeSelect({
  selectedStartDate,
  selectedEndDate,
  onStartDateChange,
  onEndDateChange,
}: UpcomingDateRangeSelectProps) {
  const startDate = selectedStartDate.substring(0, 10);
  const endDate = selectedEndDate.substring(0, 10);

  const datePlaceholder = (
    <div className="w-full h-full flex items-center text-cinebhlightgray">
      <span className="mr-2 ml-3">
        <FontAwesomeIcon icon={faCalendarDays} />
      </span>
      {selectedStartDate.length !== 0
        ? startDate + " - " + endDate
        : "Date Range"}
    </div>
  );
  return (
    <div className="w-full h-full">
      <DateRangeSelect
        placeholder={datePlaceholder}
        onEndDateChange={onEndDateChange}
        onStartDateChange={onStartDateChange}
      />
    </div>
  );
}
