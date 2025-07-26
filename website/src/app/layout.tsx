import ClientLayout from "@/components/ClientLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import { Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baloo = Baloo_2({
  weight: ["400", "700"], // Include both regular and bold weights for design consistency
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polintosh | Product-minded Software Engineer",
  description:
    "A personal portfolio showcasing projects, career, and technical skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable}`}
      suppressHydrationWarning
    >
      <body className="no-transition">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
