import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"
import React, { Suspense } from "react";
import Loading from "../(main)/loading";

// import withAuth from "@/hoc/withAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className} antialiased h-full`}>
      <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
    </main>
  );
}
