import { InputHTMLAttributes } from 'react';

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
    <label className={`flex gap-2 items-center text-xl font-sans cursor-pointer ${wrapperClassName}`}>
      <input
        className={`w-6 h-6 border border-blue-300 ${className}`}
        {...props}
      />
      <span>{title}</span>
    </label>
  );
};
