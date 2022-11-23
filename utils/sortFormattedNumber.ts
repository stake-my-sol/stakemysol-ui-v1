// formatted number is a string with a number and a unit + SOL
// e.g. 1.5k SOL, 1.5M SOL, 1.5B SOL, 1.5T SOL
// sortFormattedNumber sorts the formatted number by value
import _ from "lodash";
const units = ["k", "M", "B", "T"];

export const sortFormattedNumber = (a: string, b: string) => {
  let aUnit: number = -1;
  let aNumber = a.split(" ")[0];
  if (_.includes(units, aNumber.slice(-1))) {
    aNumber = aNumber.slice(0, -1);
    aUnit = units.indexOf(aNumber.slice(-1));
  }

  let bUnit: number = -1;
  let bNumber = b.split(" ")[0];
  if (_.includes(units, bNumber.slice(-1))) {
    bNumber = bNumber.slice(0, -1);
    bUnit = units.indexOf(bNumber.slice(-1));
  }

  const result =
    Number(aNumber) * Math.pow(10, (aUnit + 1) * 3) -
    Number(bNumber) * Math.pow(10, (bUnit + 1) * 3);

  if (result === 0) {
    return 0;
  } else if (result > 0) {
    return 1;
  }
  return -1;
};
