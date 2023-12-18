import { type ReactNode } from "react";

import { Header } from "~/components/Header";

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen w-screen flex-col bg-ice-silver">
      <div className="flex h-full w-full flex-col overflow-auto">
        <Header />
        {children}
      </div>
    </section>
  );
};
