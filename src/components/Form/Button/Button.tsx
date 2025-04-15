import React from 'react'
import { StyledButton, ButtonContent, Spinner, LoadingIcon } from './Button.styled'

type ButtonType = "button" | "submit" | "reset"

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  text: string;
  type?: ButtonType;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  text,
  type = 'button',
  className = '',
}) => {
  return (
    <StyledButton
      type={type}
      $disabled={disabled}
      $loading={loading}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? (
        <ButtonContent>
          <Spinner>Loading...</Spinner>
          <LoadingIcon>↻</LoadingIcon>
        </ButtonContent>
      ) : (
        text
      )}
    </StyledButton>
  );
};
