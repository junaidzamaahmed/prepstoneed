import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Favicon from "./favicon.ico";
import Fingerprint from "@/components/fingerprint";

const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={poppins.className}>
          <Fingerprint />
          {children}
        </body>
      </html>
    </ClerkProvider>
    // checking
    // <div className="bg-black h-full flex justify-center align-middle text-white">
    //   <p>UNDER MAINTENANCE!</p>
    // </div>
  );
}
