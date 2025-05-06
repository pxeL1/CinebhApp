import DateRangeSelect from "components/common/DateRangeSelect/DateRangeSelect";
import { JSX } from "react";

export interface UpcomingDateRangeSelectProps {
  icon?: JSX.Element;
  selectedStartDate: string | undefined;
  selectedEndDate: string | undefined;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
}

export default function UpcomingDateRangeSelect({
  icon,
  selectedStartDate,
  selectedEndDate,
  onStartDateChange,
  onEndDateChange,
}: UpcomingDateRangeSelectProps) {
  const startDate = selectedStartDate?.substring(0, 10);
  const endDate = selectedEndDate?.substring(0, 10);
  const selected =
    selectedEndDate !== undefined ? startDate + " - " + endDate : undefined;

  return (
    <div className="w-full h-full">
      <DateRangeSelect
        icon={icon}
        placeholder={"Date Range"}
        selected={selected}
        onEndDateChange={onEndDateChange}
        onStartDateChange={onStartDateChange}
      />
    </div>
  );
}
