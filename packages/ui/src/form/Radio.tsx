import { type ComponentPropsWithoutRef, type ForwardedRef } from "react";

import { forwardRef, tw } from "@eo/shared";

export interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const Radio = forwardRef(
  (
    { label, id, className, ...props }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          id={id}
          type="radio"
          value={id}
          className={tw(
            "h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      </div>
    );
  },
);
