import { useRef, type PropsWithChildren } from "react";

import { tw } from "@eo/shared";

export interface DropdownMenuOption<TId extends string> {
  id: TId;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const DropdownMenu = <TId extends string>({
  options,
  onSelect,
  labelClassName = "",
  className,
  children,
}: PropsWithChildren<{
  options: DropdownMenuOption<TId>[];
  onSelect?: (id: TId) => void;
  labelClassName?: string;
  className?: string;
}>) => {
  const ulRef = useRef<HTMLUListElement>(null);

  return (
    <div className={tw("dropdown-end dropdown text-neutral", className)}>
      <label tabIndex={0} className={labelClassName}>
        {children}
      </label>
      <ul
        ref={ulRef}
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact bg-base-100 text-neutral-content mt-3 w-52 p-2 shadow"
      >
        {options.map((o) => (
          <li key={o.id}>
            <a
              className={o.className}
              onClick={() => {
                ulRef.current?.blur();
                o.onClick?.();
                onSelect?.(o.id);
              }}
            >
              {o.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
