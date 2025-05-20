import { ReactNode } from "react";
import classNames from "classnames";

export interface CardProps {
  imageUrl: string;
  title: string;
  description?: ReactNode;
  size?: CardSize;
}

export enum CardSize {
  REGULAR,
  SMALL,
}

export default function Card({
  imageUrl,
  title,
  description,
  size = CardSize.REGULAR,
}: CardProps) {
  return (
    <div className="rounded-3xl shadow-md shadow-cinebhshadow border border-cinebhpale p-4 w-full pb-6 hover:bg-cinebhshadow">
      <div
        className={classNames("rounded-2xl overflow-hidden w-full", {
          "max-h-34": size === CardSize.SMALL,
        })}
      >
        <img
          src={imageUrl}
          alt="cover image"
          className="w-full h-72 rounded-2xl"
        />
      </div>
      <div className="text-cinebhdarkgray font-bold text-xl mt-4 mb-2 overflow-hidden max-h-7">
        {title}
      </div>
      {description}
    </div>
  );
}
