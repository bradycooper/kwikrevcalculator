import clsx from "clsx"
import { twMerge } from "tailwind-merge"
// import { twMerge } from '../../node_modules/tailwindcss';

export const Cn = (...inputs) => {
  return twMerge(clsx(...inputs))
}
