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

  return (
    <div className="w-full h-full">
      <TimeRangeSelect
        icon={icon}
        placeholder={"All Projection Times"}
        selectedFromTime={selectedFromTime}
        selectedToTime={selectedToTime}
        onFromTimeChange={onFromTimeChange}
        onToTimeChange={onToTimeChange}
      />
    </div>
  );
}
