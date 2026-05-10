import { Bell, Search, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSearch } from "@/context/SearchContext";

export function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger
          aria-label="Open navigation menu"
          className="-ml-1 size-9"
        />
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search your applications..."
            className="h-10 w-full rounded-full bg-slate-50 pl-10 pr-4 text-sm outline-none transition-colors focus:bg-slate-100 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Settings className="size-5" />
        </Button>
        <div className="ml-1 h-8 w-8 overflow-hidden rounded-full border border-slate-100">
          <User className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
