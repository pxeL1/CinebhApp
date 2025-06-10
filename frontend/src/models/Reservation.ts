import { Moment } from "moment";
import { User } from "models/User";
import { Projection } from "models/Projection";
import { Payment } from "models/Payment";
import { ReservedSeat } from "models/ReservedSeat";

export type Reservation = {
  id: number;
  price: number;
  date: Moment;
  user: User;
  projection: Projection;
  payment?: Payment;
  seats: Array<ReservedSeat>
}
