import { inter } from "@/app/ui/fonts";
import LayoutProvider from "../../layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../styles/layout/layout.scss";
import "../../styles/demo/Demos.scss";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { Metadata } from "next";
// import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "EduChain",
  description: "Access your school record on the go.",
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: "device-width" },
  openGraph: {
    type: "website",
    title: "EduChain",
    url: "https://edu-chain-one.vercel.app/login",
    description: "Access your past school record on the go with relative ease.",
    ttl: 604800,
  },
  icons: {
    icon: "/educhain-fav.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <PrimeReactProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
