import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased overflow-x-hidden md:overflow-y-hidden`}>{children}</body>
    </html>
  );
}
