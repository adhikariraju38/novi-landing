import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The custom type scale lives in globals.css, so tailwind-merge can't know about
 * it. Without this, `text-display-md` looks like a colour class and gets dropped
 * whenever it shares a `cn()` call with `text-ink`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md", "lead", "meta"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
