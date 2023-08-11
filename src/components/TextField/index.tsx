import { FC } from "react"

interface TextFieldProps {
  placeholder?: string;
  borderColor?: string;
  required?: boolean;
  value: string;
  onChange: any;
}

export const TextField: FC<TextFieldProps> = ({
  placeholder = '',
  borderColor = 'blue',
  required = false,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      className={`border rounded p-2 focus:outline-none focus:border-${borderColor}-500`}
      placeholder={`${placeholder}${required ? '*' : ''}`}
      onChange={onChange}
      value={value}
      required={required}
    />
  );
}
