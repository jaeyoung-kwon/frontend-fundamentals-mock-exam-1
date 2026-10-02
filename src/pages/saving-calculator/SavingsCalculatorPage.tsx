import { SavingsCalculatorForm } from 'components/SavingsCalculatorForm';
import { SavingsCalculatorTabs } from 'components/SavingsCalculatorTabs';
import { SavingsCalculatorProvider } from 'components/SavingsCalculatorProvider';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { Border, NavigationBar, Spacing } from 'tosslib';

export const SavingsCalculatorPage = () => {
  const { products, isLoading, error } = useSavingsProducts();

  const availableTerms = [...new Set(products.map(product => product.availableTerms))].sort((a, b) => a - b);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <SavingsCalculatorProvider>
        <Spacing size={16} />
        <SavingsCalculatorForm availableTerms={availableTerms} />
        <Spacing size={24} />

        <Border height={16} />

        <Spacing size={8} />
        <SavingsCalculatorTabs products={products} isLoading={isLoading} error={error} />
        <Spacing size={40} />
      </SavingsCalculatorProvider>
    </>
  );
};
