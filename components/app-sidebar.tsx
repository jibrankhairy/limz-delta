"use client";

import Link from "next/link";
import * as React from "react";
import {
  IconCertificate2,
  IconDashboard,
  IconDatabase,
  IconNews,
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
import { FileText, FormInput, UserPlus } from "lucide-react";

const defaultUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState(defaultUser);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.fullName || "User",
          email: parsed.email || "email@example.com",
          avatar: "/images/avatars/user.png",
        });
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  const navMain = [
    {
      title: "Dashboard",
      url: "/overview",
      icon: IconDashboard as any,
    },
    {
      title: "Form Pendaftaran",
      url: "/registration",
      icon: FormInput as any,
    },
    {
      title: "Surat Tugas",
      url: "/surat",
      icon: UserPlus as any,
    },
    {
      title: "Surat Tugas Pengujian",
      url: "/pengujian",
      icon: FileText as any,
    },
    {
      title: "Berita Acara",
      url: "/berita",
      icon: IconNews as any,
    },
  ];

  const documents = [
    {
      name: "Data Library",
      url: "/library",
      icon: IconDatabase as any,
    },
    {
      name: "Certificates Of Analysys",
      url: "/coa",
      icon: IconCertificate2 as any,
    },
  ];

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
        <NavMain items={navMain} />
        <div className="my-2 border-t border-border" />
        <NavDocuments items={documents} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
