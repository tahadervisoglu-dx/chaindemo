
import React from 'react';
import { Translations, Language } from '../types';
import AIInsights from './AIInsights';

interface CustomsProps {
  t: Translations;
  lang: Language;
  initialTab?: 'dashboard' | 'import' | 'export';
}

const importData = [
  { id: 'IMP-2201', product: 'Precision Gears', hsCode: '8483.40', origin: 'Germany', carrier: 'Maersk Line', value: 45000, tax: 8100, status: 'Cleared' },
  { id: 'IMP-2205', product: 'Sensors V2', hsCode: '8526.10', origin: 'Taiwan', carrier: 'MSC Mediterranean', value: 12000, tax: 2160, status: 'Review' },
  { id: 'IMP-2209', product: 'Motor Hubs', hsCode: '8412.21', origin: 'China', carrier: 'CMA CGM', value: 85000, tax: 15300, status: 'Exam Requested' },
  { id: 'IMP-2212', product: 'Alu Housing', hsCode: '7616.99', origin: 'South Korea', carrier: 'Evergreen', value: 5000, tax: 900, status: 'Cleared' },
];

const exportData = [
  { id: 'EXP-9901', product: 'XC-900 Assy', hsCode: '8407.34', destination: 'USA', carrier: 'DHL Global', value: 120000, duty: 0, status: 'Shipped' },
  { id: 'EXP-9904', product: 'Gearbox Pro', hsCode: '8483.40', destination: 'France', carrier: 'FedEx Trade', value: 42000, duty: 0, status: 'Documentation' },
  { id: 'EXP-9910', product: 'Hydraulic P3', hsCode: '8413.50', destination: 'Japan', carrier: 'NYK Line', value: 95000, duty: 0, status: 'Cleared' },
];

const importDots = [
  { x: 135, y: 70, name: 'Germany' },
  { x: 410, y: 105, name: 'Taiwan' },
  { x: 385, y: 95, name: 'China' },
  { x: 430, y: 80, name: 'Korea' }
];
const exportDots = [
  { x: 445, y: 105, name: 'Japan' },
  { x: 85, y: 95, name: 'USA' },
  { x: 150, y: 85, name: 'France' }
];

const WorldMap = () => {
  return (
    <div className="relative w-full aspect-[21/9] bg-[#020617] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl ring-1 ring-white/10">
      {/* Visual Depth Grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <svg viewBox="0 0 500 250" className="w-full h-full relative z-10">
        {/* Simplified Continent Paths for Extreme Clarity */}
        <g fill="#1e293b" fillOpacity="0.7" stroke="#334155" strokeWidth="0.8">
          {/* N.America */}
          <path d="M40,60 L90,55 L120,60 L115,100 L45,100 Z" />
          {/* S.America */}
          <path d="M100,120 L130,125 L120,180 L95,190 Z" />
          {/* Eurasia */}
          <path d="M150,50 L430,50 L445,130 L340,140 L240,150 L180,110 Z" />
          {/* Africa */}
          <path d="M185,120 L260,125 L255,190 L200,200 Z" />
          {/* Australia */}
          <path d="M410,170 L460,170 L455,210 L420,215 Z" />
        </g>
        
        {/* Main Hub (Istanbul/HQ) */}
        <g>
          <circle cx="250" cy="95" r="10" fill="#3b82f6" fillOpacity="0.2">
            <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="95" r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
        </g>

        {/* Dynamic Trade Lines */}
        <g>
          {importDots.map((d, i) => (
            <React.Fragment key={`imp-${i}`}>
              <path 
                d={`M${d.x},${d.y} Q${(d.x+250)/2},${Math.min(d.y, 95)-40} 250,95`} 
                stroke="#22d3ee" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="6,6"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="3s" repeatCount="indefinite" />
              </path>
              <circle cx={d.x} cy={d.y} r="3" fill="#22d3ee" className="animate-pulse shadow-lg shadow-cyan-500" />
              <text x={d.x} y={d.y - 10} fill="#22d3ee" fontSize="8" fontWeight="black" textAnchor="middle" className="uppercase tracking-widest drop-shadow-xl">{d.name}</text>
            </React.Fragment>
          ))}

          {exportDots.map((d, i) => (
            <React.Fragment key={`exp-${i}`}>
              <path 
                d={`M250,95 Q${(d.x+250)/2},${Math.min(d.y, 95)-40} ${d.x},${d.y}`} 
                stroke="#f59e0b" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="6,6"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3s" repeatCount="indefinite" />
              </path>
              <circle cx={d.x} cy={d.y} r="3" fill="#f59e0b" className="shadow-lg shadow-amber-500" />
              <text x={d.x} y={d.y + 18} fill="#f59e0b" fontSize="8" fontWeight="black" textAnchor="middle" className="uppercase tracking-widest drop-shadow-xl">{d.name}</text>
            </React.Fragment>
          ))}
        </g>
      </svg>
      
      {/* Modern Overlay Legend */}
      <div className="absolute top-8 right-8 space-y-4 bg-slate-900/90 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
         <div className="flex items-center space-x-4">
            <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.7)]"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Inbound Routes</span>
         </div>
         <div className="flex items-center space-x-4">
            <div className="w-3.5 h-3.5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.7)]"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Outbound Routes</span>
         </div>
      </div>

      <div className="absolute bottom-8 left-8">
         <div className="bg-blue-600/20 px-5 py-2.5 rounded-2xl border border-blue-500/30 backdrop-blur-md">
            <div className="flex items-center space-x-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
               <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">Live Supply Chain Map</h4>
            </div>
         </div>
      </div>
    </div>
  );
}

