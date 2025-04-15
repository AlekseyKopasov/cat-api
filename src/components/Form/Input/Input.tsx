import React, { InputHTMLAttributes } from 'react'
import { InputLabel, InputField } from './Input.styled'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  wrapperClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  title,
  className = '',
  wrapperClassName = '',
  ...props
}) => {

  return (
    <InputLabel className={wrapperClassName}>
      <InputField className={className} {...props} />
      <span>{title}</span>
    </InputLabel>
  );
};
