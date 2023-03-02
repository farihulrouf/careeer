export default function dateToTimestamp(date) {
  let MONTH_LETTERS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  var date = date.split("/");
  let month = MONTH_LETTERS.indexOf(date[1].toUpperCase()) + 1;
  if (month < 10) month = "0" + month;
  let dd = parseInt(date[0]);
  if (dd < 10) dd = "0" + date[0];
  let timestamp = new Date(
    date[2] + "-" + month + "-" + date[0] + "T10:00:00.000Z"
  );
  return timestamp.getTime();
}
