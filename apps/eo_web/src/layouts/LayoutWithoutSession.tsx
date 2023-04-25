import { type ReactNode } from "react";

import { Header } from "~/components/Header";

export const LayoutWithoutSession = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex h-full w-full flex-row overflow-hidden bg-cream-100">
        {children}
      </div>
    </section>
  );
};
