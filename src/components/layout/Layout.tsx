import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  setPath: (path: string) => void;
}

export function Layout({ children, currentPath, setPath }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex font-sans">
      <Sidebar currentPath={currentPath} setPath={setPath} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 ml-64 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
