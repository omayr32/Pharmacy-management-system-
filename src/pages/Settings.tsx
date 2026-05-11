import React from 'react';
import { Save, Bell, Shield, Store, CreditCard, Users, Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage system configurations and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm bg-blue-50 text-[var(--accent)] font-medium transition-colors">
            <Store size={18} />
            <span>Store Details</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
            <Users size={18} />
            <span>Staff Management</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
            <CreditCard size={18} />
            <span>Payment Methods</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
            <Shield size={18} />
            <span>Security</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
            <Database size={18} />
            <span>Backup & Restore</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="app-card">
            <div className="p-6 border-b border-gray-100">
               <h2 className="text-lg font-semibold text-gray-900">Store Profile</h2>
               <p className="text-sm text-gray-500">Contact and location information for receipts and invoices.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Pharmacy Name</label>
                  <input type="text" defaultValue="PharmaCare Central" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">License Number</label>
                  <input type="text" defaultValue="PH-2023-89012" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Address Line 1</label>
                <input type="text" defaultValue="123 Health Avenue, Medical District" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Contact Email</label>
                  <input type="email" defaultValue="contact@pharmacare.example.com" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Tax ID / VAT Registration</label>
                <input type="text" defaultValue="TX-90-120045" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-xl">
              <button className="flex items-center space-x-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="app-card overflow-hidden">
            <div className="p-6 border-b border-gray-100">
               <h2 className="text-lg font-semibold text-gray-900">System Preferences</h2>
               <p className="text-sm text-gray-500">Regional and display settings.</p>
            </div>
            <div className="p-6 space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Currency</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                    <option value="UTC">UTC</option>
                    <option value="EST" selected>Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
