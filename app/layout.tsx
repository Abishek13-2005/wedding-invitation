import type { Metadata } from "next";
import "./globals.css";

import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";

export const metadata: Metadata = {
  title: "Akila & Bennat",
  description: "Wedding Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTopOnLoad />

        {children}
      </body>
    </html>
  );
}