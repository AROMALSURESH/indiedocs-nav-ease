import { X, MessageSquare, Upload, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: MessageSquare, label: "Chat", active: true },
    { icon: Upload, label: "Upload", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: HelpCircle, label: "Help", active: false },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out",
          "md:relative md:top-0 md:h-screen md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 pb-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    item.active && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              IndieDocs v1.0
              <br />
              Simplifying documents with AI
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};