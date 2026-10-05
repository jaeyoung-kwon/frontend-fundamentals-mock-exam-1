import { useFormContext, useWatch } from 'react-hook-form';
import { Border, ListHeader, ListRow, Spacing } from 'tosslib';
import { calculateSavings } from '../util/calculateSavings';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';
import { parseAmount } from '../../../util/amount';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import type { SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';
import { AmountResultRow } from './AmountResultRow';
import { SavingProductRow } from './SavingProductRow';

interface CalculationResultProps {
  selectedProduct?: SavingsProduct;
  products: SavingsProduct[];
  onSelect: (id: string) => void;
}

export const CalculationResult = ({ selectedProduct, products, onSelect }: CalculationResultProps) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();
  const [targetAmountInput, monthlyAmountInput, term] = useWatch({
    control,
    name: [
      SAVINGS_CALCULATOR_FIELD.TARGET_AMOUNT,
      SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT,
      SAVINGS_CALCULATOR_FIELD.TERM,
    ],
  });
  const targetAmount = parseAmount(targetAmountInput);
  const monthlyAmount = parseAmount(monthlyAmountInput);
  const recommendedProducts = [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  const result =
    selectedProduct && targetAmount !== null && monthlyAmount !== null
      ? calculateSavings(targetAmount, monthlyAmount, term, selectedProduct.annualRate)
      : null;

  return (
    <>
      <Spacing size={8} />
      {!selectedProduct ? (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요" />} />
      ) : result === null ? (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="목표 금액과 월 납입액을 입력해주세요." />} />
      ) : (
        <>
          <AmountResultRow label="예상 수익 금액" amount={result.finalAmount} />
          <AmountResultRow label="목표 금액과의 차이" amount={result.difference} />
          <AmountResultRow label="추천 월 납입 금액" amount={result.recommendedMonthlyAmount} />
        </>
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      {recommendedProducts.length === 0 ? (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없어요." />} />
      ) : (
        recommendedProducts.map(product => (
          <SavingProductRow
            key={product.id}
            product={product}
            selected={selectedProduct?.id === product.id}
            onSelect={onSelect}
          />
        ))
      )}
    </>
  );
};
