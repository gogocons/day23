// function to get date and time when required
function getCurrentDateAndTime(): string {
  return new Date().toUTCString();
}

export default getCurrentDateAndTime;
