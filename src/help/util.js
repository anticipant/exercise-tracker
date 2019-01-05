export const getSecondsFromTime = (time) => {
  if (time) {
    const times = time.split(':');
    return times[0] * 60 + times[1] * 1;
  }
  return null;
};

export const comparator = (a, b) => {
  if (a.result > b.result) {
    return -1;
  }
  if (a.result < b.result) {
    return 1;
  }
  // a должно быть равным b
  return 0;
};
