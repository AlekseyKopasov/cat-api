import React from 'react';

type ButtonType = "button" | "submit" | "reset";

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
    <button
      className={`
        border border-blue-300 text-gray-900 text-2xl p-4 border-solid font-sans
        relative
        ${disabled || loading
          ? 'bg-gray-50 opacity-50 cursor-not-allowed'
          : 'bg-blue-200 cursor-pointer hover:bg-blue-300 transition-colors'
        }
        ${className}
      `}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="inline-flex items-center">
          <span className="mr-2">Loading...</span>
          <span className="animate-spin">↻</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
};
