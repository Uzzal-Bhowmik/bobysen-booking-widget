"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global Error ==========> ", error);
  return (
    <html>
      <body>
        <h2>Something went wrong! [type: global_error]</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
