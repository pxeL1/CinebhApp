import { useDateFormatter } from "@react-aria/i18n";
import { CalendarButton } from "components/common/DateRangeSelect/CalendarButton";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RangeCalendarState } from "@react-stately/calendar";
import { DOMAttributes } from "react";
import { FocusableElement } from "@react-types/shared";
import { AriaButtonProps } from "@react-types/button";

export interface CalendarHeaderProps {
  state: RangeCalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps;
  nextButtonProps: AriaButtonProps;
}

export function CalendarHeader({
                                 state,
                                 calendarProps,
                                 prevButtonProps,
                                 nextButtonProps,
                               }: CalendarHeaderProps) {
  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  return (
    <div className="flex items-center mb-6">
      <VisuallyHidden>
        <h2>{calendarProps.children}</h2>
      </VisuallyHidden>
      <CalendarButton {...prevButtonProps}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </CalendarButton>
      <h2
        aria-hidden
        className="flex-1 align-center text-center text-cinebhdarkgray"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.toDate(state.timeZone)
        )}
      </h2>
      <CalendarButton {...nextButtonProps}>
        <FontAwesomeIcon icon={faChevronRight} />
      </CalendarButton>
    </div>
  );
}
