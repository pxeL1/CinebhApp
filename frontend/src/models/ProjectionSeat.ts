import { SeatType } from "models/Seat";

export type ProjectionSeat = {
  id: number;
  type: SeatType;
  number: string;
  reserved: boolean;
}
