import { css } from '@emotion/react';
import { colors } from 'tosslib';

export const containerStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 200px;
`;

export const statusContainerStyle = css`
  ${containerStyle};
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  text-align: center;
`;

export const errorTextStyle = css`
  margin: 0;
  color: ${colors.grey700};
  overflow-wrap: anywhere;
`;
