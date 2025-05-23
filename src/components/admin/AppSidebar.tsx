"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navMain } from "@/constants";
import { useUser } from "@clerk/nextjs";
import { StoreIcon } from "lucide-react";
import NavMain from "./NavMain";
import NavUser from "./NavUser";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useUser();
  const userData = {
    name: user?.fullName,
    email: user?.emailAddresses[0]?.emailAddress,
    avatar: user?.imageUrl,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <span>
                <StoreIcon className="h-5 w-5" />
                <span className="text-base font-semibold">My Restaurant.</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
