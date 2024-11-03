import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/sidebar";

const AdminLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => (
    <SidebarProvider>
        <AdminSidebar />
        <main>
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
);
export default AdminLayout;
