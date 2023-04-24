import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { tw } from "@eo/shared";

import { Tab } from "./Tab";

export interface TabsProps<TTab extends string, TTabValue extends TTab>
  extends Omit<ComponentPropsWithoutRef<"nav">, "onChange" | "value"> {
  tabs: readonly TTab[] | TTab[];
  value: TTabValue;
  onChange: (tab: TTab) => void;
  renderTab?: (params: {
    tab: TTab;
    onClick: () => void;
    selected: boolean;
  }) => ReactNode;
}

export const Tabs = <TTab extends string, TTabValue extends TTab>({
  tabs,
  className,
  value,
  onChange,
  renderTab,
  ...props
}: TabsProps<TTab, TTabValue>) => (
  <nav
    aria-label="Tabs"
    {...props}
    className={tw("flex flex-row bg-black-100", className)}
  >
    {tabs.map((tab) =>
      renderTab ? (
        renderTab({
          tab,
          onClick: () => onChange(tab),
          selected: tab === value,
        })
      ) : (
        <Tab
          key={tab}
          value={tab}
          isSelected={tab === value}
          onClick={() => onChange(tab)}
        />
      ),
    )}
  </nav>
);
