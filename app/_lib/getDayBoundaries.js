import moment from "moment/moment";
export function getDayBoundaries(day = new Date()) {
  const start = moment(day).startOf("day").toDate();
  const end = moment(day).endOf("day").toDate();
  return [start, end];
}
