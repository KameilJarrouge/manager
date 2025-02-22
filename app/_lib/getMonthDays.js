import moment from "moment";

export default function getMonthDays(date) {
  let calendar = [];
  let currentDate = moment(date).startOf("month");
  let lastDate = moment(date).endOf("month").add(1, "days");
  let row = [];
  let before = 0;
  let after = 0;
  while (!moment(currentDate).isSame(lastDate, "day")) {
    if (currentDate.isoWeekday() === 7) {
      if (row.length !== 0) {
        calendar.push(row);
        row = [];
      }
      row.push({ date: currentDate, current: true });
    } else {
      if (row.length === 0) {
        for (let i = 0; i < currentDate.isoWeekday() % 7; i++) {
          row.push(-1);
          before++;
        }
      }
      row.push({ date: currentDate, current: true });
    }

    currentDate = moment(currentDate).add(1, "days");
  }
  if (row.length !== 0) {
    let spaces = 7 - row.length;
    for (let i = 0; i < spaces; i++) {
      row.push(-1);
      after++;
    }
    calendar.push(row);
  }
  // handle before
  let beforeDate = moment(date).startOf("month").add(-1, "days");
  for (let i = before; i > 0; i--) {
    calendar[0][i - 1] = {
      date: beforeDate.toDate(),
      current: false,
    };
    beforeDate.add(-1, "days");
  }

  // handle after
  let afterDate = moment(date).endOf("month").add(1, "days");
  let maxIndex = calendar.length - 1;
  let maxRowIndex = calendar[maxIndex].length;
  for (let i = after; i > 0; i--) {
    calendar[maxIndex][maxRowIndex - i] = {
      date: afterDate.toDate(),
      current: false,
    };
    afterDate.add(1, "days");
  }

  return calendar;
}
