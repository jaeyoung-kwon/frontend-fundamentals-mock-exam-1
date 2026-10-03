import { useState } from 'react';
import type { SavingsProduct } from '../../../savings';
import type { SavingsCalculatorTab } from '../type/tab';
import { SavingsCalculatorTabs } from './SavingsCalculatorTabs';
import { SavingsCalculatorTabContent } from './SavingsCalculatorTabContent';

interface SavingsCalculatorResultSectionProps {
  products: SavingsProduct[];
  isLoading: boolean;
  error: string | null;
}

export const SavingsCalculatorResultSection = ({ products, isLoading, error }: SavingsCalculatorResultSectionProps) => {
  const [activeTab, setActiveTab] = useState<SavingsCalculatorTab>('products');

  return (
    <>
      <SavingsCalculatorTabs activeTab={activeTab} onChange={setActiveTab} />
      <SavingsCalculatorTabContent activeTab={activeTab} products={products} isLoading={isLoading} error={error} />
    </>
  );
};
