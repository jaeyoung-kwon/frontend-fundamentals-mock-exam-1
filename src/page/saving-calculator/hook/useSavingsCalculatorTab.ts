import { useSearchParams } from 'react-router-dom';
import { savingsCalculatorTabSchema } from '../schema/savingsCalculatorTabSchema';
import type { SavingsCalculatorTab } from '../type/tab';

export const useSavingsCalculatorTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = savingsCalculatorTabSchema.parse(searchParams.get('tab') ?? 'products');

  const onActiveTabChange = (tab: SavingsCalculatorTab) => {
    if (tab === activeTab) {
      return;
    }

    setSearchParams(
      previous => {
        const next = new URLSearchParams(previous);
        next.set('tab', tab);
        return next;
      },
      { preventScrollReset: true }
    );
  };

  return { activeTab, onActiveTabChange };
};
