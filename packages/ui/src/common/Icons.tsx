import { type ComponentPropsWithoutRef } from "react";
import * as heroIcons from "@heroicons/react/24/outline";

import { tw } from "@eo/shared";

export type SVGProps = ComponentPropsWithoutRef<"svg">;

export const icons = {
  ...heroIcons,

  SpinnerIcon: ({ className, ...props }: SVGProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="arrow-alt-circle-up"
      role="img"
      className={tw(
        "h-32 w-32 flex-shrink-0 animate-spin stroke-current",
        className,
      )}
      {...props}
    >
      <path
        fill="currentColor"
        d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
      />
    </svg>
  ),
};

export const IconWrapper = ({
  size = "md",
  className,
  style,
  children,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className={tw(
      "flex flex-row item-center",
      size === "sm" && "h-5 w-5",
      size === "md" && "h-6 w-6",
      size === "lg" && "h-6 w-6",
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
