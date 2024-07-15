import Layout from "../../../layout/layout";
import React, { Suspense } from "react";
import { Metadata } from "next";
// import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "EduChain",
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

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Layout>{children}</Layout>
    </Suspense>
  );
};

export default MainLayout;
