export interface CarouselControlProps {
  numberOfItems: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

export default function CarouselControl({
  numberOfItems,
  selectedIndex,
  onIndexChange,
}: CarouselControlProps) {
  const buttons = [];
  for (let i = 0; i < numberOfItems; i++) {
    buttons.push(
      <button
        onClick={() => onIndexChange(i)}
        className={`w-8 h-1 p-1 rounded  cursor-pointer ${selectedIndex === i ? "bg-cinebhneutral" : "bg-cinebhash"}`}
        key={i}
      ></button>,
    );
  }

  return <div className="flex justify-between w-36">{buttons}</div>;
}
