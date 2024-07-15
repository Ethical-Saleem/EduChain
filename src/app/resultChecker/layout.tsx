import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"

import { Metadata } from "next";
// import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "EduChain | Result Checker",
  description: "Access your school record on the go.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "EduChain",
    url: "https://edu-chain-one.vercel.app/login",
    description: "Access your past school record on the go with relative ease.",
    ttl: 604800,
  },
  icons: {
    icon: "/educhain-chrome-two.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#061a2b] text-[#ffffff]`}>{children}</body>
    </html>
  );
}
