import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css"

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
