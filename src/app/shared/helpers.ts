let seedValue = 0;
export function uuid(): string {
  if (seedValue === 9999) {
    seedValue = 0;
  }
  seedValue += 1;
  const time = new Date().getTime().toString();
  const random = ('000' + seedValue).slice(-4).toString();
  return time + random;
}
