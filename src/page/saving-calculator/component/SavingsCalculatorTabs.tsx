import { Tab } from 'tosslib';
import type { SavingsCalculatorTab } from '../type/tab';

interface SavingsCalculatorTabsProps {
  activeTab: SavingsCalculatorTab;
  onChange: (value: SavingsCalculatorTab) => void;
}

export const SavingsCalculatorTabs = ({ activeTab, onChange }: SavingsCalculatorTabsProps) => {
  const handleTabChange = (value: string) => {
    if (value !== 'products' && value !== 'results') {
      return;
    }

    onChange(value);
  };

  return (
    <Tab onChange={handleTabChange}>
      <Tab.Item value="products" selected={activeTab === 'products'}>
        적금 상품
      </Tab.Item>
      <Tab.Item value="results" selected={activeTab === 'results'}>
        계산 결과
      </Tab.Item>
    </Tab>
  );
};
