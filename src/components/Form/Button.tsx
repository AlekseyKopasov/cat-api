type ButtonType = "button" | "submit" | "reset";

export const Button = ({ text, type = 'button' }: { text: string, type: ButtonType }) => {
  return (
    <button className="border border-blue-300 bg-blue-200 text-gray-900 text-2xl p-4 border-solid font-sans cursor-pointer" type={type}>{text}</button>
  )
}
