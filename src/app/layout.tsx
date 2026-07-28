import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata: Metadata = {
  title: "FC Online Masters League | Tournament Platform",
  description: "Production-grade esports tournament management platform for FC Online competitions with pan-zoom interactive brackets and FUT tactical pitch inspector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#00f0ff] selection:text-slate-950 flex flex-col min-h-screen bg-[#0c1017] text-slate-100">
        <ReactQueryProvider>
          <NavbarWrapper>{children}</NavbarWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
