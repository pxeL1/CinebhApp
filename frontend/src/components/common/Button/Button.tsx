import { PropsWithChildren } from "react";
import { ButtonType } from "models/ButtonType";

export interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  variant: ButtonType;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const buttonVariant: Record<ButtonType, string> = {
    [ButtonType.PRIMARY]:
      "w-28 h-12 rounded-lg bg-atlantdarkred text-atlantneutral cursor-pointer hover:bg-atlantlightred flex justify-center items-center",
    [ButtonType.SECONDARY]: `flex items-center justify-center h-12 w-12 bg-white border border-atlantpale rounded-lg hover:bg-atlantpale ${!props.isActive ? "text-atlantpale hover:bg-white" : ""}`,
  };
  return (
    <button
      onClick={props.isActive ? props.onClick : () => {}}
      className={buttonVariant[props.variant]}
    >
      {props.children}
    </button>
  );
}
