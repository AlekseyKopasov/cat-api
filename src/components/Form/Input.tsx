import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const Input = (props: InputProps) => {
  const { title, ...otherProps } = props

  return (
    <label className='flex gap-2 items-center text-xl font-sans cursor-pointer'>
      <input className="w-6 h-6 border border-blue-300" {...otherProps} />
      <span>{title}</span>
    </label>
  )
}
