import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import Branding from "@/components/branding";

const AdminSidebar = () => (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenuButton
                className="justify-center group-data-[collapsible=icon]:justify-start hover:bg-transparent"
                size="lg"
            >
                <Branding />
            </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
);
export default AdminSidebar;
