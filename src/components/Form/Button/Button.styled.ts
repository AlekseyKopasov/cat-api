import styled, { css } from 'styled-components'

type ButtonProps = {
  $disabled?: boolean;
  $loading?: boolean;
};

export const StyledButton = styled.button<ButtonProps>`
  border: 1px solid #93c5fd;
  color: #111827;
  font-size: 1.5rem;
  padding: 1rem;
  border-style: solid;
  font-family: sans-serif;
  position: relative;
  width: 100%;

  ${({ $disabled, $loading }) =>
    $disabled || $loading
      ? css`
          background-color: #f9fafb;
          opacity: 0.5;
          cursor: not-allowed;
        `
      : css`
          background-color: #bfdbfe;
          cursor: pointer;
          &:hover {
            background-color: #93c5fd;
          }
          transition: background-color 0.3s ease;
        `}
`;
