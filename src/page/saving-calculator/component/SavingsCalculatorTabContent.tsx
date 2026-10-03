import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from 'tosslib';
import { LoadingSpinner } from '../../../component/LoadingSpinner';
import type { SavingsCalculatorTab } from '../type/tab';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import { matchesSavingsConditions, type SavingsProduct } from '../../../savings';
import type { SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';
import { CalculationResult } from '../../../component/CalculationResult';
import { ProductList } from '../../../component/ProductList';
import { containerStyle, errorTextStyle, statusContainerStyle } from './SavingsCalculatorTabContent.css';

interface SavingsCalculatorTabContentProps {
  activeTab: SavingsCalculatorTab;
  products: SavingsProduct[];
}

export const SavingsCalculatorTabContent = ({ activeTab, products }: SavingsCalculatorTabContentProps) => {
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

  return (
    <div css={containerStyle}>
      {activeTab === 'products' ? (
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
    </div>
  );
};

SavingsCalculatorTabContent.Loading = () => {
  return (
    <div css={statusContainerStyle}>
      <LoadingSpinner />
    </div>
  );
};

interface SavingsCalculatorTabContentErrorProps {
  error: string;
  onRetry: () => void;
}

SavingsCalculatorTabContent.Error = ({ error, onRetry }: SavingsCalculatorTabContentErrorProps) => {
  return (
    <div css={statusContainerStyle}>
      <p role="alert" css={errorTextStyle}>
        {error}
      </p>
      <Button type="button" onClick={onRetry}>
        새로고침
      </Button>
    </div>
  );
};
