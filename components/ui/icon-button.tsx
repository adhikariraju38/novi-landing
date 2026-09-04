import { cn } from "@/lib/utils";

/** Square icon control with the same press physics as Button, minus the ridge. */
export function IconButton({ className, ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "text-ink-muted grid size-9 shrink-0 place-items-center rounded-md",
        "ease-out-quart transition-[transform,background-color,color] duration-200",
        "hover:bg-surface-active hover:text-ink hover:scale-110",
        "active:scale-90 active:duration-75",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        className,
      )}
      {...props}
    />
  );
}
