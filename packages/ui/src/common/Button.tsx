import { type ComponentPropsWithoutRef, type ForwardedRef } from "react";

import { forwardRef, tw } from "@eo/shared";

import { IconWrapper } from "./Icons";
import { Typography, type TypographyFont } from "./Typography";


export const buttonVariants = [
  "primary",
  "outline",
  "outline-white",
  "secondary",
  "tertiary-link",
  "white",
  "black",
] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  left?: React.ReactNode;
  right?: React.ReactNode;
  font?: TypographyFont;
}

export const Button = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      left,
      right,
      size = "md",
      type = "button",
      variant = "primary",
      font = "regular",
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      className={tw(
        "flex h-12 flex-row items-center justify-between gap-2 border border-transparent text-center focus:outline-none",
        "rounded-[37.3px] focus:ring-2 focus:ring-offset-0",
        !left && !right && "justify-center",
        variant === "primary" &&
        "bg-primary text-black hover:bg-primary-900 focus:bg-primary focus:ring-primary-100",
        variant === "outline" &&
        "border-primary text-primary hover:border-primary-800 hover:text-primary-800 focus:ring-primary-100",
        variant === "outline-white" &&
        "border-primary-white-500 text-primary-white-500 focus:ring-0",
        variant === "secondary" &&
        "bg-primary-50 text-primary-400 hover:bg-primary-100 focus:bg-primary-50 focus:ring-primary-100",
        variant === "tertiary-link" &&
        "text-primary hover:text-primary-700 focus:text-primary-700 focus:ring-1 focus:ring-primary-700",
        variant === "white" &&
        "bg-white text-black shadow-lg hover:outline focus:outline focus:ring-1 focus:ring-primary-900",
        variant === "black" &&
        "bg-black text-white shadow-lg hover:outline focus:outline focus:ring-1 focus:ring-primary-900",

        size === "sm" && "px-4 py-2 text-sm leading-[17px]",
        size === "md" && "px-[18px] py-3 text-base leading-5",
        size === "lg" && "px-7 py-4 text-lg leading-[22px]",

        disabled && [
          variant === "primary" && "text-black",
          variant === "outline" &&
          "border-primary-dark-200 text-primary-white-600",
          variant === "outline-white" &&
          "border-primary-white-700 text-primary-white-700",
          variant === "secondary" &&
          "bg-primary-dark-50 text-primary-white-600",
          variant === "tertiary-link" && "text-primary-white-600",
          variant === "white" && "text-primary-white-600",
          variant === "black" && "text-primary-white-600",
        ],

        !children && [
          size === "sm" && "p-2",
          size === "md" && "p-3",
          size === "lg" && "p-4",
        ],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        {left && <IconWrapper size={size}>{left}</IconWrapper>}
        <Typography
          variant="base"
          font={font}
          className={tw(
            variant === "primary" && "text-black",
            variant === "outline" && "text-primary",
            variant === "outline-white" && "text-primary-white-500",
            variant === "secondary" && "text-primary-400",
            variant === "tertiary-link" && "text-black",
            variant === "white" && "text-black",
            variant === "black" && "text-white",
          )}
        >
          {children}
        </Typography>
      </div>
      {right && <IconWrapper size={size}>{right}</IconWrapper>}
    </button>
  ),
);
