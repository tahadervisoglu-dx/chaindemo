
import React, { useState, useMemo } from 'react';
import { translations } from './translations';
import { Language, View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Procurement from './components/Procurement';
import Logistics from './components/Logistics';
import Warehouse from './components/Warehouse';
import Customs from './components/Customs';


const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('dashboard');

  const t = useMemo(() => translations[lang], [lang]);

  const viewTitles: Record<View, string> = {
    'dashboard': t.dashboard,
    'procurement-orders': `${t.procurement} > ${t.orderAnalysis}`,
    'procurement-prices': `${t.procurement} > ${t.priceAnalysis}`,
    'procurement-escalation': `${t.procurement} > ${t.escalationAnalysis}`,
    'procurement-suppliers': `${t.procurement} > ${t.supplierPerformance}`,
    'procurement-bom': `${t.procurement} > ${t.bomControl}`,
    'logistics-reservation': `${t.logistics} > ${t.reservationPerformance}`,
    'logistics-transport': `${t.logistics} > ${t.transportation}`,
    'warehouse-dashboard': `${t.warehouse} > ${t.warehousePerformance}`,
    'warehouse-inefficiency': `${t.warehouse} > ${t.inefficiencyCosts}`,
    'customs-dashboard': `${t.customs} > ${t.customsManagement}`,
    'customs-import': `${t.customs} > ${t.importDetails}`,
    'customs-export': `${t.customs} > ${t.exportDetails}`,
  };

  const renderContent = () => {
    if (view.startsWith('procurement-')) {
      const subView = view.replace('procurement-', '') as any;
      return <Procurement t={t} lang={lang} initialTab={subView} />;
    }

    if (view.startsWith('logistics-')) {
      const subView = view.replace('logistics-', '') as any;
      return <Logistics t={t} lang={lang} initialTab={subView} />;
    }

    if (view.startsWith('warehouse-')) {
      const subView = view.replace('warehouse-', '') as any;
      return <Warehouse t={t} lang={lang} initialTab={subView} />;
    }

    if (view.startsWith('customs-')) {
      const subView = view.replace('customs-', '') as any;
      return <Customs t={t} lang={lang} initialTab={subView} />;
    }
    
    switch (view) {
      case 'dashboard': return <Dashboard t={t} lang={lang} />;
      default: return <Dashboard t={t} lang={lang} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        t={t} 
        lang={lang} 
        setLang={setLang} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            {t.title} <span className="text-blue-600 mx-2">|</span> <span className="font-medium text-slate-500">{viewTitles[view] || 'N/A'}</span>
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              {(['en', 'tr', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    lang === l 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
              JD
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
