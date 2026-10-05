import { isStrictlyBetween } from '../../../util/number';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';

export const matchesSavingsConditions = (product: SavingsProduct, monthlyAmount: number | null, term: number) => {
  return (
    product.availableTerms === term &&
    // 월 납입액을 입력하기 전에는 기간만 적용해 상품을 둘러볼 수 있어요.
    (monthlyAmount === null ||
      isStrictlyBetween(monthlyAmount, {
        min: product.minMonthlyAmount,
        max: product.maxMonthlyAmount,
      }))
  );
};
