import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import { forwardRef, tw } from "@eo/shared";

import { Label } from "./Label";
import { Message, type FormErrorType } from "./Message";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: ReactNode;
  error?: FormErrorType;
  message?: string;
  compact?: boolean;
  containerClassName?: string;
}

// TODO: review if Label really needs those tw classes, we should probably standardize it all

export const TextArea = forwardRef(
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
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div style={style} className={containerClassName}>
        {label && (
          <Label
            className="block text-sm font-medium"
            htmlFor={id}
            label={label}
          />
        )}
        <div className="mt-1">
          <textarea
            ref={ref}
            id={id}
            className={tw(
              "block w-full rounded-md shadow-xs text-neutrals-dark-400 border-gray-300 placeholder:text-primary-white-600 focus:border-secondary-green focus:ring-2 focus:ring-secondary-green-300 sm:text-sm",
              !!error && "border-red focus:border-red focus:ring-red-200",
              !!rest.disabled && "bg-black-100 border-gray-500",
              className,
            )}
            {...rest}
          />
        </div>
        {!compact && <Message message={message} error={error} />}
      </div>
    );
  },
);
