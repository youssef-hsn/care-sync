import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar"
import { AppSidebar } from "@/components/organisms/app-sidebar"
import { Outlet } from "react-router-dom"
 
export default function PageWithSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger/>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

