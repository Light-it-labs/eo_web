import { type ComponentPropsWithoutRef } from "react";

import { tw } from "@eo/shared";

export const Main = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"main">) => (
  <main
    className={tw(
      className,
      "container mx-auto flex h-full flex-col items-center justify-around p-4 pb-16",
    )}
    {...props}
  >
    {children}
  </main>
);
