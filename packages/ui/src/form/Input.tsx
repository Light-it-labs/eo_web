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
  preventEventsRightIcon?: boolean;
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
      preventEventsRightIcon,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <div style={style} className={tw("relative", containerClassName)}>
      {!!label && <Label htmlFor={id} className="text-mono" label={label} />}
      <div
        className={tw(
          "flex flex-row items-center rounded-md shadow-sm",
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
            "shadow-xs block w-full border-none text-neutrals-dark-400 placeholder:text-primary-white-600 focus:border-secondary-green focus:ring-2 focus:ring-secondary-green-300 sm:text-sm",
            !!error && "border-red focus:border-red focus:ring-red-200",
            !!left && "pl-10",
            !!rest.disabled && "border-gray-500 bg-black-100",
            className,
          )}
          style={{
            paddingRight: right ? rightWidth : undefined,
          }}
        />
        {!!right && (
          <IconWrapper
            className={tw(
              "absolute right-0 flex flex-row items-center justify-center",
              `w-[${rightWidth}px]`,
              preventEventsRightIcon ? "pointer-events-none" : "",
            )}
          >
            {right}
          </IconWrapper>
        )}
      </div>
      {!compact && <Message message={message} error={error} />}
    </div>
  ),
);
