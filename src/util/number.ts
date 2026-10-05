export const isStrictlyBetween = (value: number, { min, max }: { min: number; max: number }): boolean => {
  return value > min && value < max;
};
