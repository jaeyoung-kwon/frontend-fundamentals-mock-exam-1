import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ListRow, Tab } from 'tosslib';
import { matchesSavingsConditions, type SavingsProduct } from '../../../savings';
import type { SavingsCalculatorFormValues } from '../schemas/savingsCalculatorSchema';
import { CalculationResult } from '../../../components/CalculationResult';
import { ProductList } from '../../../components/ProductList';

interface SavingsCalculatorTabsProps {
  isLoading: boolean;
  error: string | null;
  products: SavingsProduct[];
}

export const SavingsCalculatorTabs = ({ isLoading, error, products }: SavingsCalculatorTabsProps) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();
  const [targetAmount, monthlyAmount, term] = useWatch({
    control,
    name: ['targetAmount', 'monthlyAmount', 'term'],
  });
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const monthlyAmountValue = monthlyAmount === '' ? null : Number(monthlyAmount.replace(/,/g, ''));
  const filteredProducts = products.filter(product => matchesSavingsConditions(product, monthlyAmountValue, term));
  const selectedProduct = filteredProducts.find(product => product.id === selectedProductId);
  const recommendedProducts = [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  useEffect(() => {
    const product = products.find(product => product.id === selectedProductId);
    if (product && !matchesSavingsConditions(product, monthlyAmountValue, term)) {
      setSelectedProductId(null);
    }
  }, [products, selectedProductId, monthlyAmountValue, term]);

  return (
    <>
      <Tab onChange={setActiveTab}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {isLoading ? (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 목록을 불러오는 중이에요." />} />
      ) : error ? (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top={error} />} />
      ) : activeTab === 'products' ? (
        <ProductList
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onSelect={setSelectedProductId}
        />
      ) : (
        <CalculationResult
          selectedProduct={selectedProduct}
          targetAmount={targetAmount === '' ? null : Number(targetAmount.replace(/,/g, ''))}
          monthlyAmount={monthlyAmountValue}
          term={term}
          recommendedProducts={recommendedProducts}
          onSelect={setSelectedProductId}
        />
      )}
    </>
  );
};
