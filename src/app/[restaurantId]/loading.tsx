import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100dvh-2.5em)] flex-col items-center justify-center gap-y-4 rounded-lg">
      <Loader className="text-secondary-3 size-10 animate-spin" />
      <p className="animate-pulse text-center text-xl font-medium text-gray-500">
        Please wait while we are loading data...
      </p>
    </div>
  );
}
