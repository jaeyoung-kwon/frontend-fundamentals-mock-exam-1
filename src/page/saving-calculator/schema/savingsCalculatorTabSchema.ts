import { z } from 'zod';

export const savingsCalculatorTabSchema = z.enum(['products', 'results']);
