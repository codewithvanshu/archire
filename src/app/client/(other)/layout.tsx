


import ClientNavBar from "@/components/navbar/client/navbar";

import { ClientAppSidebar } from "@/components/sidebar/client/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ArchiTectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientAppSidebar variant="inset" />
      <SidebarInset>
        <ClientNavBar />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
