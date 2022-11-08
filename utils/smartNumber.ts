function smartNumber(value: number, base: number = 1): string {
  let result: string;
  value /= base;

  if (value < 1000) {
    result = value.toString();
  } else if (value < 1000000) {
    result = (value / 1000).toFixed(2) + "K";
  } else if (value < 1000000000) {
    result = (value / 1000000).toFixed(2) + "M";
  } else {
    result = (value / 1000000000).toFixed(2) + "B";
  }

  return result;
}

export default smartNumber;
