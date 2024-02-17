import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Favicon from "./favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prepstone - Be Focused",
  description: "Best platform for SAT, DU, IBA, BUP mocks.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body className={inter.className}>{children}</body>
    //   </html>
    // </ClerkProvider>
    <div className="bg-black h-full flex justify-center align-middle text-white">
      <p>UNDER MAINTENANCE!</p>
    </div>
  );
}
