"use client";
import Logo from "@/components/brand/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, MessageCircle, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function ArchitectAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/architect/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Messages",
        url: "/architect/messages",
        icon: MessageCircle,
      },
      {
        title: "Profile",
        url: "/architect/profile",
        icon: Users,
      },
    ],
  };

  const isRouteActive = (pathname: string | null, url: string) => {
    if (!pathname || !url) return false;

    if (url === "/admin") return pathname === url;

    return pathname.startsWith(url);
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin" onClick={toggleSidebar}>
                <Logo className="size-10" />
                <span className="text-base font-semibold">VQMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarContent>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isRouteActive(pathname, item.url)}
                  tooltip={item.title}
                >
                  <Link href={item.url} onClick={toggleSidebar}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </SidebarHeader>
    </Sidebar>
  );
}
