import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const tw: typeof clsx = (...params) => twMerge(clsx(...params));
