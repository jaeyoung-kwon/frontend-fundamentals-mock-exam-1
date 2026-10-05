import { Button } from 'tosslib';
import { LoadingSpinner } from '../../../component/LoadingSpinner';
import type { SavingsCalculatorTab } from '../type/tab';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';
import { useSavingsProductList } from '../hook/useSavingsProductList';
import { CalculationResult } from './CalculationResult';
import { SavingProductList } from './SavingProductList';
import { containerStyle, errorTextStyle, statusContainerStyle } from './SavingsCalculatorTabContent.css';

interface SavingsCalculatorTabContentProps {
  activeTab: SavingsCalculatorTab;
  products: SavingsProduct[];
}

export const SavingsCalculatorTabContent = ({ activeTab, products }: SavingsCalculatorTabContentProps) => {
  const { filteredProducts, selectedProduct, onProductSelect } = useSavingsProductList(products);

  return (
    <div css={containerStyle}>
      {activeTab === 'products' ? (
        <SavingProductList
          products={filteredProducts}
          selectedProductId={selectedProduct?.id ?? null}
          onSelect={onProductSelect}
        />
      ) : (
        <CalculationResult selectedProduct={selectedProduct} products={filteredProducts} onSelect={onProductSelect} />
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
