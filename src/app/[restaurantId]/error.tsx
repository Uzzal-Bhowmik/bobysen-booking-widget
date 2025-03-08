"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error?.name);
  }, [error]);

  return (
    <div className="flex h-[calc(100dvh_-_130px)] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="font-kumbh-sans mb-5 flex justify-center text-4xl font-bold text-red-600">
          {error?.name}
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Oops! Something Went Wrong
        </h1>

        <p className="mb-6 text-lg text-gray-600">[Message] {error?.message}</p>

        <p className="mb-8 text-gray-500">
          Click{" "}
          <button
            className="cursor-pointer underline"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            here
          </button>{" "}
          to try again.
        </p>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            The issue is not fixed? Contact our support team at{" "}
            <a
              href="mailto:info@bookatable.mu"
              className="text-secondary-3 hover:underline"
            >
              info@bookatable.mu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
