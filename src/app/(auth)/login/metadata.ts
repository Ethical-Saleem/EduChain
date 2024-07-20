import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | EduChain",
  description: "Access your school record on the go.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "Login | EduChain",
    url: "https://edu-chain-one.vercel.app/login",
    description: "Access your past school record on the go with relative ease.",
    ttl: 604800,
  },
  icons: {
    icon: "/favicon.ico",
  },
};
