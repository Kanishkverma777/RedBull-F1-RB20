import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Red Bull Racing RB20 | Scrollytelling Experience",
  description:
    "Explore the legendary Red Bull Racing Formula 1 cars. A scrollytelling showcase of engineering excellence, aerodynamic mastery, and championship dominance by Max Verstappen and Isack Hadjar.",
  keywords: ["Red Bull Racing", "Formula 1", "F1", "RB20", "Max Verstappen", "Isack Hadjar", "Motorsport"],
  authors: [{ name: "Red Bull Racing Fan Project" }],
  creator: "Red Bull Racing Fan Project",
  publisher: "Red Bull Racing Fan Project",
  metadataBase: new URL("https://redbull-racing.vercel.app"), // Fallback base URL for preview
  openGraph: {
    title: "Red Bull Racing RB20 | Scrollytelling Experience",
    description: "Explore the legendary Red Bull Racing Formula 1 cars. A scrollytelling showcase of engineering excellence.",
    url: "https://redbull-racing.vercel.app",
    siteName: "Red Bull Racing Experience",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image or use a generic one if you have it
        width: 1200,
        height: 630,
        alt: "Red Bull Racing RB20 Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Bull Racing RB20 | Scrollytelling Experience",
    description: "Explore the legendary Red Bull Racing Formula 1 cars.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
