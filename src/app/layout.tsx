import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import BgFlowers from "@/components/BgFlowers";
import Footer from "@/components/shared/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bookatable",
  description: "Book a table for your next event",
  metadataBase: new URL("https://reservation.bookatable.mu"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${poppins.className} flex flex-col justify-between antialiased`}
      >
        <Providers>
          <main className="mx-auto max-w-6xl flex-1">{children}</main>
        </Providers>

        <Footer />

        <BgFlowers />
      </body>
    </html>
  );
}
