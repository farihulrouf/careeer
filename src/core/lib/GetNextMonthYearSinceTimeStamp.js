export default function getNextMonthYearSinceTimeStamp(timestamp) {
  if (isNaN(parseInt(timestamp))) return "Invalid timestamp";
  let nextMonthYear = new Date(timestamp);
  nextMonthYear.setDate(1);
  nextMonthYear.setHours(24 * 31);
  return {
    monthYear: nextMonthYear.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    }),
    monthYearTimeStamp: nextMonthYear.getTime(),
  };
}
