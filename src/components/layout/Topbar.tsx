import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function Topbar() {
  return (
    <div className="h-16 border-b border-[var(--border-color)] bg-white flex items-center justify-between px-8 ml-64">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search medicines, patients, or transactions..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--danger)] rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-[var(--accent)] flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900 leading-none">Admin User</p>
            <p className="text-xs text-gray-500 mt-1">Pharmacist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
