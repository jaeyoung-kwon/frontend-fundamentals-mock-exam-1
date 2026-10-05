import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { calculateSavings, SavingsProduct } from '../savings';
import { formatAmount } from '../util/amount';
import { ProductList } from './ProductList';

interface CalculationResultProps {
  selectedProduct?: SavingsProduct;
  targetAmount: number | null;
  monthlyAmount: number | null;
  term: number;
  recommendedProducts: SavingsProduct[];
  onSelect: (id: string) => void;
}

export function CalculationResult({
  selectedProduct,
  targetAmount,
  monthlyAmount,
  term,
  recommendedProducts,
  onSelect,
}: CalculationResultProps) {
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
          <ResultRow label="예상 수익 금액" amount={result.finalAmount} />
          <ResultRow label="목표 금액과의 차이" amount={result.difference} />
          <ResultRow label="추천 월 납입 금액" amount={result.recommendedMonthlyAmount} />
        </>
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      <ProductList products={recommendedProducts} selectedProductId={selectedProduct?.id ?? null} onSelect={onSelect} />
    </>
  );
}

function ResultRow({ label, amount }: { label: string; amount: number }) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={label}
          topProps={{ color: colors.grey600 }}
          bottom={`${formatAmount(amount)}원`}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
}
