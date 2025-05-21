import moment, { Moment } from "moment";

export function getFormattedTime(time: string): string {
  return moment(time, ["h:m a", "H:m"]).format("HH:mm");
}

export function isTimeBeforeNow(time: string): boolean {
  return moment() > moment(time);
}

export function getFormattedDate(date: string): string {
  return moment(date).format("DD/MM/yyyy");
}

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function isToday(date: Moment): boolean {
  return moment(date).utc().startOf("day").format() == moment().utc().startOf("day").format();
}
