import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings, Pill } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentPath: string;
  setPath: (path: string) => void;
}

export function Sidebar({ currentPath, setPath }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pos', label: 'Point of Sale', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-[var(--border-color)] flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center space-x-3 border-b border-[var(--border-color)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
          <Pill size={18} />
        </div>
        <span className="font-semibold text-lg tracking-tight">PharmaCare</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4 px-2">Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPath(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              currentPath === item.id 
                ? "bg-blue-50 text-[var(--accent)] font-medium" 
                : "text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-[var(--border-color)]">
        <button
          onClick={() => setPath('settings')}
          className={cn(
            "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
            currentPath === 'settings'
              ? "bg-blue-50 text-[var(--accent)] font-medium" 
              : "text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
          )}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
