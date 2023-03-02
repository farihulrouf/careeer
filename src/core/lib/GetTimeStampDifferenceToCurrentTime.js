export default function getTimeStampDifferenceToCurrentTime(timestamp) {
  if (isNaN(parseInt(timestamp))) return "Invalid timestamp";
  const MILLISECONDS_IN_A_MONTH = 2678400000;
  let timeStampDifference = Math.round(
    (new Date().getTime() - timestamp) / MILLISECONDS_IN_A_MONTH
  );
  return new Date().getTime() < timestamp && timeStampDifference === 0
    ? -1
    : timeStampDifference;
}
