"use client";

/**
 * Last resort: this replaces the root layout, so it can't rely on the fonts,
 * tokens or theme script defined there. Everything it needs is inlined.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <style>{`
          :root { --paper:#fbfaf8; --ink:#14131a; --muted:#5c5866; --line:#e7e3dc; --accent:#4119f4; --accent-ink:#fff; --deep:#2c0aa8; }
          @media (prefers-color-scheme: dark) {
            :root { --paper:#0c0b10; --ink:#f6f4f0; --muted:#a3a0ad; --line:#26242f; --accent:#7c5cff; --accent-ink:#0c0b10; --deep:#4c31c9; }
          }
          * { box-sizing: border-box; }
          body {
            margin:0; min-height:100dvh; display:flex; align-items:center; justify-content:center;
            background:var(--paper); color:var(--ink); padding:24px;
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          .wrap { max-width:34rem; }
          .code { font-family: ui-monospace, SFMono-Regular, monospace; font-size:11px;
                  letter-spacing:.13em; text-transform:uppercase; color:var(--muted); margin:0; }
          h1 { font-family: ui-serif, Georgia, serif; font-weight:400; font-size:clamp(2rem,1.4rem+2.6vw,3rem);
               line-height:1.05; letter-spacing:-.02em; margin:20px 0 0; }
          p.body { color:var(--muted); font-size:1.0625rem; line-height:1.6; margin:20px 0 0; }
          .row { display:flex; flex-wrap:wrap; gap:12px; margin-top:32px; }
          button, a.btn {
            font:inherit; font-weight:500; font-size:.9375rem; border-radius:10px; padding:0 22px; height:48px;
            display:inline-flex; align-items:center; cursor:pointer; text-decoration:none;
            transition: transform .2s cubic-bezier(.25,1,.5,1), box-shadow .2s cubic-bezier(.25,1,.5,1);
          }
          button { background:var(--accent); color:var(--accent-ink); border:0; box-shadow:0 2px 0 0 var(--deep); }
          button:hover { transform:translateY(-2px) scale(1.015); box-shadow:0 4px 0 0 var(--deep); }
          button:active { transform:translateY(1px) scale(.98); box-shadow:0 0 0 0 var(--deep); }
          a.btn { background:transparent; color:var(--ink); border:1px solid var(--line); box-shadow:0 2px 0 0 var(--line); }
          a.btn:hover { transform:translateY(-2px) scale(1.015); }
          a.btn:active { transform:translateY(1px) scale(.98); box-shadow:none; }
          .ref { font-family: ui-monospace, SFMono-Regular, monospace; font-size:12px; color:var(--muted); margin:24px 0 0; }
          @media (prefers-reduced-motion: reduce) {
            button, a.btn { transition:none; }
            button:hover, a.btn:hover { transform:none; }
          }
        `}</style>

        <div className="wrap">
          <p className="code">Something broke</p>
          <h1>The page couldn&rsquo;t load at all.</h1>
          <p className="body">
            Novi hit an error before it could render anything. Reloading usually clears it. If it
            keeps happening, the reference below will help us find it.
          </p>
          <div className="row">
            <button type="button" onClick={reset}>
              Try again
            </button>
            {/* A full reload is deliberate here: the router may be part of what failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="btn" href="/">
              Back to the homepage
            </a>
          </div>
          {error.digest && <p className="ref">Reference: {error.digest}</p>}
        </div>
      </body>
    </html>
  );
}
