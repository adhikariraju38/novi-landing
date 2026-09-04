export type ColumnId = "todo" | "doing" | "shipped";

export type Task = {
  id: string;
  title: string;
  tag: string;
  initials: string;
  /** Only present on in-progress work; drives the thin accent bar on the card. */
  progress?: number;
  comments?: number;
};

export type Column = {
  id: ColumnId;
  title: string;
  taskIds: string[];
};

export const tasks: Record<string, Task> = {
  "t-1": {
    id: "t-1",
    title: "Import the Trello board",
    tag: "Setup",
    initials: "RK",
    comments: 2,
  },
  "t-2": {
    id: "t-2",
    title: "Draft Q3 roadmap",
    tag: "Planning",
    initials: "AM",
  },
  "t-3": {
    id: "t-3",
    title: "Empty state for onboarding",
    tag: "Bug",
    initials: "JD",
    comments: 4,
  },
  "t-4": {
    id: "t-4",
    title: "Design pass on settings",
    tag: "Design",
    initials: "AM",
    progress: 0.6,
    comments: 3,
  },
  "t-5": {
    id: "t-5",
    title: "Search across docs",
    tag: "Feature",
    initials: "RK",
    progress: 0.35,
  },
  "t-6": {
    id: "t-6",
    title: "Auth and invite flow",
    tag: "Feature",
    initials: "JD",
  },
  "t-7": {
    id: "t-7",
    title: "Mobile navigation",
    tag: "Design",
    initials: "AM",
  },
};

export const initialColumns: Column[] = [
  { id: "todo", title: "To do", taskIds: ["t-1", "t-2", "t-3"] },
  { id: "doing", title: "In progress", taskIds: ["t-4", "t-5"] },
  { id: "shipped", title: "Shipped", taskIds: ["t-6", "t-7"] },
];

export const thread = {
  task: "Design pass on settings",
  messages: [
    {
      id: "m-1",
      author: "Ana Moreau",
      initials: "AM",
      time: "9:12",
      body: "Moved billing under its own tab. The single scroll was getting long enough that people missed the plan switcher.",
    },
    {
      id: "m-2",
      author: "Jonah Diaz",
      initials: "JD",
      time: "9:40",
      body: "Agreed. Can we keep the danger zone at the bottom though? Muscle memory from the old build.",
    },
    {
      id: "m-3",
      author: "Ana Moreau",
      initials: "AM",
      time: "9:41",
      body: "Yes, staying put. Pushing the update in a minute.",
    },
  ],
} as const;

export type Milestone = {
  id: string;
  label: string;
  date: string;
  lane: number;
  /** Fractions of the timeline width, so bars stay put at any container size. */
  start: number;
  width: number;
  done?: boolean;
  isMilestone?: boolean;
};

export const milestones: Milestone[] = [
  {
    id: "ms-1",
    label: "Design review",
    date: "Jun 4",
    lane: 0,
    start: 0.02,
    width: 0.24,
    done: true,
  },
  {
    id: "ms-2",
    label: "Settings rebuild",
    date: "Jun 9",
    lane: 1,
    start: 0.16,
    width: 0.36,
    done: true,
  },
  {
    id: "ms-3",
    label: "Docs search",
    date: "Jun 17",
    lane: 2,
    start: 0.34,
    width: 0.3,
  },
  {
    id: "ms-4",
    label: "Beta invites",
    date: "Jun 24",
    lane: 0,
    start: 0.56,
    width: 0.26,
  },
  {
    id: "ms-5",
    label: "v2 launch",
    date: "Jul 1",
    lane: 1,
    start: 0.72,
    width: 0.24,
    isMilestone: true,
  },
];

export const weekDays = ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] as const;
