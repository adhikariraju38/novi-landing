"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "./modal";
import { SearchIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  group: string;
  run: () => void;
};

export function CommandPalette() {
  const { active, open, close } = useOverlay();
  const { toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const isOpen = active === "command";

  // Clearing on close (rather than in an effect on open) keeps the palette's
  // state in one place and off the render path.
  const dismiss = useCallback(() => {
    setQuery("");
    setSelected(0);
    close();
  }, [close]);

  const commands = useMemo<Command[]>(() => {
    const jump = (id: string) => () => {
      dismiss();
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };

    return [
      { id: "top", label: "Back to top", group: "Jump to", run: jump("top") },
      {
        id: "features",
        label: "Features",
        group: "Jump to",
        run: jump("features"),
      },
      {
        id: "how",
        label: "How it works",
        group: "Jump to",
        run: jump("how-it-works"),
      },
      {
        id: "pricing",
        label: "Pricing",
        group: "Jump to",
        run: jump("pricing"),
      },
      {
        id: "start",
        label: "Start free",
        group: "Actions",
        run: () => {
          dismiss();
          open("signup");
        },
      },
      {
        id: "demo",
        label: "See how it works",
        group: "Actions",
        run: () => {
          dismiss();
          open("demo");
        },
      },
      {
        id: "contact",
        label: "Talk to the team",
        group: "Actions",
        run: () => {
          dismiss();
          open("contact");
        },
      },
      {
        id: "theme",
        label: "Toggle colour theme",
        group: "Actions",
        run: () => {
          toggle();
          dismiss();
        },
      },
    ];
  }, [dismiss, open, toggle]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(needle));
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (active === "command") close();
        else open("command");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, close, open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (matches.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((index) => (index + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((index) => (index - 1 + matches.length) % matches.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      matches[selected]?.run();
    }
  }

  let lastGroup = "";

  return (
    <Modal open={isOpen} onClose={dismiss} align="top" title={undefined} className="max-w-xl">
      <div className="border-line flex items-center gap-3 border-b px-4">
        <SearchIcon className="text-ink-faint size-4 shrink-0" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search or jump to…"
          aria-label="Search commands"
          role="combobox"
          aria-expanded
          aria-controls="command-list"
          aria-activedescendant={matches[selected] ? `command-${matches[selected].id}` : undefined}
          className="text-ink placeholder:text-ink-faint h-14 w-full bg-transparent text-[0.9375rem] outline-none"
        />
      </div>

      <ul
        ref={listRef}
        id="command-list"
        role="listbox"
        className="max-h-[24rem] overflow-y-auto p-2"
      >
        {matches.length === 0 && (
          <li className="text-ink-faint px-3 py-8 text-center text-sm">
            Nothing matches “{query}”.
          </li>
        )}

        {matches.map((command, index) => {
          const showGroup = command.group !== lastGroup;
          lastGroup = command.group;

          return (
            <li key={command.id}>
              {showGroup && (
                <p className="text-ink-faint px-3 pt-3 pb-1.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase">
                  {command.group}
                </p>
              )}
              <button
                type="button"
                id={`command-${command.id}`}
                role="option"
                aria-selected={index === selected}
                data-index={index}
                onMouseMove={() => setSelected(index)}
                onClick={command.run}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm",
                  "ease-out-quart transition-[background-color,color,transform] duration-150",
                  "active:scale-[0.985] active:duration-75 motion-reduce:active:scale-100",
                  index === selected ? "bg-surface-active text-ink" : "text-ink-muted",
                )}
              >
                {command.label}
              </button>
            </li>
          );
        })}
      </ul>

      <footer className="border-line text-ink-faint flex items-center gap-4 border-t px-4 py-2.5 font-mono text-[0.625rem]">
        <span>↑↓ navigate</span>
        <span>↵ select</span>
        <span>esc close</span>
      </footer>
    </Modal>
  );
}
