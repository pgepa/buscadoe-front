import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Smartphone } from 'lucide-react';

const PWAStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPWA, setIsPWA] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIosPWA = (window.navigator as any).standalone === true;

    setIsPWA(isStandalone || isIosPWA);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isPWA) {
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 5000);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isPWA]);

  if (!isPWA || !showStatus) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg px-3 py-2 flex items-center space-x-2">
      <Smartphone className="h-4 w-4 text-blue-600" />
      <span className="text-sm font-medium text-slate-700">BuscaDOE PWA</span>
      <div className="flex items-center space-x-1">
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3 text-orange-600" />
            <span className="text-xs text-orange-600">Offline</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PWAStatus;
