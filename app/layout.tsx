import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopwave — Animated E-Commerce Storefront",
  description:
    "Shopwave is a modern animated storefront built with Next.js, Tailwind CSS, Zustand, Framer Motion and DummyJSON.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
