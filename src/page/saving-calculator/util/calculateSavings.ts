export const calculateSavings = (targetAmount: number, monthlyAmount: number, term: number, annualRate: number) => {
  const multiplier = term * (1 + (annualRate / 100) * 0.5);
  const finalAmount = monthlyAmount * multiplier;

  return {
    finalAmount,
    difference: targetAmount - finalAmount,
    recommendedMonthlyAmount: Math.round(targetAmount / multiplier / 1000) * 1000,
  };
};
