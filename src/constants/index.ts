import {
  LayoutDashboardIcon,
  TagIcon,
  UsersIcon,
  UtensilsIcon,
} from "lucide-react";

export const navMain = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Menu",
    url: "/admin/menu",
    icon: UtensilsIcon,
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: TagIcon,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: UsersIcon,
  },
];

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
