"use client";
import Link from "next/link";
import * as React from "react";
import {
  IconCertificate2,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconListDetails,
  IconNews,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Form Pendaftaran",
      url: "/registration",
      icon: IconListDetails,
    },
    {
      title: "Surat Tugas",
      url: "/surat",
      icon: IconChartBar,
    },
    {
      title: "Berita Acara",
      url: "/berita",
      icon: IconNews,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Certificates Of Analysys",
      url: "#",
      icon: IconCertificate2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Image
                  src="/images/logo-delta.png"
                  alt="Logo Delta"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-18 h-auto"
                  priority
                />
              </Link>
            </SidebarMenuButton>
            <div className="my-2 border-t border-border" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="my-2 border-t border-border" />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
