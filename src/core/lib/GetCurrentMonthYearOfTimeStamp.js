export default function getCurrentMonthYearSinceTimeStamp(timestamp) {
  if (isNaN(parseInt(timestamp))) return "Invalid timestamp";
  let currentMonthYear = new Date(timestamp);
  return currentMonthYear.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });
}
