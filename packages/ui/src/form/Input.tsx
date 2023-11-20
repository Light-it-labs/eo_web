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
  compact?: boolean;
  containerClassName?: string;
  error?: FormErrorType;
  id: string;
  label?: ReactNode;
  left?: ReactNode;
  message?: string;
  preventEventsRightIcon?: boolean;
  right?: ReactNode;
  rightWidth?: number;
}

export const Input = forwardRef(
  (
    {
      className,
      compact,
      containerClassName,
      error,
      id,
      label,
      left,
      message,
      preventEventsRightIcon,
      right,
      rightWidth = 40,
      style,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <div style={style} className={tw("relative", containerClassName)}>
      {!!label && <Label htmlFor={id} className="" label={label} />}
      <div
        className={tw(
          "flex flex-row items-center rounded-md",
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
            "block w-full rounded-md border border-gray-200 p-2 text-lg text-neutrals-dark-400 placeholder:text-primary-white-600 focus:border-secondary-green focus:ring-2 focus:ring-secondary-green-300",
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
