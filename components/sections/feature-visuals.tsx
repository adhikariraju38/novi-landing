import { NoviMark } from "@/components/icons";
import { cn } from "@/lib/utils";

const frame = "relative h-28 overflow-hidden rounded-lg border border-line bg-surface-sunken p-3";

/** Stand-in for a line of text inside the miniature UI. */
function Line({ className }: { className?: string }) {
  return <span className={cn("bg-line-strong block h-1 rounded-full", className)} />;
}

function MiniCard({ accent, className }: { accent?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface rounded border px-1.5 py-1.5 shadow-[0_1px_1px_rgb(0_0_0/0.03)]",
        accent ? "border-accent/40" : "border-line",
        className,
      )}
    >
      <Line className={cn("w-full", accent && "bg-accent/60")} />
      <Line className="mt-1 w-2/3" />
    </div>
  );
}

const columnLabel = "mb-1.5 block h-0.5 w-1/2 rounded-full bg-line-strong";

/** Hover states are pure CSS, so a page full of these stays cheap to render. */
export function BoardVisual() {
  return (
    <div className={frame}>
      <div className="grid h-full grid-cols-3 gap-1.5">
        <div>
          <span className={columnLabel} />
          <div className="space-y-1.5">
            <MiniCard />
            <MiniCard className="ease-out-quart transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-0" />
          </div>
        </div>
        <div>
          <span className={columnLabel} />
          <div className="space-y-1.5">
            <MiniCard accent />
            <MiniCard className="ease-out-quart origin-top scale-y-0 opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100" />
          </div>
        </div>
        <div>
          <span className={columnLabel} />
          <MiniCard />
        </div>
      </div>
    </div>
  );
}

export function ThreadVisual() {
  const bubble = "rounded-lg border px-2 py-1.5";

  return (
    <div className={frame}>
      <div className="flex flex-col gap-1.5">
        <div className={cn(bubble, "border-line bg-surface w-3/5")}>
          <Line className="w-full" />
          <Line className="mt-1 w-1/2" />
        </div>
        <div className={cn(bubble, "border-accent/30 bg-accent-soft w-1/2 self-end")}>
          <Line className="bg-accent/50 w-full" />
        </div>
        <div
          className={cn(
            bubble,
            "border-line bg-surface ease-out-quart w-2/5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
            "-translate-y-1",
          )}
        >
          <Line className="w-full" />
        </div>
      </div>
    </div>
  );
}

export function TimelineVisual() {
  const bars = [
    {
      offset: "0%",
      width: "w-1/2",
      accent: false,
      grow: "group-hover:w-[58%]",
    },
    { offset: "18%", width: "w-2/5", accent: true, grow: "group-hover:w-1/2" },
    {
      offset: "40%",
      width: "w-1/3",
      accent: false,
      grow: "group-hover:w-[38%]",
    },
  ];

  return (
    <div className={frame}>
      <div className="pointer-events-none absolute inset-y-3 left-3 flex w-[calc(100%-1.5rem)]">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={cn("flex-1", index > 0 && "border-line border-l")} />
        ))}
      </div>

      <div className="relative flex h-full flex-col justify-center gap-2">
        {bars.map((bar) => (
          <span
            key={bar.offset}
            style={{ marginLeft: bar.offset }}
            className={cn(
              "ease-out-quart h-3.5 rounded border transition-all duration-500",
              bar.width,
              bar.grow,
              bar.accent ? "border-accent/30 bg-accent-soft" : "border-line bg-surface",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function ImportVisual() {
  return (
    <div className={frame}>
      <div className="flex h-full items-center justify-center gap-1.5">
        {["Trello", "Asana", "Sheets"].map((source, index) => (
          <span
            key={source}
            style={{ transitionDelay: `${index * 50}ms` }}
            className="border-line bg-surface text-ink-faint ease-out-quart rounded-md border px-1.5 py-1 font-mono text-[0.5625rem] transition-transform duration-500 group-hover:-translate-x-1"
          >
            {source}
          </span>
        ))}
        <span className="text-ink-faint ease-out-quart text-sm transition-transform duration-500 group-hover:translate-x-0.5">
          →
        </span>
        <NoviMark className="text-accent ease-out-quart size-7 shrink-0 transition-transform duration-500 group-hover:scale-110" />
      </div>
    </div>
  );
}

export const featureVisuals = {
  boards: BoardVisual,
  threads: ThreadVisual,
  timeline: TimelineVisual,
  import: ImportVisual,
} as const;
