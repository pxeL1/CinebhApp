import { Moment } from "moment";
import { User } from "models/User";
import { Reservation } from "models/Reservation";

export type Payment = {
  id: number;
  date: Moment;
  user: User;
  reservation: Reservation;
};
