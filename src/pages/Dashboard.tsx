import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, PackageOpen, AlertTriangle, TrendingUp } from 'lucide-react';
import { medicinesData, salesHistoryData, recentTransactions } from '../data/mockData';

export function Dashboard() {
  const lowStockMedicines = medicinesData.filter(m => m.stock <= m.threshold).sort((a,b) => a.stock - b.stock);

  const stats = [
    { title: "Today's Sales", value: "$1,248.50", change: "+12.5%", isPositive: true, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Orders", value: "84", change: "+5.2%", isPositive: true, icon: ShoppingCartIcon, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Low Stock Items", value: lowStockMedicines.length.toString(), change: "Action needed", isPositive: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
    { title: "Revenue Growth", value: "24.5%", change: "+2.4%", isPositive: true, icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="app-card p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="app-card p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 focus:ring-[var(--accent)] outline-none border">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'var(--accent)', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="app-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
            <button className="text-sm text-[var(--accent)] hover:underline font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {lowStockMedicines.slice(0, 5).map((med) => (
              <div key={med.id} className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 text-red-600 rounded-md">
                    <PackageOpen size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{med.name}</h4>
                    <p className="text-xs text-gray-500">Threshold: {med.threshold}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">{med.stock}</div>
                  <div className="text-xs font-medium text-red-500 uppercase">Left</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Transactions placeholder or table */}
      <div className="app-card p-6">
         <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
         <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-y border-gray-100 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx, idx) => (
                <tr key={trx.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${idx === recentTransactions.length - 1 ? 'border-none' : ''}`}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{trx.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{trx.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{trx.items}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{trx.time}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 text-right">${trx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
      </div>
    </div>
  );
}

// Need to import ShoppingCartIcon since I forgot earlier
function ShoppingCartIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
}
