"use client";

import EsportsSidebarLayout from "./EsportsSidebarLayout";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EsportsSidebarLayout>
      {children}
    </EsportsSidebarLayout>
  );
}
