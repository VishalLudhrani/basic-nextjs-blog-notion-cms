import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog app landing page",
  description: "Blog app landing page description",
  metadataBase: new URL(process.env.VERCEL_URL),
  openGraph: {
    title: "Blog app landing page",
    description: "Blog app landing page description",
    metadataBase: new URL(process.env.VERCEL_URL)
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>{children}</body>
    </html>
  );
}
