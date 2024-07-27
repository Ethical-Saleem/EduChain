import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Users Settings | EduChain",
    description: "Set up configurations for your users as an administrator.",
    openGraph: {
      type: "website",
      title: "Users Settings | EduChain",
      url: "https://edu-chain-fawn.vercel.app/settings/users",
      description: "Set up configurations for your users as an administrator.",
    },
  };
}
