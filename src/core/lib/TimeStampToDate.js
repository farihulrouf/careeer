export default function timestampToDate(timestampData) {
  var timestamp = parseInt(timestampData);
  if (isNaN(timestamp)) {
    return "Invalid timestamp";
  }
  if (isNaN(new Date(timestamp).getDate())) {
    return "Invalid timestamp";
  }

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
  let date = new Date(timestamp);
  if (date) {
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    let mm = parseInt(date.getMonth());
    date = dd + "/" + MONTH_LETTERS[mm] + "/" + date.getFullYear();
  }
  return date;
}
