import type { z } from 'zod';
import type { savingsCalculatorTabSchema } from '../schema/savingsCalculatorTabSchema';

export type SavingsCalculatorTab = z.infer<typeof savingsCalculatorTabSchema>;
