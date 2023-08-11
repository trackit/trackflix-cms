import { ReactNode, FC } from "react";

interface ButtonProps {
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  color,
  children,
  onClick,
}) => {
  return (
    <button
      className={`bg-${color}-300 hover:brightness-110 hover:drop-shadow-xl text-black py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
