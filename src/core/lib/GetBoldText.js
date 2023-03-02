export default function getBoldText(string = "") {
  let occurence = 0;
  do {
    let index = string.indexOf("**");
    if (index === -1) break;
    occurence++;
    if (occurence % 2 !== 0) {
      string = string.replace("**", "<b>");
    } else {
      string = string.replace("**", "</b>");
    }
  } while (string.includes("**"));
  return string;
}
