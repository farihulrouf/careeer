export default function getLastDateOfMonth(date) {
  if (date) {
    let stringDate = date.split("-");
    let year = parseInt(stringDate[2], 10);
    let month = parseInt(stringDate[1], 10);
    if (month === 2) {
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          if (year % 400 === 0) {
            return { endDate: 29, leap: true };
          } else return { endDate: 28, leap: false };
        } else return { endDate: 29, leap: true };
      } else return { endDate: 28, leap: false };
    } else if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      return { endDate: 31 };
    } else return { endDate: 30 };
  }
}
