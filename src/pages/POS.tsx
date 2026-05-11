import React, { useState } from 'react';
import { medicinesData } from '../data/mockData';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, User } from 'lucide-react';

export function POS() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<any[]>([]);

  const filteredMeds = medicinesData.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (med: any) => {
    const existing = cart.find(item => item.id === med.id);
    if (existing) {
      setCart(cart.map(item => item.id === med.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...med, qty: 1 }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Product List side */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Point of Sale</h1>
        </div>
        
        <div className="relative w-full shadow-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products by barcode, name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMeds.map(med => (
            <div 
              key={med.id} 
              onClick={() => addToCart(med)}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[var(--accent)] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs text-gray-500 mb-1">{med.id}</p>
                <h3 className="font-medium text-gray-900 leading-tight">{med.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{med.category}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold text-[var(--accent)]">${med.price.toFixed(2)}</span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Stock: {med.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart side */}
      <div className="w-full md:w-[400px] flex flex-col app-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Current Order</h2>
          <button className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors" onClick={() => setCart([])}>Clear All</button>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-[var(--accent)] bg-blue-50 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
            <User size={16} />
            <span className="font-medium">Add Customer (Optional)</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCartIcon className="w-12 h-12 mb-3 text-gray-300" />
              <p className="text-sm font-medium">Cart is empty</p>
              <p className="text-xs mt-1">Search and click items to add</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-900 flex-1">{item.name}</h4>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">${item.price.toFixed(2)}</span>
                  <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1 text-gray-600 hover:bg-gray-200 rounded-l-md transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1 text-gray-600 hover:bg-gray-200 rounded-r-md transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="h-px w-full bg-gray-100 my-2"></div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button 
              disabled={cart.length === 0}
              className="flex justify-center items-center space-x-2 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Banknote size={18} />
              <span>Cash</span>
            </button>
            <button 
              disabled={cart.length === 0}
              className="flex justify-center items-center space-x-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard size={18} />
              <span>Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Needed because it's used in empty state
function ShoppingCartIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
}
