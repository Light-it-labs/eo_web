import { type ComponentPropsWithoutRef } from "react";

import { tw, type TextTags } from "@eo/shared";

export const typographyVariants = ["base", "detail", "large", "small"] as const;
export type TypographyVariant = (typeof typographyVariants)[number];

export const typographyFonts = [
  "medium",
  "regular",
  "semiBold",
  "bold",
  "light",
] as const;
export type TypographyFont = (typeof typographyFonts)[number];

export interface TypographyProps extends ComponentPropsWithoutRef<"p"> {
  as?: TextTags;
  variant?: TypographyVariant;
  font?: TypographyFont;
}

export const Typography = ({
  as: Container = "p",
  variant = "base",
  font = "light",
  children,
  className,
  ...props
}: TypographyProps) => {
  return (
    <Container
      className={tw(
        "font-nobel tracking-normal text-gray-900",
        variant === "base" && "text-base",
        variant === "detail" && "text-xs",
        variant === "large" && "font-grand text-4xl",
        variant === "small" && "text-sm",

        font === "medium" && "font-medium",
        font === "regular" && "font-normal",
        font === "semiBold" && "font-semibold",
        font === "bold" && "font-bold",
        font === "light" && "font-light",

        className,
      )}
      {...props}
    >
      {children}
    </Container>
  );
};
