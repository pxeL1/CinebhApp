import { PropsWithChildren } from "react";

export interface DateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function DateButton({
  onClick,
  disabled,
  children,
}: PropsWithChildren<DateButtonProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-full flex flex-col items-center justify-center border rounded-lg border-cinebhpale shadow-md shadow-cinebhshadow text-cinebhdarkgray bg-cinebhneutral  disabled:text-cinebhneutral disabled:bg-cinebhdarkred cursor-pointer hover:bg-cinebhpale"
    >
      {children}
    </button>
  );
}
