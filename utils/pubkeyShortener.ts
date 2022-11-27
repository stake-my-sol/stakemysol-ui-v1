export default function pubkeyShortener(
  pubkey: string,
  length: number = 3,
): string {
  return pubkey.slice(0, length) + "..." + pubkey.slice(-1 * length);
}
