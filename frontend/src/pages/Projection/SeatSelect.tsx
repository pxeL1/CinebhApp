import { ProjectionSeat } from "models/ProjectionSeat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useState } from "react";

export interface SeatSelectProps {
  seats: Array<ProjectionSeat>;
  selectedSeats: Array<ProjectionSeat>;
  onSeatSelect: (seat: Array<ProjectionSeat>) => void;
}

export default function SeatSelect({
  seats,
  selectedSeats,
  onSeatSelect,
}: SeatSelectProps) {
  function handleSelect(seat: ProjectionSeat) {
    if (!selectedSeats.includes(seat)) {
      onSeatSelect([...selectedSeats, seat]);
    } else {
      const newSeats = selectedSeats.filter(
        (newSeat) => newSeat.id !== seat.id,
      );
      onSeatSelect(newSeats);
    }
  }

  function getIsGap(index: number) {
    return ((index - 3) % 8 === 0 && index != seats.length - 1) || index === 65;
  }

  return (
    <div>
      <div className="grid grid-cols-9 gap-2">
        {seats.map((seat, index) => {
          const gap = getIsGap(index);

          return (
            <>
              <Seat key={seat.id} seat={seat} onClick={handleSelect} />
              {gap && <div key={index} className="w-14 h-10"></div>}
            </>
          );
        })}
      </div>
    </div>
  );
}

interface SeatProps {
  seat: ProjectionSeat;
  onClick: (seat: ProjectionSeat) => void;
}

function Seat({ seat, onClick }: SeatProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      className={classNames(
        "flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 cursor-pointer disabled:cursor-default disabled:bg-cinebhpale",
        { "w-32 col-span-2": seat.type === "LOVE" },
        {
          "border-cinebhdarkred bg-cinebhdarkred hover:bg-cinebhlightred text-cinebhneutral":
            isSelected,
        },
        { "border-cinebhpale hover:bg-cinebhpale": !isSelected },
      )}
      onClick={() => {
        setIsSelected(!isSelected);
        onClick(seat);
      }}
      disabled={seat.reserved}
    >
      {seat.type === "VIP" && (
        <span className="mr-1">
          <FontAwesomeIcon icon={faStar} />
        </span>
      )}
      {seat.number}
    </button>
  );
}
