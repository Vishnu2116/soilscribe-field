import { User } from "lucide-react";
import { getCurrentUser } from "@/lib/storage";

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
}

export default function HeaderBar({ 
  title = "TGREC Soil Profiles", 
  subtitle = "Field Data Capture" 
}: HeaderBarProps) {
  const user = getCurrentUser();

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* TGREC Logo placeholder */}
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">TG</span>
            </div>
            
            <div>
              <h1 className="text-lg font-bold leading-tight">{title}</h1>
              <p className="text-sm text-primary-foreground/80">{subtitle}</p>
            </div>
          </div>

          {/* User indicator */}
          {user && (
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user.username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}