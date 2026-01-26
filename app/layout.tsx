import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ENS Self-Delegation | Unlock Your Governance Voting Power",
  description: "Self-delegate your ENS tokens in one simple transaction. Convert your holdings into active voting power and help shape the future of Ethereum Name Service.",
  keywords: ["ENS", "Ethereum Name Service", "DAO", "governance", "delegation", "voting", "web3", "self-delegation"],
  authors: [{ name: "ENS Community" }],
  openGraph: {
    title: "ENS Self-Delegation | Unlock Your Governance Voting Power",
    description: "Self-delegate your ENS tokens in one simple transaction. Convert your holdings into active voting power.",
    url: "https://ens-delegate.kirillpolevoy.com",
    siteName: "ENS Self-Delegation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ENS Self-Delegation | Unlock Your Governance Voting Power",
    description: "Self-delegate your ENS tokens in one simple transaction. Convert your holdings into active voting power.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
