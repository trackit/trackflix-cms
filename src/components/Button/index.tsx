import { ReactNode, FC, ButtonHTMLAttributes}  from "react";
import SvgIcon, {SvgIconTypeMap} from "@mui/material/SvgIcon"


type SvgIconComponent = typeof SvgIcon;

type IconColor = SvgIconTypeMap["props"]["color"];

const colorMap = {
  "primary": "bg-slate-200",
  "secondary": "bg-green-500",
  "danger": "bg-red-500",
  "warning": "bg-yellow-500",
  "success": "bg-green-500",
  "info": "bg-blue-500",
  "disabled": "bg-gray-200",
  "transparent": "bg-transparent",
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  color: keyof typeof colorMap,
  children?: ReactNode
};

interface IconButtonProps extends Omit<ButtonProps, 'color'> {
  icon: SvgIconComponent,
  color?: IconColor,
}


export const Button: FC<ButtonProps> = ({
  color = "primary",
  children,
  className,
  ...attr
}) => {
  const defaultClasseName = `${ colorMap[color] } hover:brightness-110 hover:drop-shadow-xl text-black py-2 px-4 rounded`
  return (
    <button
    className={`${defaultClasseName}`}
    {...attr}
    >
      {children}
    </button>
  );
}

export const IconButton: FC<IconButtonProps> = ({
  icon: Icon,
  color,
  className,
  ...attr
}) => {

  const hover = color !== "disabled" ? "hover:scale-110" : "";
  const cursor = color !== "disabled" ? "cursor-pointer" : "cursor-auto";

  return (
    <Button color="transparent" className={`p-1 py-2 ${hover} ${cursor} ${className ? className : ""} `} {...attr}>
      <Icon color={color} />
    </Button>
  );
};