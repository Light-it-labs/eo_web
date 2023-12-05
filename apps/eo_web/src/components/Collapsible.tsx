import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

import { tw } from "@eo/shared";
import { Typography } from "@eo/ui";





interface CollapsibleProps {
  title: string | JSX.Element;
  children: JSX.Element;
  active?: boolean;
}

export const Collapsible = ({
  active = false,
  children,
  title,
}: CollapsibleProps) => {
  const [open, setOpen] = useState(active);
  return (
    <div>
      <div
        className="flex cursor-pointer flex-row items-center justify-between gap-4 md:items-start"
        onClick={() => setOpen((state) => !state)}
      >
        {typeof title === "string" ? (
          <Typography
            className="text-[20px] leading-[28px]  md:leading-[36px]"
            font="bold"
          >
            {title}
          </Typography>
        ) : (
          title
        )}
        <div>
          {open ? (
            <MinusIcon className="h-8 w-8" />
          ) : (
            <PlusIcon className="h-8 w-8" />
          )}
        </div>
      </div>
      <div
        className={tw(
          "mt-4 flex w-full flex-row overflow-hidden",
          open ? "h-auto" : "h-0",
        )}
        style={{
          transition: "0,4s ease-out",
          willChange: "width height",
        }}
      >
        <div className="mr-4 rounded-full border-4 border-solid border-electric-blue" />
        {children}
      </div>
    </div>
  );
};
