import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog app landing page",
  description: "Blog app landing page description",
  metadataBase: process.env.VERCEL_URL,
  openGraph: {
    title: "Blog app landing page",
    description: "Blog app landing page description",
    metadataBase: process.env.VERCEL_URL
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
        <Script src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js" />
      </head>
      <body className={`dark ${inter.className}`}>
        {children}
        <Script>
          {
            `
              window.algoliasearchNetlify({
                appId: 'WWO4R9FSTI',
                apiKey: 'f7b98a870a6130f09275674aa4cb049a',
                siteId: 'f4abf57e-23fa-4f83-ad95-178d6a773bc2',
                branch: 'main',
                selector: 'div#search',
              });
            `
          }
        </Script>
      </body>
    </html>
  );
}
