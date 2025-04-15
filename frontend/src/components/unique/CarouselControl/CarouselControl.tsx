export interface CarouselControlProps {
  numberOfItems: number;
  index: number;
  onIndexChange: (index: number) => void;
}

export default function CarouselControl({
  numberOfItems,
  index,
  onIndexChange,
}: CarouselControlProps) {
  const buttons = [];
  for (let i = 0; i < numberOfItems; i++) {
    buttons.push(
      <button
        onClick={() => onIndexChange(i)}
        className={`w-8 h-1 p-1 rounded  cursor-pointer ${index === i ? "bg-atlantneutral" : "bg-atlantash"}`}
        key={i}
      ></button>,
    );
  }

  return <div className="flex justify-between w-36">{buttons}</div>;
}
