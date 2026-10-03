import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ListRow } from 'tosslib';
import type { SavingsCalculatorTab } from '../type/tab';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import { matchesSavingsConditions, type SavingsProduct } from '../../../savings';
import type { SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';
import { CalculationResult } from '../../../component/CalculationResult';
import { ProductList } from '../../../component/ProductList';

interface SavingsCalculatorTabContentProps {
  activeTab: SavingsCalculatorTab;
  isLoading: boolean;
  error: string | null;
  products: SavingsProduct[];
}

export const SavingsCalculatorTabContent = ({
  activeTab,
  isLoading,
  error,
  products,
}: SavingsCalculatorTabContentProps) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();
  const [targetAmount, monthlyAmount, term] = useWatch({
    control,
    name: [
      SAVINGS_CALCULATOR_FIELD.TARGET_AMOUNT,
      SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT,
      SAVINGS_CALCULATOR_FIELD.TERM,
    ],
  });
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

  if (isLoading) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 목록을 불러오는 중이에요." />} />;
  }

  if (error) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top={error} />} />;
  }

  if (activeTab === 'products') {
    return (
      <ProductList products={filteredProducts} selectedProductId={selectedProductId} onSelect={setSelectedProductId} />
    );
  }

  return (
    <CalculationResult
      selectedProduct={selectedProduct}
      targetAmount={targetAmount === '' ? null : Number(targetAmount.replace(/,/g, ''))}
      monthlyAmount={monthlyAmountValue}
      term={term}
      recommendedProducts={recommendedProducts}
      onSelect={setSelectedProductId}
    />
  );
};
