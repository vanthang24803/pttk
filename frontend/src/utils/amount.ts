export const handlerAmount = (
  base: number,
  scale: number,
  benefit: number,
  work: number,
  off: number
) => {
  if (off <= 4 && work >= 24) {
    return base * scale + benefit;
  } else {
    return base * scale - (off * scale * base) / 24 + benefit;
  }
};
