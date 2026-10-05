import { z } from 'zod';
import { isValidAmountInput } from '../../../util/amount';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';

const amountSchema = z.string().refine(isValidAmountInput, {
  message: '금액은 0 이상의 정수로 입력해주세요.',
});

export const savingsCalculatorSchema = z.object({
  [SAVINGS_CALCULATOR_FIELD.TARGET_AMOUNT]: amountSchema,
  [SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT]: amountSchema,
  [SAVINGS_CALCULATOR_FIELD.TERM]: z.number().int().positive(),
});

export type SavingsCalculatorFormValues = z.infer<typeof savingsCalculatorSchema>;
