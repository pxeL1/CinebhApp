import { ReactNode } from "react";

export interface MediaCardProps {
  imageUrl: string;
  title: string;
  description?: ReactNode;
}

export default function Card({ imageUrl, title, description }: MediaCardProps) {
  return (
    <div className="rounded-3xl shadow-md shadow-atlantshadow border border-atlantpale p-4">
      <img src={imageUrl} alt="img" className="w-[270px] h-72 rounded-2xl" />
      <div className="text-atlantdarkgray font-bold text-xl mt-4 mb-2">
        {title}
      </div>
      {description}
    </div>
  );
}
