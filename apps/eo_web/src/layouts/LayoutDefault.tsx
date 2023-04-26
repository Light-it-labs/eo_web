import { type ReactNode } from "react";

import { Header } from "~/components/Header";

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen w-screen flex-col">
      <div className="flex h-full w-full flex-col overflow-hidden bg-cream-100">
        <Header />
        {children}
      </div>
    </section>
  );
};
