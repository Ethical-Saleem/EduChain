import Layout from "../../../layout/layout";
import React, { Suspense } from "react";
import { Metadata } from "next";
import Loading from "./loading";
// import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: {
    template: "%s | EduChain",
    default: "EduChain"
  },
  description: "Access your school record on the go.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: {
      template: "%s | EduChain",
      default: "EduChain"
    },
    url: "https://edu-chain-fawn.vercel.app",
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
    <Suspense fallback={<Loading />}>
      <Layout>{children}</Layout>
    </Suspense>
  );
};

export default MainLayout;
