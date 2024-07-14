import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className} antialiased h-full`}>{children}</main>
  );
}
