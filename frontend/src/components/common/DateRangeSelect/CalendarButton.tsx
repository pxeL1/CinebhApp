import { PropsWithChildren, useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

export default interface CalendarButtonProps {
  isDisabled?: undefined | boolean;
}

export function CalendarButton(props: PropsWithChildren<CalendarButtonProps>) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`p-2 rounded-full ${props.isDisabled ? "text-cinebhash" : "text-cinebhdarkgray"} ${
        !props.isDisabled
          ? "hover:bg-cinebhrosered active:bg-cinebhlightred"
          : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-offset-2 ring-cinebhdarkred" : ""
      }`}
    >
      {props.children}
    </button>
  );
}
