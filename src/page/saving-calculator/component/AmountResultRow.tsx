import { colors, ListRow } from 'tosslib';
import { formatAmount } from '../../../util/amount';

interface AmountResultRowProps {
  label: string;
  amount: number;
}

export const AmountResultRow = ({ label, amount }: AmountResultRowProps) => {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={label}
          topProps={{ color: colors.grey600 }}
          bottom={`${formatAmount(amount)}원`}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
};
