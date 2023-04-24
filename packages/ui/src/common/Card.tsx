import { type HTMLAttributes, type ReactNode } from "react";

import { tw, type DivLikeTags } from "@eo/shared";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: DivLikeTags;
  header?: ReactNode;
  innerClassName?: string;
};

export const Card = ({
  children,
  className,
  innerClassName,
  header,
  as: Container = "div",
  ...props
}: CardProps) => (
  <Container
    className={tw("overflow-hidden rounded-lg bg-white shadow", className)}
    {...props}
  >
    {header}
    <div className={tw("flex flex-auto flex-col gap-2 p-8", innerClassName)}>
      {children}
    </div>
  </Container>
);
