import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Computation & Cognition Lab @ NYU",
  description: "Computation & Cognition Lab @ NYU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
