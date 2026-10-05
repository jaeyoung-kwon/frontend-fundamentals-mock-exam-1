import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { matchesSavingsConditions } from '../util/matchesSavingsConditions';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';
import { parseAmount } from '../../../util/amount';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import type { SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';

export const useSavingsProductList = (products: SavingsProduct[]) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();
  const [monthlyAmountInput, term] = useWatch({
    control,
    name: [SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT, SAVINGS_CALCULATOR_FIELD.TERM],
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const monthlyAmount = parseAmount(monthlyAmountInput);
  const filteredProducts = products.filter(product => matchesSavingsConditions(product, monthlyAmount, term));
  const selectedProduct = filteredProducts.find(product => product.id === selectedProductId);

  useEffect(() => {
    const product = products.find(product => product.id === selectedProductId);
    if (product && !matchesSavingsConditions(product, monthlyAmount, term)) {
      setSelectedProductId(null);
    }
  }, [products, selectedProductId, monthlyAmount, term]);

  return { filteredProducts, selectedProduct, onProductSelect: setSelectedProductId };
};
