import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Tektur } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ColorProvider } from "@/context/color";
import Head from "next/head";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shasthra'25",
  description:
    "An expressive overengineered  website designed for excel 2025 website team task with a cute little event card",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "dijith-481" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Markweavia",
    description:
      "A no-nonsense tool for creating professional, platform-independent HTML presentations from Markdown using familiar Vim motions.",
    url: "https://markweavia.vercel.app",
    applicationCategory: "Productivity",
    creator: {
      "@type": "Person",
      name: "dijith",
    },
  };
  return (
    <html lang="en">
      <Head>
        <script type="application/ld+json" id="schema-markup">
          {JSON.stringify(schema)}
        </script>
      </Head>
      <body
        className={`${tektur.className}  ${inter.variable} bg-background text-primary`}
      >
        <svg
          className="clip-svg"
          width="00"
          height="00"
          viewBox="0 0 256 232"
          style={{ position: "absolute", overflow: "hidden" }}
        >
          <defs>
            <clipPath id="myClipPath">
              <path d="M 0 16 L 0 216 Q 0 232 16 232 L 240 232 Q 256 232 256 216 L 256 48 Q 256 32 240 32 L 164 32 q -16 0 -16 -16 Q 148 0 132 0 L 16 0 Q 0 0 0 16" />
            </clipPath>
          </defs>
        </svg>
        <ColorProvider>
          <Header />
          {children}
        </ColorProvider>
        <Analytics />
      </body>
    </html>
  );
}
