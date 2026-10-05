import { isStrictlyBetween } from './util/number';

export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export function matchesSavingsConditions(product: SavingsProduct, monthlyAmount: number | null, term: number) {
  return (
    product.availableTerms === term &&
    // 월 납입액을 입력하기 전에는 기간만 적용해 상품을 둘러볼 수 있어요.
    (monthlyAmount === null ||
      isStrictlyBetween(monthlyAmount, {
        min: product.minMonthlyAmount,
        max: product.maxMonthlyAmount,
      }))
  );
}

export function calculateSavings(targetAmount: number, monthlyAmount: number, term: number, annualRate: number) {
  const multiplier = term * (1 + (annualRate / 100) * 0.5);
  const finalAmount = monthlyAmount * multiplier;

  return {
    finalAmount,
    difference: targetAmount - finalAmount,
    recommendedMonthlyAmount: Math.round(targetAmount / multiplier / 1000) * 1000,
  };
}
