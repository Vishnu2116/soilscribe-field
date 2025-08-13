import { Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function OfflinePill() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
      isOnline 
        ? 'bg-success/10 text-success' 
        : 'bg-warning/10 text-warning'
    }`}>
      {isOnline ? (
        <Wifi className="w-3 h-3" />
      ) : (
        <WifiOff className="w-3 h-3" />
      )}
      <span>{isOnline ? 'Online' : 'Offline Ready'}</span>
    </div>
  );
}