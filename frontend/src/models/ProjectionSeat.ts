export type SeatType = "REGULAR" | "VIP" | "LOVE"

export type ProjectionSeat = {
  id: number;
  type: SeatType;
  number: string;
  reserved: boolean;
}
