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
      "block pt-1 pb-1 text-xs opacity-80 text-black-800",
      className,
      {
        "text-red": !!error,
      },
    )}
  >
    {error === true ? "\u200b" : !error ? message || "\u200b" : error}
  </p>
);
