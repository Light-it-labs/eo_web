import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";

import { tw } from "@eo/shared";

export interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  label: ReactNode;
  containerClassName?: string;
}

export const Label: FC<LabelProps> = ({
  label,
  containerClassName,
  className,
  ...props
}) => (
  <div className={tw("flex", containerClassName)}>
    {typeof label !== "string" ? (
      label
    ) : (
      <label
        {...props}
        className={tw(
          "m-0 mr-3 text-sm font-medium leading-6 text-neutrals-dark-500",
          className,
        )}
      >
        {label}
      </label>
    )}
  </div>
);
