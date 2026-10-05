import { ListRow } from 'tosslib';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';
import { SavingProductRow } from './SavingProductRow';

interface SavingProductListProps {
  products: SavingsProduct[];
  selectedProductId: string | null;
  onSelect: (id: string) => void;
}

export const SavingProductList = ({ products, selectedProductId, onSelect }: SavingProductListProps) => {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없어요." />} />;
  }

  return (
    <>
      {products.map(product => (
        <SavingProductRow
          key={product.id}
          product={product}
          selected={selectedProductId === product.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};
