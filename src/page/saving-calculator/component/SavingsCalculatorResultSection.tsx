import { useState } from 'react';
import { css } from '@emotion/react';
import type { SavingsProduct } from '../../../savings';
import type { SavingsCalculatorTab } from '../type/tab';
import { SavingsCalculatorTabs } from './SavingsCalculatorTabs';
import { SavingsCalculatorTabContent } from './SavingsCalculatorTabContent';

interface SavingsCalculatorResultSectionProps {
  products: SavingsProduct[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const SavingsCalculatorResultSection = ({
  products,
  isLoading,
  error,
  onRetry,
}: SavingsCalculatorResultSectionProps) => {
  const [activeTab, setActiveTab] = useState<SavingsCalculatorTab>('products');

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
      `}
    >
      <SavingsCalculatorTabs activeTab={activeTab} onChange={setActiveTab} />
      {isLoading ? (
        <SavingsCalculatorTabContent.Loading />
      ) : error ? (
        <SavingsCalculatorTabContent.Error error={error} onRetry={onRetry} />
      ) : (
        <SavingsCalculatorTabContent activeTab={activeTab} products={products} />
      )}
    </section>
  );
};
