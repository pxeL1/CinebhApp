import { PropsWithChildren } from "react";
export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: ButtonType;
}

export enum ButtonType {
  PRIMARY,
  SECONDARY,
  TERTIARY
}

const buttonVariant: Record<ButtonType, string> = {
  [ButtonType.PRIMARY]:
    "w-full h-full rounded-lg bg-cinebhdarkred text-cinebhneutral cursor-pointer hover:bg-cinebhlightred flex justify-center items-center py-3 px-5",
  [ButtonType.SECONDARY]:
    "flex items-center justify-center h-full w-full bg-white border border-cinebhpale rounded-lg hover:bg-cinebhpale disabled:text-cinebhpale disabled:hover:bg-white p-4",
  [ButtonType.TERTIARY]:
    "flex items-center justify-center h-full w-full bg-cinebhdark text-cinebhpale p-2 rounded cursor-pointer hover:bg-cinebhash"
};

export default function Button({
  onClick,
  disabled,
  variant,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={buttonVariant[variant]}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
