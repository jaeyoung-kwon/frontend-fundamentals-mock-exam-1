import { css } from '@emotion/react';
import { SavingsCalculatorForm } from 'page/saving-calculator/component/SavingsCalculatorForm';
import { SavingsCalculatorResultSection } from 'page/saving-calculator/component/SavingsCalculatorResultSection';
import { SavingsCalculatorProvider } from 'page/saving-calculator/provider/SavingsCalculatorProvider';
import { useSavingsProducts } from 'page/saving-calculator/hook/useSavingsProducts';
import { Border, NavigationBar, Spacing } from 'tosslib';

export const SavingsCalculatorPage = () => {
  const { products, isLoading, error, refetch } = useSavingsProducts();

  const availableTerms = [...new Set(products.map(product => product.availableTerms))].sort((a, b) => a - b);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100dvh;

        > * {
          flex-shrink: 0;
        }
      `}
    >
      <NavigationBar title="적금 계산기" />

      <SavingsCalculatorProvider>
        <Spacing size={16} />
        <SavingsCalculatorForm availableTerms={availableTerms} />
        <Spacing size={24} />

        <Border height={16} />

        <Spacing size={8} />
        <SavingsCalculatorResultSection products={products} isLoading={isLoading} error={error} onRetry={refetch} />
        <Spacing size={40} />
      </SavingsCalculatorProvider>
    </div>
  );
};
