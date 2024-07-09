import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const tw: (...inputs: clsx.ClassValue[]) => string = (...params) =>
  twMerge(clsx(params));
