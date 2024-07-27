"use client";

import { inter } from "@/app/ui/fonts";
import { LayoutProvider } from "../../layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../../styles/layout/layout.scss";
import "../../styles/demo/Demos.scss";

import "primereact/resources/themes/lara-light-cyan/theme.css";


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
