export const formatAmount = (amount: number) => {
  return amount.toLocaleString('ko-KR', { maximumFractionDigits: 0 });
};

// 빈 입력과 쉼표가 포함된 0 이상의 안전한 정수를 허용해요.
export const isValidAmountInput = (value: string): boolean => {
  const digits = value.replace(/,/g, '');
  if (digits === '') {
    return true;
  }
  return /^\d+$/.test(digits) && Number.isSafeInteger(Number(digits));
};
