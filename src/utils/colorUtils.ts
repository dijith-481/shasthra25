export const hexToRgb = (hexColor: string | undefined) => {
  if (!hexColor) return { r: 0, g: 0, b: 0 };
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return { r, g, b };
};

export const mixColors = (
  hexColor1: string | undefined,
  hexColor2: string,
  amount: number,
  alpha?: number,
) => {
  const { r: r1, g: g1, b: b1 } = hexToRgb(hexColor1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(hexColor2);
  const r = Math.floor(r1 * (1 - amount) + r2 * amount);
  const g = Math.floor(g1 * (1 - amount) + g2 * amount);
  const b = Math.floor(b1 * (1 - amount) + b2 * amount);
  return `rgba(${r}, ${g}, ${b}, ${alpha || 1})`;
};

export const getContrastColor = (hexColor: string) => {
  const { r, g, b } = hexToRgb(hexColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000000" : "#FFFFFF";
};
