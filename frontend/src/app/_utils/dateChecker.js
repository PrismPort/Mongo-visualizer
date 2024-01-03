const { DateTime } = require("luxon");

export function isDate(string) {
  // Check if it is a timestamp in milliseconds
  if (/^\d{13}$/.test(string)) {
    const date = DateTime.fromMillis(parseInt(string));
    return date.isValid;
  }
  // Check for ISO 8601 string
  const isoDate = DateTime.fromISO(string);
  return isoDate.isValid;
}

// Example usage:
const dateStrings = [
  "1374991885000",
  "1096193052000",
  "2016-06-25T12:48:21Z",
  // ... other strings
];

dateStrings.forEach((string) => {
  if (isDate(string)) {
    console.log(`The string "${string}" is a valid date.`);
  } else {
    console.log(`The string "${string}" is not a valid date.`);
  }
});
