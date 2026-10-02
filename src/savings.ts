export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export function formatAmount(amount: number) {
  return amount.toLocaleString('ko-KR', { maximumFractionDigits: 0 });
}

// 빈 입력은 유지하고, 음수·소수·숫자가 아닌 값은 입력하지 못하게 해요.
export function formatAmountInput(value: string): string | null {
  const digits = value.replace(/,/g, '');
  if (digits === '') {
    return '';
  }
  if (!/^\d+$/.test(digits) || !Number.isSafeInteger(Number(digits))) {
    return null;
  }
  return formatAmount(Number(digits));
}

export function matchesSavingsConditions(product: SavingsProduct, monthlyAmount: number | null, term: number) {
  return (
    product.availableTerms === term &&
    // 월 납입액을 입력하기 전에는 기간만 적용해 상품을 둘러볼 수 있어요.
    (monthlyAmount === null || (monthlyAmount > product.minMonthlyAmount && monthlyAmount < product.maxMonthlyAmount))
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
