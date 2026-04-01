export const getTimeHHMM = () => {
  // Create a new Date object
  var now = new Date();

  // Get the current hours and pad it with leading zero if necessary
  var hours = String(now.getHours()).padStart(2, "0");

  // Get the current minutes and pad it with leading zero if necessary
  var minutes = String(now.getMinutes()).padStart(2, "0");

  // Concatenate hours and minutes with a colon
  var currentTime = hours + ":" + minutes;
  return currentTime;
};
