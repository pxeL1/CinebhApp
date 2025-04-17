import { PropsWithChildren } from "react";
export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: ButtonType;
}

export enum ButtonType {
  PRIMARY,
  SECONDARY,
}

const buttonVariant: Record<ButtonType, string> = {
  [ButtonType.PRIMARY]:
    "w-28 h-12 rounded-lg bg-cinebhdarkred text-cinebhneutral cursor-pointer hover:bg-cinebhlightred flex justify-center items-center",
  [ButtonType.SECONDARY]:
    "flex items-center justify-center h-12 w-12 bg-white border border-cinebhpale rounded-lg hover:bg-cinebhpale disabled:text-cinebhpale disabled:hover:bg-white",
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
