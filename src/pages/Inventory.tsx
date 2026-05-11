import React, { useState } from 'react';
import { medicinesData } from '../data/mockData';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Package } from 'lucide-react';
import { cn } from '../lib/utils';

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeds = medicinesData.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage medicines, stock levels, and pricing.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="app-card flex-1 flex flex-col overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 w-full sm:w-auto">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10 shadow-sm shadow-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Medicine Name / ID</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Stock Level</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMeds.map((med) => {
                const isLowStock = med.stock <= med.threshold;
                return (
                  <tr key={med.id} className="hover:bg-gray-50/80 transition-colors bg-white">
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{med.name}</div>
                      <div className="font-mono text-xs text-gray-500 mt-0.5">{med.id}</div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{med.category}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          isLowStock ? "bg-red-500" : "bg-green-500"
                        )}></span>
                        <span className={cn("font-medium", isLowStock ? "text-red-700" : "text-gray-900")}>
                          {med.stock}
                        </span>
                      </div>
                      {isLowStock && <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Low Stock</span>}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900 text-right w-24">
                      ${med.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-sm">
                      {new Date(med.expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredMeds.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">No medicines found</p>
              <p className="text-sm">We couldn't find anything matching "{searchTerm}"</p>
            </div>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-[var(--border-color)] bg-gray-50 flex items-center justify-between text-sm text-gray-600">
          <div>Showing 1 to {filteredMeds.length} of {medicinesData.length} entries</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-[var(--accent)] bg-[var(--accent)] text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
