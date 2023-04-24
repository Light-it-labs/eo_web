import { type ReactNode } from "react";

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <section className=" flex h-screen w-screen flex-row">
      <div className=" flex h-full w-full flex-row overflow-hidden bg-red-200">
        {children}
      </div>
    </section>
  );
};
