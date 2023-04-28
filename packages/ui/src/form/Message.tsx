import { type ComponentPropsWithoutRef } from "react";

import { tw } from "@eo/shared";

export type FormErrorType = string | boolean;

export interface MessageProps extends ComponentPropsWithoutRef<"p"> {
  message?: string;
  error?: FormErrorType;
}

export const Message = ({ message, error, className }: MessageProps) => (
  <p
    className={tw(
      "block pb-1 pt-1 text-xs text-black-800 opacity-80",
      className,
      {
        "text-red-900": !!error,
      },
    )}
  >
    {error === true ? "\u200b" : !error ? message || "\u200b" : error}
  </p>
);
