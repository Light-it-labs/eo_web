import {
  useState,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import { forwardRef, tw } from "@eo/shared";

import { IconWrapper, icons } from "../common";
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
  type?: string;
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
      type = "text",
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div style={style} className={tw("relative ", containerClassName)}>
        {!!label && <Label htmlFor={id} className="" label={label} />}
        <div
          className={tw(
            "flex flex-row items-center rounded-md",
            !!rest.disabled && "opacity-30",
          )}
        >
          {(!!left || type === "password") && (
            <div className="pointer-events-none absolute pl-3">
              <IconWrapper size="sm">
                {left || (
                  <icons.LockIcon
                    className={tw(
                      "h-32 w-32 cursor-pointer fill-gray-800 stroke-gray-800 stroke-[.2px]",
                      !!error && "fill-red-500 stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                )}
              </IconWrapper>
            </div>
          )}
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            id={id}
            {...rest}
            className={tw(
              "block h-[46px] w-full rounded-md border border-gray-200 px-2 py-3 font-nunito text-[16px] text-lg",
              "font-normal text-gray-700 placeholder:text-primary-white-600 focus:border-secondary-green focus:ring-2",
              "focus:ring-secondary-green-300 ",
              "placeholder:text-[16px] placeholder:font-normal placeholder:leading-normal placeholder:text-gray-700",
              "rounded border-solid border-gray-800",
              (!!left || type === "password") && "pl-10",
              !!rest.disabled && "border-gray-500 bg-black-100",
              !!error && "border-red-500 focus:border-red focus:ring-red-200",
              className,
            )}
            style={{
              paddingRight:
                right || type === "password" ? rightWidth : undefined,
            }}
          />
          {(!!right || type === "password") && (
            <IconWrapper
              size="sm"
              className={tw(
                "absolute right-0 flex flex-row items-center justify-center",
                `w-[${rightWidth}px]`,
                preventEventsRightIcon ? "pointer-events-none" : "",
              )}
            >
              {right ||
                (showPassword ? (
                  <icons.ClosedEye
                    className={tw(
                      "h-5 w-5 cursor-pointer stroke-[.2px] text-gray-800",
                      !!error && "fill-red-500 stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ) : (
                  <icons.EyeIcon
                    className={tw(
                      "h-5 w-5 cursor-pointer text-gray-800",
                      !!error && "stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ))}
            </IconWrapper>
          )}
        </div>
        {!compact && <Message message={message} error={error} />}
      </div>
    );
  },
);
