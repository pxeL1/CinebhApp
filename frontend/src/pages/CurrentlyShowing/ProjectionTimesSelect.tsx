import TimeRangeSelect from "components/common/TimeRangeSelect/TimeRangeSelect";
import { JSX } from "react";

export interface ProjectionTimesSelectProps {
  icon?: JSX.Element;
  selectedFromTime: string | undefined;
  selectedToTime: string | undefined;
  onFromTimeChange: (fromTime: string) => void;
  onToTimeChange: (toTime: string) => void;
}

export default function ProjectionTimesSelect({
  icon,
  selectedFromTime,
  onFromTimeChange,
  selectedToTime,
  onToTimeChange,
}: ProjectionTimesSelectProps) {
  const fromTime = selectedFromTime ?? "";
  const toTime = selectedToTime ?? "";
  const selected =
    selectedFromTime !== undefined || selectedToTime !== undefined
      ? fromTime + " - " + toTime
      : undefined;

  return (
    <div className="w-full h-full">
      <TimeRangeSelect
        icon={icon}
        placeholder={"All Projection Times"}
        selected={selected}
        fromTime={selectedFromTime}
        toTime={selectedToTime}
        onFromTimeChange={onFromTimeChange}
        onToTimeChange={onToTimeChange}
      />
    </div>
  );
}
