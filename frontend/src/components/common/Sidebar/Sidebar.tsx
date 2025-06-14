import { PropsWithChildren } from "react";
import classNames from "classnames";

export interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({
  isOpen,
  children,
}: PropsWithChildren<SidebarProps>) {
  return (
    <div className="z-10 sticky top-0">
      <div
        className={classNames(
          "w-full z-20 absolute bg-cinebhdim transition-all duration-500",
          { "opacity-0 h-0": !isOpen },
          { "opacity-15 h-full": isOpen },
        )}
      ></div>
      <div
        className={classNames(
          "min-h-360 w-full h-full z-30 absolute justify-end",
          { hidden: !isOpen },
          { flex: isOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
}
