type ButtonType = "button" | "submit" | "reset";

export const Button = ({
  disabled = false,
  text,
  type = 'button'
}: {
  disabled?: boolean;
  text: string;
  type?: ButtonType
}) => {
  return (
    <button
      className={`
        border border-blue-300 text-gray-900 text-2xl p-4 border-solid font-sans
        ${disabled
          ? 'bg-gray-50 opacity-50 cursor-not-allowed'
          : 'bg-blue-200 cursor-pointer hover:bg-blue-300 transition-colors'
        }
      `}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
