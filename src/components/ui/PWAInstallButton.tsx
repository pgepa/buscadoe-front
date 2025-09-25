import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { Button } from './button';
import { usePWAInstall } from '../../hooks/usePWAInstall';

const PWAInstallButton: React.FC = () => {
  const { canInstall, isInstalled, installPWA } = usePWAInstall();

  if (isInstalled) {
    return (
      <div className="flex items-center space-x-2 text-green-600 bg-green-50/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-green-200">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-medium">App Instalado</span>
      </div>
    );
  }

  if (!canInstall) {
    return null;
  }

  return (
    <Button
      onClick={installPWA}
      className="bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg border border-blue-500/20 transition-all duration-200 hover:scale-105"
    >
      <Download className="h-4 w-4" />
      <span className="text-sm font-medium">Instalar App</span>
    </Button>
  );
};

export default PWAInstallButton;
