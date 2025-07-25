import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageDropdown } from "./LanguageDropdown";
import { useTheme } from "next-themes";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ID</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">IndieDocs</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageDropdown />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};