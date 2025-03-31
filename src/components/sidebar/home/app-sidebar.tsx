"use client";
import Logo from "@/components/brand/logo";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  FolderOpenDot,
  LayoutDashboard,
  PhoneCall,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
export function HomeAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const data = {
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: LayoutDashboard,
      },
      {
        title: "About",
        url: "/about",
        icon: FolderOpenDot,
      },
      {
        title: "Contact",
        url: "/Contact",
        icon: PhoneCall,
      },
      {
        title: "Privacy Policy",
        url: "/privacy",
        icon: Users,
      },

      {
        title: "Terms & Conditions",
        url: "/terms",
        icon: BookOpen,
      },
    ],
  };

  const isRouteActive = (pathname: string | null, url: string) => {
    if (!pathname || !url) return false;

    if (url === "/") return pathname === url;

    return pathname.startsWith(url);
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" onClick={toggleSidebar}>
                <Logo className="size-10" />
                <span className="text-base font-semibold">VQMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
      </SidebarHeader>
    </Sidebar>
  );
}
