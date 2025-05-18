import moment from "moment";

export function getFormattedTime(time: string): string {
  return moment(time, ["h:m a", "H:m"]).format("HH:mm");
}

export function isTimeBeforeNow(time: string): boolean {
  return moment() > moment(time);
}

export function getFormattedDate(date: string): string {
  return moment(date).format("DD/MM/yyyy");
}
