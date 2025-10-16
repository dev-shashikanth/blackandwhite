import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <main className="flex-1">{children}</main>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
