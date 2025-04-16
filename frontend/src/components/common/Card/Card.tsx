import { ReactNode } from "react";

export interface CardProps {
  imageUrl: string;
  title: string;
  description?: ReactNode;
}

export default function Card({ imageUrl, title, description }: CardProps) {
  return (
    <div className="rounded-3xl shadow-md shadow-cinebhshadow border border-cinebhpale p-4 w-full pb-6">
      <img src={imageUrl} alt="cover image" className="w-full h-72 rounded-2xl" />
      <div className="text-cinebhdarkgray font-bold text-xl mt-4 mb-2">
        {title}
      </div>
      {description}
    </div>
  );
}
