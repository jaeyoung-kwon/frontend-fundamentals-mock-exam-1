import { Assets, colors, ListRow } from 'tosslib';
import { formatAmount, SavingsProduct } from '../savings';

interface ProductListProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelect: (id: string) => void;
}

export function ProductList({ products, selectedProductId, onSelect }: ProductListProps) {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없어요." />} />;
  }

  return (
    <>
      {products.map(product => (
        <ListRow
          key={product.id}
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
          right={selectedProductId === product.id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          onClick={() => onSelect(product.id)}
        />
      ))}
    </>
  );
}
