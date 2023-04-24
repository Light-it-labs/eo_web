import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import { forwardRef, tw } from "@eo/shared";

import { Label } from "./Label";
import { Message, type FormErrorType } from "./Message";

export interface SelectProps<
  TOptionsValue extends string = string,
  TValue extends TOptionsValue = TOptionsValue,
> extends ComponentPropsWithoutRef<"select"> {
  options:
    | { value: TOptionsValue; label: string }[]
    | readonly { readonly value: TOptionsValue; readonly label: string }[];
  id: string;
  label?: ReactNode;
  containerClassName?: string;
  value?: TValue;
  emptyOption?: string;
  message?: string;
  compact?: boolean;
  error?: FormErrorType;
  disableEmptyOption?: boolean;
}

export const Select = forwardRef(
  <TOptionsValue extends string, TValue extends TOptionsValue>(
    {
      label,
      message,
      error,
      id,
      emptyOption = "Select an Option",
      compact,
      style,
      containerClassName = "",
      className,
      options,
      disableEmptyOption = false,
      ...rest
    }: SelectProps<TOptionsValue, TValue>,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => (
    <div style={style} className={tw("flex flex-col", containerClassName)}>
      {!!label && <Label htmlFor={id} label={label} />}
      <select
        ref={ref}
        className={tw(
          "block w-full mt-1 rounded-md shadow-xs border-gray-300 placeholder:text-black-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 sm:text-sm placeholder-black-300",
          className,
          !!error && "border-red focus:border-red focus:ring-red-200",
        )}
        id={id}
        defaultValue={""}
        {...rest}
      >
        {emptyOption && (
          <option disabled={disableEmptyOption} value="">
            {emptyOption}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {!compact && <Message message={message} error={error} />}
    </div>
  ),
);
