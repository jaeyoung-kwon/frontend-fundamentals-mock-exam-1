import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';
import { formatAmount } from '../../../util/amount';

interface SavingProductRowProps {
  product: SavingsProduct;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SavingProductRow = ({ product, selected, onSelect }: SavingProductRowProps) => {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${product.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${formatAmount(product.minMonthlyAmount)}원 ~ ${formatAmount(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={selected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={() => onSelect(product.id)}
    />
  );
};
