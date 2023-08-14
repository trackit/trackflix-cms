import { ReactNode, FC, ButtonHTMLAttributes}  from "react";
import SvgIcon, {SvgIconTypeMap} from "@mui/material/SvgIcon"
import Colors from "tailwindcss/colors"

type SvgIconComponent = typeof SvgIcon;
type TailwindColor = keyof typeof Colors;

type IconColor = SvgIconTypeMap["props"]["color"];

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  color?: TailwindColor,
  children?: ReactNode
};

interface IconButtonProps extends Omit<ButtonProps, 'color'> {
  icon: SvgIconComponent,
  color?: IconColor,
}

export const Button: FC<ButtonProps> = ({
  color,
  children,
  className,
  ...attr
}) => {

  const backgroundColor =  color ? "bg-" + color + "-500": "bg-slate-200";
  const defaultClasseName = `${ backgroundColor } hover:brightness-110 hover:drop-shadow-xl text-black py-2 px-4 rounded`

  return (
    <button
      className={className ? defaultClasseName + " " + className : defaultClasseName}
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