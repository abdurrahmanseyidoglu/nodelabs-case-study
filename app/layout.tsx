import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import _SessionProvider from "@/components/SessionProvider";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fintech",
  description: "nodelabs Case Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.variable} antialiased`}>
          <_SessionProvider>
            <div>
              <Toaster />
            </div>
            <main className="h-full">{children}</main>
          </_SessionProvider>
      </body>
    </html>
  );
}
