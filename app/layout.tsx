import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julian Delgado | Software Developer",
  description:
    "This is my own webpage where I can give you updates about my career and also my services",
  authors: {
    name: "Julian Eduardo Delgado",
    url: "https://www.linkedin.com/in/julianedelgado/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
  appearance={{
    variables: {
      colorBackground: "var(--card)",
      colorText: "var(--foreground)",
      colorPrimary: "var(--primary)",
      colorInputBackground: "var(--input)",
      colorInputText: "var(--foreground)",
      borderRadius: "var(--radius)",
      colorBorder: "var(--border-button)"
    },
  }}
>

      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
