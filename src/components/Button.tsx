import React, { PropsWithChildren } from "react";

import { useStateContext } from "../context/ContextProvider";

interface ButtonProps extends PropsWithChildren {
  icon?: JSX.Element;
  color: string;
  bgColor?: string;
  bgHoverColor?: string;
  size?: string;
  text?: string;
  borderRadius?: string;
  width?: string;
}
const Button: React.FC<ButtonProps> = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
