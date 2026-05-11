import React, { useState } from 'react';
import { patientsData } from '../data/mockData';
import { Search, Plus, Filter, MoreVertical, FileText, Phone, Mail, Activity } from 'lucide-react';

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patientsData.filter(pat => 
    pat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Patient Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage patient records and medical history.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="app-card flex-1 flex flex-col overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search patients by name or ID..." 
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
                <th className="px-6 py-4 font-medium">Patient Info</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Conditions</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => {
                return (
                  <tr key={patient.id} className="hover:bg-gray-50/80 transition-colors bg-white group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[var(--accent)] flex items-center justify-center font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-[var(--accent)] transition-colors">{patient.name}</div>
                        <div className="font-mono text-xs text-gray-500 mt-0.5">{patient.id} • {patient.gender}, {patient.age}y</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-600 space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <span>{patient.contact}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.length > 0 ? (
                          patient.conditions.map((condition, idx) => (
                            <span key={idx} className="bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded text-xs font-medium">
                              {condition}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic text-xs">None listed</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{new Date(patient.lastVisit).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-[var(--accent)] hover:bg-blue-50 rounded transition-colors" title="Prescriptions">
                          <FileText size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Medical History">
                          <Activity size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="More options">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredPatients.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg font-medium text-gray-900">No patients found</p>
              <p className="text-sm">We couldn't find anything matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
