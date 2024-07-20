import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Results | EduChain",
    description: "Manage result records as a school representative.",
    openGraph: {
      type: "website",
      title: "Results | EduChain",
      url: "https://edu-chain-fawn.vercel.app/results",
      description: "Manage result records as a school representative.",
    },
  };
}
