import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Fortuna Mission Control";
const description =
  "A synthetic, safety-first demonstration of evidence reconciliation, fail-closed action gating, and preserved human authority.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: imageUrl, width: 1735, height: 900 }] },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
