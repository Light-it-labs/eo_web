import { type FC } from "react";
import { first } from "lodash/fp";

import { tw } from "@eo/shared";

import { AvatarSvg } from "../assets";

interface AvatarProps {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  variant: "initials" | "image" | "icon";
  image?: string;
  name?: string;
  className?: string;
  showName?: boolean;
  positionLabel?: string;
}

export const Avatar: FC<AvatarProps> = ({
  size,
  variant,
  image,
  name,
  className,
  showName = false,
  positionLabel,
}) => {
  return (
    <div className="flex flex-row items-center justify-start">
      <div
        className={tw(
          "bg-primary-400 rounded-full flex flex-col items-center justify-center overflow-hidden",
          className,
          size === "xs" && "h-9 w-9",
          size === "sm" && "h-[28.13px] w-[28.13px]",
          size === "md" && "h-[45px] w-[45px]",
          size === "lg" && "h-[56.25px] w-[56.25px]",
          size === "xl" && "h-[75px] w-[75px]",
          variant === "icon" && "bg-black-500",
        )}
      >
        {variant === "initials" ? (
          <span
            className={tw(
              "font-bold text-white",
              size === "sm" && "text-xs",
              size === "md" && "text-lg",
              size === "lg" && "text-xl",
              size === "xl" && "text-2xl",
            )}
          >
            {name?.split(" ").slice(0, 2).map(first)}
          </span>
        ) : (
          <img
            alt={name || "avatar"}
            src={variant === "image" && image ? image : AvatarSvg}
            className={tw(
              "rounded-full w-full h-full",
              variant === "icon" && "mt-2",
            )}
          />
        )}
      </div>
      {showName && (
        <div className="flex flex-col items-start justify-start ml-3">
          <span
            className={tw(
              "capitalize text-neutrals-dark",
              size === "xl" && "text-3xl font-bold",
              size === "lg" && "text-xl font-bold",
              size === "md" && "text-lg font-semibold",
              size === "sm" && "text-base font-semibold",
              size === "xs" && "text-sm font-medium",
            )}
          >
            {name}
          </span>
          {!!positionLabel && size !== "xl" && size !== "xs" && (
            <span className="text-xs text-black-300 capitalize">
              {positionLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
