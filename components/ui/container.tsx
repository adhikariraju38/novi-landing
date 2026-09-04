import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8", className)} {...props} />;
}
