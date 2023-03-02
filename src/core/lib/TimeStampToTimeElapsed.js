export default function timeStampToTimeElapsed(currentTime, previousTime) {
  let timeDiff = currentTime - previousTime;
  let actualDiff;

  switch (true) {
    //1 year ago
    case timeDiff >= 31556926000:
      actualDiff = getActualDiff(timeDiff, 31556926000);
      return actualDiff + (actualDiff === 1 ? " year ago" : " years ago");
    //Months ago
    case timeDiff < 31556926000 && timeDiff >= 2629743000:
      actualDiff = getActualDiff(timeDiff, 2629743000);
      return actualDiff + (actualDiff === 1 ? " month ago" : " months ago");

    //Weeks ago
    case timeDiff < 2629743000 && timeDiff >= 604800000:
      actualDiff = getActualDiff(timeDiff, 604800000);
      return actualDiff + (actualDiff === 1 ? " week ago" : " weeks ago");

    //Days ago
    case timeDiff < 604800000 && timeDiff >= 86400000:
      actualDiff = getActualDiff(timeDiff, 86400000);
      return actualDiff + (actualDiff === 1 ? " day ago" : " days ago");

    //Hours ago
    case timeDiff < 86400000 && timeDiff >= 3600000:
      actualDiff = getActualDiff(timeDiff, 3600000);
      return actualDiff + (actualDiff === 1 ? " hour ago" : " hours ago");

    //Minutes ago
    case timeDiff < 3600000 && timeDiff >= 60000:
      actualDiff = getActualDiff(timeDiff, 60000);
      return actualDiff + (actualDiff === 1 ? " minute ago" : " minutes ago");

    //Seconds ago
    case timeDiff < 60000 && timeDiff >= 1000:
      actualDiff = getActualDiff(timeDiff, 1000);
      return actualDiff + (actualDiff === 1 ? " second ago" : " seconds ago");

    case timeDiff <= 1000:
      return "0 seconds ago";
  }
}
function getActualDiff(timeDiff, base) {
  return Math.floor(timeDiff / base);
}
