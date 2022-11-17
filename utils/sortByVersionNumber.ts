import { SoftwareVersion } from "../@types";

export default function sortByVersionNumber(
  a: SoftwareVersion,
  b: SoftwareVersion,
): number {
  const aVersion = a._id.split(".");
  const bVersion = b._id.split(".");

  for (let i = 0; i < aVersion.length; i++) {
    if (parseInt(aVersion[i]) > parseInt(bVersion[i])) {
      return -1;
    } else if (parseInt(aVersion[i]) < parseInt(bVersion[i])) {
      return 1;
    }
  }

  return 0;
}
