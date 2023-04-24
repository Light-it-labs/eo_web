import { type CSSProperties, type ReactNode } from "react";

import { useUniqueId } from "@eo/hooks";
import { forwardRef, tw } from "@eo/shared";

import { Label } from "./Label";
import { Message, type FormErrorType } from "./Message";
import { Radio } from "./Radio";

export interface RadioGroupProps<
  TOptionId extends string,
  TId extends TOptionId,
> {
  className?: string;
  label?: string;
  children?: ReactNode;
  id?: string;
  options: { id: TOptionId; label: string }[];
  value?: TId;
  name?: string;
  onChange?: (value: TOptionId) => void;
  error?: FormErrorType;
  message?: string;
  style?: CSSProperties;
  compact?: boolean;
}

export const RadioGroup = forwardRef(
  <TOptionId extends string, TId extends TOptionId>({
    options,
    className = "",
    label,
    children,
    value,
    name,
    onChange,
    error,
    message,
    style,
    compact,
  }: RadioGroupProps<TOptionId, TId>) => {
    const uniqueName = useUniqueId(name);

    return (
      <div style={style} className={tw("relative", className)}>
        {!!label && (
          <Label
            className="text-base font-semibold text-gray-900"
            label={label}
          />
        )}
        {children}
        <fieldset className="mt-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-2">
            {options.map(({ id, label }) => (
              <Radio
                id={`${uniqueName} - ${id}`}
                key={id}
                label={label}
                name={uniqueName}
                checked={value === undefined ? value : value === id}
                onChange={() => onChange?.(id)}
              />
            ))}
          </div>
        </fieldset>
        {!compact && <Message message={message} error={error} />}
      </div>
    );
  },
);
