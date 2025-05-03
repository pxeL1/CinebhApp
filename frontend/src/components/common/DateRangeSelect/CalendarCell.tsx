import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import {
  isSameDay,
  getDayOfWeek,
  isSameMonth,
  CalendarDate,
} from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { RangeCalendarState } from "@react-stately/calendar";

export interface CalendarCellProps {
  state: RangeCalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}

export function CalendarCell({ state, date, currentMonth }: CalendarCellProps) {
  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  const isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`py-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`w-full h-full outline-none group ${
          isRoundedLeft ? "rounded-l-full" : ""
        } ${isRoundedRight ? "rounded-r-full" : ""} ${
          isSelected ? "bg-cinebhrosered" : ""
        } ${isDisabled ? "disabled" : ""} ${isOutsideMonth ? "text-cinebhash" : ""}`}
      >
        <div
          className={`w-full h-full p-3 rounded-full flex items-center justify-center text-xs ${
            isDisabled ? "text-cinebhash" : ""
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? "ring-2 group-focus:z-2 ring-cinebhdarkred ring-offset-2"
              : ""
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? "bg-cinebhdarkred text-cinebhneutral hover:bg-cinebhdarkred"
              : ""
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !(isSelectionStart || isSelectionEnd)
              ? "hover:bg-cinebhdarkred hover:text-cinebhneutral"
              : ""
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled
              ? "hover:bg-cinebhdarkred hover:text-cinebhneutral"
              : ""
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
