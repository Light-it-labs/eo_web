import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import { forwardRef, tw } from "@eo/shared";

import { Label } from "./Label";
import { Message, type FormErrorType } from "./Message";


export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label: ReactNode;
  containerClassName?: string;
  message?: string;
  compact?: boolean;
  error?: FormErrorType;
}

export const CheckBox = forwardRef(
  (
    {
      label,
      message,
      error,
      id,
      compact,
      style,
      containerClassName,
      className,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <div style={style} className={tw("relative", containerClassName)}>
      <div
        className={tw(
          "flex flex-row items-center rounded-md",
          !!rest.disabled && "opacity-30",
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={id}
          {...rest}
          className={tw(
            "shadow-xs block h-[40px] w-[40px] rounded border-gray-800 text-neutrals-dark-400 placeholder:text-primary-white-600 ",
            "focus:border-secondary-green focus:ring-2 focus:ring-secondary-green-300 sm:text-sm",
            !!error &&
              "border border-red-500 focus:border-red-500 focus:ring-0",
            !!rest.disabled && "border-gray-500 bg-black-100",
            className,
          )}
        />
        <Label
          htmlFor={id}
          className={tw("text-mono", !!error && "text-red-500")}
          containerClassName="ml-2"
          label={label}
        />
      </div>
      {!compact && <Message message={message} error={error} />}
    </div>
  ),
);
