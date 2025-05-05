import { useCalendarGrid } from "@react-aria/calendar";
import { getWeeksInMonth, endOfMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { CalendarCell } from "components/Calendar/CalendarCell";
import { RangeCalendarState } from "@react-stately/calendar";

export interface CalendarGridProps {
  state: RangeCalendarState;
  offset?: object;
  weekdayStyle: "narrow" | "short" | "long";
}

export function CalendarGrid({
  state,
  offset = {},
  weekdayStyle,
}: CalendarGridProps) {
  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekdayStyle,
    },
    state,
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = [...new Array(getWeeksInMonth(startDate, locale)).keys()]

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-cinebhlightgray text-xs">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeksInMonth.map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
