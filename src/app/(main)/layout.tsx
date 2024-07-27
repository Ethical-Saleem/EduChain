import Layout from "../../../layout/layout";
import React, { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'EduChain',
  description: 'Access your school record on the go.',
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: 'device-width' },
  openGraph: {
      type: 'website',
      title: 'EduChain',
      url: 'https://edu-chain-one.vercel.app/login',
      description: 'Access your past school record on the go with relative ease.',
      ttl: 604800
  },
  icons: {
      icon: '/favicon.ico'
  }
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
  // return (
  //   <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  //     <div className="w-full flex-none md:w-64">
  //       <SideNav />
  //     </div
  //     <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  //   </div>
  // );
}
