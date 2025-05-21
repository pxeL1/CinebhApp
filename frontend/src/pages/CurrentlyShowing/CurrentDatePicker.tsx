import moment, { Moment } from "moment";
import DatePicker, {
  DatePickerSize,
} from "components/common/DatePicker/DatePicker";

export interface CurrentDatePickerProps {
  onDateChange: (date: Moment) => void;
}

export default function CurrentDatePicker({
  onDateChange,
}: CurrentDatePickerProps) {
  const startDate = moment();

  return (
    <div>
      <div className="w-full h-full flex gap-4">
        <DatePicker
          startDate={startDate}
          numberOfDays={10}
          onDateChange={onDateChange}
          size={DatePickerSize.REGULAR}
        />
      </div>
      <div className="mt-5 text-cinebhlightgray text-sm italic">
        Quick reminder that our cinema schedule is on a ten-day update cycle.
      </div>
    </div>
  );
}
