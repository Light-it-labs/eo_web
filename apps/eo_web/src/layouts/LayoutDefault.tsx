import { type ReactNode } from "react";

import { Header } from "~/components/Header";

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex h-screen w-screen flex-col bg-cream-100">
      <div className="flex h-full w-full flex-col gap-y-10 overflow-auto pb-4">
        <Header />
        {children}
      </div>
    </section>
  );
};
