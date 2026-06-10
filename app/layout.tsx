import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AD Standards Tracker — 自动驾驶标准追踪",
  description:
    "Open safety evidence map for automated driving standards, regulations, assessment protocols, and latest updates.",
  metadataBase: new URL("https://standards.autozyx.com"),
  openGraph: {
    title: "AD Standards Tracker — 自动驾驶标准追踪",
    description:
      "Open safety evidence map for automated driving standards, regulations, assessment protocols, and latest updates.",
    url: "https://standards.autozyx.com",
    type: "website",
    images: [{ url: "https://autozyx.com/assets/ZYX%20logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col`}>
        <I18nProvider>
          <Nav />
          <main className="mx-auto max-w-6xl w-full px-4 py-8 flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
