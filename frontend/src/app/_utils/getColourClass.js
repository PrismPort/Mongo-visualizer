export function getColourClass(percentage) {
  if (percentage >= 90) {
    return "text-color-90"; // Green for high percentages
  } else if (percentage >= 80) {
    return "text-color-80";
  } else if (percentage >= 70) {
    return "text-color-70";
  } else if (percentage >= 60) {
    return "text-color-60";
  } else if (percentage >= 50) {
    return "text-color-50"; // Yellow for middle percentages
  } else if (percentage >= 40) {
    return "text-color-40"; // Orange for lower percentages
  } else if (percentage >= 30) {
    return "text-color-30";
  } else if (percentage >= 20) {
    return "text-color-20";
  } else if (percentage >= 10) {
    return "text-color-10"; // Red for low percentages
  } else {
    return "text-color-0";
  }
}
