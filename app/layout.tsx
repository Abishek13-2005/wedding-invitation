import type { Metadata } from "next";
import "./globals.css";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Our Wedding",
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