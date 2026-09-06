"use client";

import { useEffect } from "react";
import { MessageScreen } from "@/components/layout/message-screen";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Stands in for the reporting call a real deployment would make here.
    console.error(error);
  }, [error]);

  return (
    <MessageScreen
      code="Something broke"
      title="That didn't go to plan."
      body="Something on our side failed while loading this page. Trying again usually clears it, and nothing you did caused it."
    >
      <Button size="lg" onClick={reset}>
        Try again
      </Button>
      <Button href="/" variant="secondary" size="lg">
        Back to the homepage
      </Button>

      {error.digest && (
        <p className="text-ink-faint w-full font-mono text-xs">Reference: {error.digest}</p>
      )}
    </MessageScreen>
  );
}
