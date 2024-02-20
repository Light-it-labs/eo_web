import { type ReactNode } from "react";

import { tw } from "@eo/shared";

import { Header } from "~/components/Header";


export const LayoutDefault = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={tw("flex h-screen w-screen flex-col bg-ice-silver", className)}
    >
      <div className="flex h-full w-full flex-col overflow-auto">
        <Header />
        {children}
      </div>
    </section>
  );
};
