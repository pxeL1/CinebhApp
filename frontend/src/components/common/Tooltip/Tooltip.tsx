import { PropsWithChildren } from "react";

export interface TooltipProps {
  text: string;
}

export default function Tooltip({ text, children }: PropsWithChildren<TooltipProps>) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 hidden group-hover:block bg-cinebhdim text-white text-xs rounded-lg py-2 px-3 z-10 w-56">
        {text}
      </div>
    </div>
  )
}
