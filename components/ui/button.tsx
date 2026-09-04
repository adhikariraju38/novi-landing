import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * Buttons sit on a solid bottom ridge that collapses on press, so clicking one
 * feels like pushing a physical key rather than swapping a background colour.
 */
const base =
  "group/btn inline-flex select-none items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out-quart " +
  "active:duration-75 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-accent text-accent-ink shadow-[0_2px_0_0_var(--accent-deep)]",
    "hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-accent-hover hover:shadow-[0_4px_0_0_var(--accent-deep),0_10px_22px_-10px_var(--accent-deep)]",
    "active:translate-y-px active:scale-[0.98] active:shadow-[0_0_0_0_var(--accent-deep)]",
    "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
  ),
  secondary: cn(
    "border border-line bg-surface text-ink shadow-[0_2px_0_0_var(--line)]",
    "hover:-translate-y-0.5 hover:scale-[1.015] hover:border-line-strong hover:shadow-[0_4px_0_0_var(--line-strong)]",
    "active:translate-y-px active:scale-[0.98] active:shadow-[0_0_0_0_var(--line-strong)]",
    "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
  ),
  ghost: cn(
    "text-ink-muted hover:bg-surface-active hover:text-ink",
    "hover:scale-[1.03] active:scale-[0.96] motion-reduce:hover:scale-100",
  ),
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & (
  | ({ href: string } & React.ComponentPropsWithoutRef<"a">)
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
);

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const anchorProps = props as React.ComponentPropsWithoutRef<"a"> & { href: string };
    // Route changes go through Link; "#section" anchors are same-page and don't need it.
    if (anchorProps.href.startsWith("/")) {
      return <Link className={classes} {...anchorProps} href={anchorProps.href} />;
    }
    return <a className={classes} {...anchorProps} />;
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as React.ComponentPropsWithoutRef<"button">)}
    />
  );
}
