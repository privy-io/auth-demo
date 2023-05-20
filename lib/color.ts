import tinycolor from 'tinycolor2';

export function isDark(hex: string) {
  return tinycolor(hex).isDark();
}
