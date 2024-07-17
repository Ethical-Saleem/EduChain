import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"
import React, { Suspense } from "react";

import { Metadata } from "next";
// import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "EduChain | Login",
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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className} antialiased h-full`}>
      <Suspense fallback={<div>Loading...</div>}>
      {children}
      </Suspense>
    </main>
  );
}
