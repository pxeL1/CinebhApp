import moment from "moment";

export function getFormattedTime(time: string): string {
  return moment(time, ["h:m a", "H:m"]).format("HH:mm");
}
