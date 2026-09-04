export const nav = {
  // Every link resolves to a real section, so the scroll indicator always has a target.
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  cta: { label: "Start free", href: "#pricing" },
} as const;

export const hero = {
  eyebrow: "Project management for small teams",
  headline: {
    lead: "Run your team without",
    emphasis: "the tab switching.",
  },
  supporting:
    "Novi brings tasks, docs, and conversations into one calm workspace built for small, fast moving teams.",
  primary: { label: "Start free", href: "#pricing" },
  secondary: { label: "See how it works" },
  note: "Free for up to 5 teammates. No card required.",
} as const;

export const trust = {
  label: "Keeping the day quiet at",
  companies: ["Fieldnote", "Parcel", "Northbound", "Aster", "Kite Studio", "Lumen"],
} as const;

export const features = {
  eyebrow: "What's inside",
  heading: "Everything the work needs, in one place.",
  supporting:
    "No plugins to wire together, no second tool for the conversation. Novi covers the ground a small team actually walks.",
  cards: [
    {
      id: "boards",
      icon: "board",
      title: "Boards that move at your speed",
      body: "Plan sprints and track tasks without hunting through spreadsheets.",
    },
    {
      id: "threads",
      icon: "thread",
      title: "Threads, not another inbox",
      body: "Keep project conversations attached to the work itself.",
    },
    {
      id: "timeline",
      icon: "timeline",
      title: "One timeline for the whole team",
      body: "Every deadline and milestone in one shared view.",
    },
    {
      id: "import",
      icon: "import",
      title: "Works the way you already do",
      body: "Import from Trello, Asana, or a spreadsheet in minutes.",
    },
  ],
} as const;

export const howItWorks = {
  eyebrow: "One workspace",
  heading: "Three views. One source of truth.",
  supporting: "The same work, shown the way each part of the week needs to see it.",
  steps: [
    {
      view: "board",
      title: "See the week at a glance",
      body: "Drag work across columns and everyone sees the change the moment you drop it. No status meeting required.",
    },
    {
      view: "threads",
      title: "Talk where the work lives",
      body: "Conversations stay attached to the task, so the decision and the reason for it never drift into a DM.",
    },
    {
      view: "timeline",
      title: "Know what lands when",
      body: "Deadlines, milestones and handoffs on one shared line, so nobody has to ask where things stand.",
    },
  ],
} as const;

export const callToAction = {
  heading: "Start with one project.",
  emphasis: "See how quiet it gets.",
  supporting: "Free for up to five teammates. No card, no sales call, no migration weekend.",
  primary: { label: "Start free", href: "#pricing" },
  secondary: { label: "Talk to the team", href: "#docs" },
} as const;

export const pricing = {
  eyebrow: "Pricing",
  heading: "Priced for teams, not for seats you never fill.",
  supporting:
    "Start free for five people. Move up when the team actually grows, not when a contract says so.",
  billing: {
    monthly: "Monthly",
    yearly: "Yearly",
    saving: "2 months free",
  },
  plans: [
    {
      id: "free",
      name: "Free",
      tagline: "For a first project, or a team still forming.",
      monthly: 0,
      yearly: 0,
      cta: "Start free",
      featured: false,
      features: [
        "Up to 5 teammates",
        "3 active projects",
        "Board and Threads",
        "7 days of history",
        "Community support",
      ],
    },
    {
      id: "team",
      name: "Team",
      tagline: "For small teams shipping something every week.",
      monthly: 9,
      yearly: 7,
      cta: "Start free trial",
      featured: true,
      badge: "Most picked",
      features: [
        "Unlimited teammates",
        "Unlimited projects",
        "Timeline and milestones",
        "Full history and search",
        "Trello, Asana and Sheets import",
        "Priority email support",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      tagline: "For agencies running work across several clients.",
      monthly: 18,
      yearly: 15,
      cta: "Talk to the team",
      featured: false,
      features: [
        "Everything in Team",
        "Separate client workspaces",
        "Free guest seats for clients",
        "SSO and SCIM provisioning",
        "Audit log and admin controls",
        "Shared support channel",
      ],
    },
  ],
  footnote:
    "Every plan bills per active teammate, and only for people who opened Novi that month. Cancel whenever, and export everything on the way out.",
} as const;

export const signup = {
  title: "Start free",
  description: "Five teammates, three projects, no card.",
  placeholder: "you@team.com",
  action: "Create workspace",
  success: "Check your inbox",
  successBody: "We've sent a link to finish setting up your workspace.",
  note: "By continuing you agree to the Terms and the Privacy Policy.",
} as const;

export const contact = {
  title: "Talk to the team",
  description: "Three of us build Novi. You'll get one of us, not a queue.",
  emailLabel: "Work email",
  messageLabel: "What are you trying to work out?",
  placeholder: "you@team.com",
  messagePlaceholder:
    "We're a nine person studio moving off Trello and a lot of spreadsheets\u2026",
  action: "Send message",
  success: "Message sent",
  successBody: "We answer within a working day, usually sooner.",
} as const;

export const footer = {
  tagline: "One calm workspace for small, fast moving teams.",
  groups: [
    {
      title: "Product",
      links: ["Features", "Integrations", "Changelog", "Roadmap"],
    },
    { title: "Company", links: ["About", "Careers", "Blog", "Customers"] },
    {
      title: "Resources",
      links: ["Docs", "Guides", "API reference", "Status"],
    },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
  ],
  newsletter: {
    title: "The monthly note",
    body: "Product news and a few notes on how small teams stay fast. Once a month, nothing else.",
    placeholder: "you@team.com",
    action: "Subscribe",
    success: "You're on the list.",
  },
  socials: [
    { label: "X", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  copyright: `© ${new Date().getFullYear()} Novi Labs, Inc.`,
} as const;
