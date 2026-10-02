import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { savingsCalculatorSchema, SavingsCalculatorFormValues } from '../schemas/savingsCalculatorSchema';

export const SavingsCalculatorProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<SavingsCalculatorFormValues>({
    resolver: zodResolver(savingsCalculatorSchema),
    mode: 'onChange',
    defaultValues: {
      targetAmount: '',
      monthlyAmount: '',
      term: 12,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
