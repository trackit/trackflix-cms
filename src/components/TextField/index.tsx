import { FC, InputHTMLAttributes } from "react"

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>

export const TextField: FC<TextFieldProps> = ({
  placeholder = '',
  required = false,
  onChange,
  ...attr
}) => {
  return (
    <input
      type="text"
      className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      placeholder={`${placeholder}${required ? '*' : ''}`}
      {...attr}
    />
  );
}
