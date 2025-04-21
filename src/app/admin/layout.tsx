import AppSidebar from "@/components/admin/AppSidebar";
import SideHeader from "@/components/admin/SideHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SideHeader />
        <main className="px-4 lg:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
