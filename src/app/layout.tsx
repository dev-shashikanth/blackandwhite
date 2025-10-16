import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // normal + bold
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <main className={`${merriweather.variable} font-serif flex-1`}>
            {children}
          </main>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
