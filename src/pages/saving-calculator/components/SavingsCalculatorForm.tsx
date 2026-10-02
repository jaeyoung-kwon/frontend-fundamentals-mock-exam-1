import { Controller, useFormContext } from 'react-hook-form';
import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { formatAmountInput } from '../../../savings';
import type { SavingsCalculatorFormValues } from '../schemas/savingsCalculatorSchema';

interface SavingsCalculatorFormProps {
  availableTerms: number[];
}

export const SavingsCalculatorForm = ({ availableTerms }: SavingsCalculatorFormProps) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();

  return (
    <>
      <Controller
        control={control}
        name="targetAmount"
        render={({ field }) => (
          <TextField
            ref={field.ref}
            label="목표 금액"
            placeholder="목표 금액을 입력하세요"
            suffix="원"
            value={field.value}
            onChange={event => {
              const value = formatAmountInput(event.target.value);
              if (value !== null) {
                field.onChange(value);
              }
            }}
          />
        )}
      />
      <Spacing size={16} />
      <Controller
        control={control}
        name="monthlyAmount"
        render={({ field }) => (
          <TextField
            ref={field.ref}
            label="월 납입액"
            placeholder="희망 월 납입액을 입력하세요"
            suffix="원"
            value={field.value}
            onChange={event => {
              const value = formatAmountInput(event.target.value);
              if (value !== null) {
                field.onChange(value);
              }
            }}
          />
        )}
      />
      <Spacing size={16} />
      <Controller
        control={control}
        name="term"
        render={({ field }) => (
          <SelectBottomSheet
            label="저축 기간"
            title="저축 기간을 선택해주세요"
            value={field.value}
            onChange={field.onChange}
          >
            {availableTerms.map(value => (
              <SelectBottomSheet.Option key={value} value={value}>
                {value}개월
              </SelectBottomSheet.Option>
            ))}
          </SelectBottomSheet>
        )}
      />
    </>
  );
};
