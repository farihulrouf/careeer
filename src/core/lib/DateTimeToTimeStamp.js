export default function dateTimeToTimestamp(dateTime) {
  if (!("date" in dateTime) || !("time" in dateTime)) {
    return "either date or time is missing in params";
  }
  let formattedTime = dateTime.time
    .substr(0, dateTime.time.length - 2)
    .trim()
    .split(":");
  if (/pm$/i.test(dateTime.time)) {
    formattedTime =
      parseInt(formattedTime[0]) + 12 + ":" + formattedTime[1] + ":00";
  } else if (/am$/i.test(dateTime.time) && parseInt(formattedTime[0]) < 10) {
    formattedTime =
      "0" + parseInt(formattedTime[0]) + ":" + formattedTime[1] + ":00";
  } else {
    formattedTime = dateTime.time;
  }
  let dateSplit =
    dateTime.date.split("/").length === 1
      ? dateTime.date.split("-")
      : dateTime.date.split("/");
  let formattedDate = dateSplit.reverse().join("-");
  let timestamp = formattedDate + " " + formattedTime;
  return Date.parse(timestamp);
}
