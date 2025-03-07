import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="font-kumbh-sans mb-5 flex justify-center text-4xl font-bold text-red-600">
          404
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Oops! Not found
        </h1>

        <p className="mb-6 text-lg text-gray-600">
          We can&apos;t seem to find the restaurant you&apos;re looking for.
        </p>

        <p className="mb-8 text-gray-500">
          The page you&apos;re looking for might have been moved, deleted, or
          perhaps never existed. Let&apos;s get you back to discovering amazing
          restaurants.
        </p>

        {/* <Link
          href="/"
          className="bg-secondary-3 inline-flex items-center rounded-full px-6 py-3 text-base font-medium text-white transition-colors duration-200"
        >
          <HomeIcon className="mr-2 h-5 w-5" />
          Go Back
        </Link> */}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
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
