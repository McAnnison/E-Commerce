import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreshMarket - Fresh Fruits & Vegetables",
  description: "Farm-fresh produce delivered to your doorstep. Quality guaranteed, locally sourced fruits and vegetables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
