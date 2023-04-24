import { type ComponentPropsWithoutRef } from "react";

import { tw } from "@eo/shared";

import { icons } from "./Icons";

export type PillProps = ComponentPropsWithoutRef<"button"> & {
  onClose?: () => void;
  textClassName?: string;
  disabled?: boolean;
};

export const Pill = ({
  children,
  className,
  textClassName,
  disabled,
  onClose,
  ...props
}: PillProps) => (
  <button
    className={tw(
      "flex max-w-full flex-row cursor-auto items-center justify-center",
      "gap-2 rounded-full bg-accent px-4 py-2",
      "text-base font-medium uppercase leading-tight text-accent-content shadow-md",
      disabled ? "bg-opacity-50" : "bg-accent-focus",
      !!onClose && "pr-2",
      !!props.onClick && "cursor-pointer select-none",
      className,
    )}
    {...props}
  >
    <span
      className={tw(
        "overflow-hidden text-ellipsis whitespace-nowrap",
        textClassName,
      )}
    >
      {children}
    </span>
    {onClose && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          onClose();
        }}
      >
        <icons.XMarkIcon className="h-4 w-4" />
      </button>
    )}
  </button>
);
