import { PropsWithChildren, useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import classNames from "classnames";

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
      className={classNames(
        "p-2 rounded-full outline-none",
        { "text-cinebhash": props.isDisabled },
        {
          "text-cinebhdarkgray hover:bg-cinebhrosered active:bg-cinebhlightred":
            !props.isDisabled,
        },
        { "ring-2 ring-offset-2 ring-cinebhdarkred": isFocusVisible },
      )}
    >
      {props.children}
    </button>
  );
}
