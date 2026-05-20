import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <ScrollArea className="flex-1 min-h-0">
        <div className="h-full">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
}
