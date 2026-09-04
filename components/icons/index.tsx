import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BoardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="5.5" height="16" rx="1.5" />
      <rect x="9.25" y="4" width="5.5" height="10" rx="1.5" />
      <rect x="15.5" y="4" width="5.5" height="13" rx="1.5" />
    </Icon>
  );
}

export function ThreadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v5A1.5 1.5 0 0 1 14.5 12H8l-4 3z" />
      <path d="M19 9.5a1.5 1.5 0 0 1 1 1.4v5.6a1.5 1.5 0 0 1-1.5 1.5H12l-2.5 2v-2" />
    </Icon>
  );
}

export function TimelineIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 6h11M3 12h7M3 18h13" />
      <circle cx="17.5" cy="6" r="2" />
      <circle cx="13.5" cy="12" r="2" />
      <circle cx="19.5" cy="18" r="2" />
    </Icon>
  );
}

export function ImportIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v10" />
      <path d="m8.5 9.5 3.5 3.5 3.5-3.5" />
      <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 13.5A8 8 0 0 1 10.5 4a8 8 0 1 0 9.5 9.5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Icon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </Icon>
  );
}

export function GripIcon(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={2}>
      <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" />
    </Icon>
  );
}

export function CommentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4z" />
    </Icon>
  );
}

export function NoviMark(props: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
      <rect width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="M9 19V9.8c0-.5.6-.8 1-.4l8 8.8c.4.4 1 .1 1-.4V9"
        stroke="var(--accent-ink)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const socialIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.53 3h3.05l-6.67 7.62L21.75 21h-6.13l-4.8-6.28L5.3 21H2.25l7.13-8.15L2.25 3h6.29l4.34 5.74zm-1.07 16.17h1.69L7.62 4.73H5.8z" />
    </svg>
  ),
  GitHub: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.570 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.2 9.2 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  LinkedIn: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0M3.4 21h3.1V8.9H3.4zm6.06 0h3.1v-6.36c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.92 2.08 3.4V21h3.1v-6.9c0-3.2-.69-5.44-4.43-5.44-1.8 0-3 .99-3.5 1.92h-.04V8.9h-2.7z" />
    </svg>
  ),
};
