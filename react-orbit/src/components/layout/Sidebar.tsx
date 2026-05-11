import { LayoutDashboard, Briefcase, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui//button";

import { cn } from "@/lib/utils";

import orbitLogo from "@/assets/orbit-logo.svg";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Briefcase,
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile, state } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  return (
    <>
      <SidebarRoot
        collapsible="icon"
        className="border-r border-slate-200/50 bg-slate-50 dark:bg-slate-950"
      >
        <SidebarHeader className="px-4 pt-4 pb-6 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:pb-1">
          <SidebarMenu className="group-data-[collapsible=icon]:items-center">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                className="h-auto overflow-visible rounded-xl p-0 hover:bg-transparent group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center"
              >
                <NavLink
                  to="/dashboard"
                  end
                  onClick={closeMobileSidebar}
                  className={cn(
                    "flex items-center gap-3 px-4 py-6",
                    state === "collapsed" && "justify-center gap-0 p-0",
                  )}
                >
                  <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] text-white shadow-lg shadow-blue-900/20">
                    <img src={orbitLogo} alt="Orbit" aria-hidden="true" />
                  </div>
                  <div
                    className={cn(
                      "flex min-w-0 flex-col leading-none transition-all duration-200",
                      state === "collapsed" && "hidden",
                    )}
                  >
                    <span className="font-manrope text-2xl font-extrabold tracking-tight text-blue-800 dark:text-blue-200">
                      Orbit
                    </span>
                  </div>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="gap-0 overflow-visible px-4 group-data-[collapsible=icon]:px-2.5 group-data-[collapsible=icon]:pt-5">
          <SidebarGroup className="p-0">
            <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (!item.end && location.pathname.startsWith(`${item.url}/`));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={cn(
                        "h-auto overflow-visible rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all duration-200",
                        "hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/50",
                        "data-[active=true]:cursor-default data-[active=true]:bg-white data-[active=true]:text-blue-700 data-[active=true]:shadow-sm data-[active=true]:shadow-blue-900/5 data-[active=true]:hover:translate-x-0 data-[active=true]:hover:bg-white data-[active=true]:hover:text-blue-700 dark:data-[active=true]:bg-slate-900 dark:data-[active=true]:text-blue-400 dark:data-[active=true]:hover:bg-slate-900 dark:data-[active=true]:hover:text-blue-400",
                        "group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:rounded-xl! group-data-[collapsible=icon]:p-0!",
                      )}
                    >
                      <NavLink
                        to={item.url}
                        end={item.end}
                        onClick={closeMobileSidebar}
                        className={cn(
                          "flex items-center",
                          state === "collapsed" && "justify-center",
                        )}
                      >
                        <item.icon
                          className="size-5 shrink-0"
                          strokeWidth={2.1}
                        />
                        <span
                          className={cn(
                            "ml-3 whitespace-nowrap font-medium transition-all duration-200",
                            state === "collapsed" && "hidden",
                          )}
                        >
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Logout button in footer */}
        <SidebarFooter className="px-4 pb-4 group-data-[collapsible=icon]:px-2.5 group-data-[collapsible=icon]:pb-4">
          <SidebarMenu className="group-data-[collapsible=icon]:items-center">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Log out"
                onClick={() => setShowLogoutDialog(true)}
                className={cn(
                  "h-auto overflow-visible rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all duration-200 cursor-pointer",
                  "hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400",
                  "group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:rounded-xl! group-data-[collapsible=icon]:p-0!",
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    state === "collapsed" && "justify-center",
                  )}
                >
                  <LogOut className="size-5 shrink-0" strokeWidth={2.1} />
                  <span
                    className={cn(
                      "ml-3 whitespace-nowrap font-medium transition-all duration-200",
                      state === "collapsed" && "hidden",
                    )}
                  >
                    Log out
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarRoot>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="max-w-sm text-center p-6 rounded-3xl">
          <h2 className="text-lg font-bold">Log out of Orbit?</h2>

          <p className="text-sm text-gray-500 mb-3">
            You will be returned to the login screen. Any unsaved changes will
            be lost.
          </p>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="w-full rounded-xl py-5 bg-blue-200 text-gray-700 font-semibold"
              onClick={() => setShowLogoutDialog(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="w-full rounded-xl py-5 font-semibold"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out…" : "Log out"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