const Customs: React.FC<CustomsProps> = ({ t, lang, initialTab = 'dashboard' }) => {
  
  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.clearanceTime}</p>
          <div className="flex items-end space-x-2 mt-1">
             <h3 className="text-3xl font-black text-slate-800">14.2h</h3>
             <span className="text-[10px] text-green-500 font-bold mb-1">↓ 15%</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Liman Bazlı Ortalama</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.dutiesPaid} (YTD)</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">$128,400</h3>
          <p className="text-[10px] text-blue-500 font-bold mt-2 uppercase tracking-tighter">Geri Kazanım: 12.5%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.clearedItems}</p>
          <h3 className="text-3xl font-black text-blue-600 mt-1">1,245</h3>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">İşlem Gören Beyanname</p>
        </div>
      </div>

      {/* Main Map Visualization */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <div>
             <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight">{t.customsMap}</h3>
             <p className="text-xs text-slate-500 font-medium tracking-wide">Real-time global trade lane monitoring and customs status tracking.</p>
           </div>
           <div className="flex space-x-2">
              <button className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                Download Report
              </button>
           </div>
        </div>
        <WorldMap />
      </div>

      <AIInsights section="Gümrük ve Dış Ticaret Mevzuat Analizi" data={{ imports: importData.length, exports: exportData.length }} lang={lang} t={t} />
    </div>
  );

  const renderImport = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">{t.importDetails}</h3>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Inbound Logistics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                <th className="px-6 py-4">{t.declarationNo}</th>
                <th className="px-6 py-4">{t.product} / {t.hsCode}</th>
                <th className="px-6 py-4">{t.origin}</th>
                <th className="px-6 py-4 text-right">Value / Duties</th>
                <th className="px-6 py-4 text-center">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {importData.map((item, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">{item.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{item.product}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">GTIP: {item.hsCode}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{item.origin}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.carrier}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-slate-800">${item.value.toLocaleString()}</p>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Duty: ${item.tax.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                      item.status === 'Cleared' ? 'bg-green-100 text-green-700' :
                      item.status === 'Review' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExport = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">{t.exportDetails}</h3>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Outbound Logistics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                <th className="px-6 py-4">{t.declarationNo}</th>
                <th className="px-6 py-4">{t.product}</th>
                <th className="px-6 py-4">{t.destination}</th>
                <th className="px-6 py-4 text-right">Invoice Value</th>
                <th className="px-6 py-4 text-center">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {exportData.map((item, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.product}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{item.destination}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.carrier}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-slate-800">${item.value.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Zero-Rated Export</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                      item.status === 'Cleared' || item.status === 'Shipped' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  switch (initialTab) {
    case 'import': return renderImport();
    case 'export': return renderExport();
    default: return renderDashboard();
  }
};

export default Customs;
