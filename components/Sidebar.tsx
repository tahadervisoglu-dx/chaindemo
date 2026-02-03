
import React, { useState } from 'react';
import { View, Translations, Language } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  t: Translations;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, t }) => {
  const [procurementOpen, setProcurementOpen] = useState(false);
  const [logisticsOpen, setLogisticsOpen] = useState(false);
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [customsOpen, setCustomsOpen] = useState(false);


  const procurementSubItems: { id: View; label: string }[] = [
    { id: 'procurement-orders', label: t.orderAnalysis },
    { id: 'procurement-prices', label: t.priceAnalysis },
    { id: 'procurement-escalation', label: t.escalationAnalysis },
    { id: 'procurement-suppliers', label: t.supplierPerformance },
    { id: 'procurement-bom', label: t.bomControl },
  ];

  const logisticsSubItems: { id: View; label: string }[] = [
    { id: 'logistics-reservation', label: t.reservationPerformance },
    { id: 'logistics-transport', label: t.transportation },
  ];

  const warehouseSubItems: { id: View; label: string }[] = [
    { id: 'warehouse-dashboard', label: t.warehousePerformance },
    { id: 'warehouse-inefficiency', label: t.inefficiencyCosts },
  ];

  const customsSubItems: { id: View; label: string }[] = [
    { id: 'customs-dashboard', label: t.customsManagement },
    { id: 'customs-import', label: t.importDetails },
    { id: 'customs-export', label: t.exportDetails },
  ];



  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-xl font-bold tracking-widest text-white">CHAIN MASTER</span>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
        <button onClick={() => setView('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
          <span>{t.dashboard}</span>
        </button>

        {/* Procurement */}
        <div className="space-y-1">
          <button onClick={() => setProcurementOpen(!procurementOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView.startsWith('procurement-') ? 'text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span>{t.procurement}</span>
            </div>
            <svg className={`w-4 h-4 transition-transform ${procurementOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {procurementOpen && <div className="ml-9 space-y-1 border-l border-slate-700 pl-4">
            {procurementSubItems.map(sub => <button key={sub.id} onClick={() => setView(sub.id)} className={`w-full text-left px-2 py-2 rounded-md text-xs font-medium ${currentView === sub.id ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-white'}`}>{sub.label}</button>)}
          </div>}
        </div>

        {/* Logistics */}
        <div className="space-y-1">
          <button onClick={() => setLogisticsOpen(!logisticsOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView.startsWith('logistics-') ? 'text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span>{t.logistics}</span>
            </div>
            <svg className={`w-4 h-4 transition-transform ${logisticsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {logisticsOpen && <div className="ml-9 space-y-1 border-l border-slate-700 pl-4">
            {logisticsSubItems.map(sub => <button key={sub.id} onClick={() => setView(sub.id)} className={`w-full text-left px-2 py-2 rounded-md text-xs font-medium ${currentView === sub.id ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-white'}`}>{sub.label}</button>)}
          </div>}
        </div>

        {/* Warehouse */}
        <div className="space-y-1">
          <button onClick={() => setWarehouseOpen(!warehouseOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView.startsWith('warehouse-') ? 'text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <span>{t.warehouse}</span>
            </div>
            <svg className={`w-4 h-4 transition-transform ${warehouseOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {warehouseOpen && <div className="ml-9 space-y-1 border-l border-slate-700 pl-4">
            {warehouseSubItems.map(sub => <button key={sub.id} onClick={() => setView(sub.id)} className={`w-full text-left px-2 py-2 rounded-md text-xs font-medium ${currentView === sub.id ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-white'}`}>{sub.label}</button>)}
          </div>}
        </div>

        {/* Customs */}
        <div className="space-y-1">
          <button onClick={() => setCustomsOpen(!customsOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView.startsWith('customs-') ? 'text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" /></svg>
              <span>{t.customs}</span>
            </div>
            <svg className={`w-4 h-4 transition-transform ${customsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {customsOpen && <div className="ml-9 space-y-1 border-l border-slate-700 pl-4">
            {customsSubItems.map(sub => <button key={sub.id} onClick={() => setView(sub.id)} className={`w-full text-left px-2 py-2 rounded-md text-xs font-medium ${currentView === sub.id ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-white'}`}>{sub.label}</button>)}
          </div>}
        </div>


      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <p className="text-xs text-slate-500 font-medium mb-1">SYSTEM STATUS</p>
          <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">AI CORE: OPTIMIZED</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
