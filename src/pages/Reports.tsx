import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Calendar, DollarSign, Package, FileText } from 'lucide-react';
import { salesHistoryData, medicinesData, recentTransactions } from '../data/mockData';

export function Reports() {
  const salesByCategory = [
    { name: 'Antibiotics', sales: 4500 },
    { name: 'Cardiology', sales: 3200 },
    { name: 'Endocrinology', sales: 2800 },
    { name: 'Pain Relief', sales: 5100 },
    { name: 'Allergy', sales: 1900 },
  ];

  const totalRevenue = salesHistoryData.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Analytics & Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed performance metrics and exports.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center space-x-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="app-card p-6 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <DollarSign size={24} />
             </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Revenue this period</p>
          </div>
        </div>

        <div className="app-card p-6 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <FileText size={24} />
             </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{recentTransactions.length * 14}</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Transactions processed</p>
          </div>
        </div>

        <div className="app-card p-6 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                <Package size={24} />
             </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{medicinesData.reduce((acc, med) => acc + med.stock, 0)}</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Items in Inventory</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="app-card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Sales by Category</h2>
            <p className="text-sm text-gray-500">Revenue distribution across medicine categories</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f9fafb' }}
                />
                <Bar dataKey="sales" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="app-card p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
               <h2 className="text-lg font-semibold text-gray-900">Inventory Status Report</h2>
               <p className="text-sm text-gray-500">Overview of current stock conditions</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="font-medium text-gray-700">Healthy Stock</span>
              </div>
              <span className="font-bold text-gray-900">{medicinesData.filter(m => m.stock > m.threshold * 2).length} items</span>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <span className="font-medium text-gray-700">Approaching Threshold</span>
              </div>
              <span className="font-bold text-gray-900">{medicinesData.filter(m => m.stock <= m.threshold * 2 && m.stock > m.threshold).length} items</span>
            </div>
            <div className="p-4 border border-red-100 bg-red-50/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="font-medium text-red-700">Critical Stock (Below Threshold)</span>
              </div>
              <span className="font-bold text-red-700">{medicinesData.filter(m => m.stock <= m.threshold).length} items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
