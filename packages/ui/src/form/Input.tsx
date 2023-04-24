import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import { forwardRef, tw } from "@eo/shared";

import { IconWrapper } from "../common";
import { Label } from "./Label";
import { Message, type FormErrorType } from "./Message";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label?: ReactNode;
  containerClassName?: string;
  message?: string;
  compact?: boolean;
  error?: FormErrorType;
  left?: ReactNode;
  right?: ReactNode;
  rightWidth?: number;
}

export const Input = forwardRef(
  (
    {
      label,
      message,
      error,
      id,
      compact,
      left,
      right,
      rightWidth = 40,
      style,
      containerClassName,
      className,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <div style={style} className={tw("relative", containerClassName)}>
      {!!label && <Label htmlFor={id} label={label} />}
      <div
        className={tw(
          "flex flex-row rounded-md shadow-sm items-center",
          !!rest.disabled && "opacity-30",
        )}
      >
        {!!left && (
          <div className="pointer-events-none absolute pl-3">
            <IconWrapper size="sm">{left}</IconWrapper>
          </div>
        )}
        <input
          ref={ref}
          type="text"
          id={id}
          {...rest}
          className={tw(
            "block w-full rounded-md shadow-xs text-neutrals-dark-400 border-gray-300 placeholder:text-primary-white-600 focus:border-secondary-green focus:ring-2 focus:ring-secondary-green-300 sm:text-sm",
            !!error && "border-red focus:border-red focus:ring-red-200",
            !!left && "pl-10",
            !!rest.disabled && "bg-black-100 border-gray-500",
            className,
          )}
          style={{
            paddingRight: right ? rightWidth : undefined,
          }}
        />
        {!!right && (
          <IconWrapper
            className="pointer-events-none absolute right-0"
            style={{ width: rightWidth }}
          >
            {right}
          </IconWrapper>
        )}
      </div>
      {!compact && <Message message={message} error={error} />}
    </div>
  ),
);
