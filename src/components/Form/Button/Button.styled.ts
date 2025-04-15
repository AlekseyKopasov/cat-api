import styled, { css } from 'styled-components'

type ButtonProps = {
  $disabled?: boolean;
  $loading?: boolean;
};

export const StyledButton = styled.button<ButtonProps>`
  border: 1px solid #93c5fd; /* blue-300 */
  color: #111827; /* gray-900 */
  font-size: 1.5rem; /* text-2xl */
  padding: 1rem; /* p-4 */
  border-style: solid;
  font-family: sans-serif;
  position: relative;
  width: 100%;

  ${({ $disabled, $loading }) =>
    $disabled || $loading
      ? css`
          background-color: #f9fafb; /* gray-50 */
          opacity: 0.5;
          cursor: not-allowed;
        `
      : css`
          background-color: #bfdbfe; /* blue-200 */
          cursor: pointer;
          &:hover {
            background-color: #93c5fd; /* blue-300 */
          }
          transition: background-color 0.3s ease;
        `}
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const Spinner = styled.span`
  margin-right: 0.5rem;
`;

export const LoadingIcon = styled.span`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
