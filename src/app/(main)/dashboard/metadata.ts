import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home | EduChain",
    description: "Overview of activities on the platform.",
    openGraph: {
      type: "website",
      title: "Home | EduChain",
      url: "https://edu-chain-fawn.vercel.app/dashboard",
      description: "Overview of activities on the platform.",
    },
  };
}
