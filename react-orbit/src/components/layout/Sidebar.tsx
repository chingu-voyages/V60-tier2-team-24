import { LayoutDashboard, Briefcase, Globe } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    end: true,
  },
  {
    title: 'Applications',
    url: '/applications',
    icon: Briefcase,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { isMobile, setOpenMobile, state } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarRoot collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="h-12 rounded-xl hover:bg-transparent"
            >
              <NavLink
                to="/"
                end
                onClick={closeMobileSidebar}
                className={cn(
                  'flex items-center gap-3',
                  state === 'collapsed' && 'justify-center gap-0',
                )}
              >
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Globe className="size-5" />
                </div>
                <div
                  className={cn(
                    'flex min-w-0 flex-col leading-none transition-all duration-200',
                    state === 'collapsed' && 'hidden',
                  )}
                >
                  <span className="text-lg font-bold tracking-tight text-blue-950">
                    Orbit
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarMenu>
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
                      'h-11 rounded-xl px-3 text-slate-600 transition-all duration-200',
                      'hover:bg-slate-100 hover:text-slate-900',
                      'data-[active=true]:bg-white data-[active=true]:text-blue-700 data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-slate-200',
                    )}
                  >
                    <NavLink
                      to={item.url}
                      end={item.end}
                      onClick={closeMobileSidebar}
                      className={cn(
                        'flex items-center',
                        state === 'collapsed' && 'justify-center',
                      )}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span
                        className={cn(
                          'ml-3 whitespace-nowrap font-medium transition-all duration-200',
                          state === 'collapsed' && 'hidden',
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
    </SidebarRoot>
  );
}
