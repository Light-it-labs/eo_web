import {
  Switch as SwitchHeadless,
  type SwitchProps as HeadlessSwitchProps,
} from "@headlessui/react";

import { tw } from "@eo/shared";

export interface SwitchProps extends HeadlessSwitchProps<"div"> {
  className?: string;
}
export function Switch({ checked, onChange, className, ...rest }: SwitchProps) {
  return (
    <SwitchHeadless
      checked={checked}
      onChange={onChange}
      className={tw(
        checked ? "bg-primary" : "bg-primary-200",
        "m-2 relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={tw(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block items-center h-4 w-4 transform rounded-full bg-white shadow transition-width duration-200 ease-in-out",
        )}
      />
    </SwitchHeadless>
  );
}
