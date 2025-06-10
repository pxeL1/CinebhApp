export type SeatType = "REGULAR" | "VIP" | "LOVE"

export type Seat = {
  id: number;
  type: SeatType;
  number: string;
}
