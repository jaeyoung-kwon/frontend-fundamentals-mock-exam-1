import type { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { formatAmount, isValidAmountInput } from '../../../util/amount';
import { SAVINGS_CALCULATOR_FIELD } from '../constant/formFields';
import type { SavingsCalculatorFormValues } from '../schema/savingsCalculatorSchema';

interface SavingsCalculatorFormProps {
  availableTerms: number[];
}

export const SavingsCalculatorForm = ({ availableTerms }: SavingsCalculatorFormProps) => {
  const { control } = useFormContext<SavingsCalculatorFormValues>();

  const handleAmountChange = (onChange: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, '');
    if (!isValidAmountInput(value)) {
      return;
    }

    onChange(value === '' ? '' : formatAmount(Number(value)));
  };

  return (
    <>
      <Controller
        control={control}
        name={SAVINGS_CALCULATOR_FIELD.TARGET_AMOUNT}
        render={({ field }) => (
          <TextField
            ref={field.ref}
            label="목표 금액"
            placeholder="목표 금액을 입력하세요"
            suffix="원"
            value={field.value}
            onChange={handleAmountChange(field.onChange)}
          />
        )}
      />
      <Spacing size={16} />
      <Controller
        control={control}
        name={SAVINGS_CALCULATOR_FIELD.MONTHLY_AMOUNT}
        render={({ field }) => (
          <TextField
            ref={field.ref}
            label="월 납입액"
            placeholder="희망 월 납입액을 입력하세요"
            suffix="원"
            value={field.value}
            onChange={handleAmountChange(field.onChange)}
          />
        )}
      />
      <Spacing size={16} />
      <Controller
        control={control}
        name={SAVINGS_CALCULATOR_FIELD.TERM}
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
