import { css, keyframes } from '@emotion/react';
import { colors } from 'tosslib';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = () => {
  return (
    <div
      role="status"
      aria-label="불러오는 중이에요."
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <span
        aria-hidden="true"
        css={css`
          width: 28px;
          height: 28px;
          border: 3px solid ${colors.grey200};
          border-top-color: ${colors.blue500};
          border-radius: 50%;
          animation: ${spin} 0.8s linear infinite;

          @media (prefers-reduced-motion: reduce) {
            animation: none;
          }
        `}
      />
    </div>
  );
};
