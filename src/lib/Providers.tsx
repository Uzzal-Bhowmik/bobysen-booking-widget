import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <main>{children}</main>

      <Toaster
        richColors
        duration={2500}
        position="top-center"
        className="capitalize"
      />
    </>
  );
}
