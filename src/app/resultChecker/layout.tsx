import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"

import { Metadata } from "next";
// import withAuth from "@/hoc/withAuth";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Result Checker | EduChain",
    description: "Check your results with ease.",
    openGraph: {
      type: "website",
      title: "Result Checker | EduChain",
      url: "https://edu-chain-fawn.vercel.app/resultChecker",
      description: "Check your results with ease.",
    },
  };
}

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
