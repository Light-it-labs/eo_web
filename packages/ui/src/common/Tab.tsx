import { type ComponentPropsWithoutRef } from "react";

import { tw } from "@eo/shared";

export interface TabProps extends ComponentPropsWithoutRef<"button"> {
  value: string;
  isSelected: boolean;
}

export const Tab = ({ value, isSelected, className, ...props }: TabProps) => (
  <button
    className={tw(
      "inline-flex items-center border-b-2 px-4 pt-4 pb-6 text-base leading-4 font-medium focus:outline-none focus-visible:none",
      isSelected
        ? "border-primary-400 text-neutrals-dark-200"
        : "border-transparent text-neutrals-medium",
      className,
    )}
    aria-current={isSelected ? "page" : undefined}
    {...props}
  >
    {value}
  </button>
);
