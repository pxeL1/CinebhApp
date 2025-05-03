import { useRef } from "react";
import { useRangeCalendarState } from "@react-stately/calendar";
import { useRangeCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { RangeValue } from "@react-types/shared";
import { CalendarDate, createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { DateValue } from "react-aria-components";

export interface RangeCalendarProps {
  minValue: CalendarDate;
  defaultValue: RangeValue<DateValue>;
  onChange: (value: RangeValue<DateValue>) => void;
}

export function RangeCalendar(props: RangeCalendarProps) {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    ref,
  );

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="inline-block text-cinebhdarkgray w-full h-full"
    >
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} weekdayStyle="short" />
      </div>
    </div>
  );
}
