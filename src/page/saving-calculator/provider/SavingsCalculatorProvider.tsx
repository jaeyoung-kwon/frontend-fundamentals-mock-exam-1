import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import { savingsCalculatorSchema, SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';

export const SavingsCalculatorProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<SavingsCalculatorFormValues>({
    resolver: zodResolver(savingsCalculatorSchema),
    mode: 'onChange',
    defaultValues: {
      [SAVINGS_CALCULATOR_FIELD.TARGET_AMOUNT]: '',
      [SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT]: '',
      [SAVINGS_CALCULATOR_FIELD.TERM]: 12,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
