import { z } from 'zod';
import { formatAmountInput } from '../savings';

const amountSchema = z.string().refine(value => formatAmountInput(value) !== null, {
  message: '금액은 0 이상의 정수로 입력해주세요.',
});

export const savingsCalculatorSchema = z.object({
  targetAmount: amountSchema,
  monthlyAmount: amountSchema,
  term: z.number().int().positive(),
});

export type SavingsCalculatorFormValues = z.infer<typeof savingsCalculatorSchema>;
