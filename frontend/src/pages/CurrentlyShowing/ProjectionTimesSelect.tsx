import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TimeRangeSelect from "components/common/TimeRangeSelect/TimeRangeSelect";

export interface ProjectionTimesSelectProps {
  selectedFromTime: string;
  selectedToTime: string;
  onFromTimeChange: (fromTime: string) => void;
  onToTimeChange: (toTime: string) => void;
}

export default function ProjectionTimesSelect({
  selectedFromTime,
  onFromTimeChange,
  selectedToTime,
  onToTimeChange,
}: ProjectionTimesSelectProps) {
  const projectionTimesPlaceholder = (
    <div className="w-full h-full flex items-center text-cinebhlightgray">
      <span className="mr-2 ml-3">
        <FontAwesomeIcon icon={faClock} />
      </span>
      {selectedFromTime.length !== 0
        ? selectedFromTime + " - " + selectedToTime
        : "All Projection Times"}
    </div>
  );

  return (
    <div className="w-full h-full">
      <TimeRangeSelect
        placeholder={projectionTimesPlaceholder}
        onFromTimeChange={onFromTimeChange}
        onToTimeChange={onToTimeChange}
      />
    </div>
  );
}
