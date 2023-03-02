export default function timestampToDateTime(timestamp) {
  let _timestamp = parseInt(timestamp);
  if (isNaN(_timestamp)) {
    return "Invalid timestamp";
  }
  const date = new Date(_timestamp);
  if (isNaN(date.getDate())) {
    return "Invalid timestamp";
  }
  let convertedTime = date.toLocaleTimeString();
  convertedTime = convertedTime.split(":");
  let meridies = "AM";
  if (parseInt(convertedTime[0]) > 12) {
    meridies = "PM";
  }
  convertedTime = convertedTime[0] + ":" + convertedTime[1] + " " + meridies;
  return { date: date.toLocaleDateString(), time: convertedTime };
}
