
import React from 'react';
import { Translations, Language } from '../types';
import AIInsights from './AIInsights';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WarehouseProps {
  t: Translations;
  lang: Language;
  initialTab?: 'dashboard' | 'inefficiency';
}

const Warehouse: React.FC<WarehouseProps> = ({ t, lang, initialTab = 'dashboard' }) => {
  
  const overtimeData = [
    { day: 'Mon', hours: 42 },
    { day: 'Tue', hours: 38 },
    { day: 'Wed', hours: 55 },
    { day: 'Thu', hours: 22 },
    { day: 'Fri', hours: 68 },
    { day: 'Sat', hours: 40 },
  ];

  const inefficiencyData = [
    { type: 'unnecessaryMovements', detail: 'Section A to C Forklift Loop', count: 145, costPer: 2.5, waitTime: 'N/A' },
    { type: 'pickingCancellations', detail: 'Order ID: #4401 - Out of Stock', count: 12, costPer: 15.0, waitTime: 'N/A' },
    { type: 'productWaitTime', detail: 'SKU-882 Staging Area', count: 4, costPer: 50.0, waitTime: '18h Avg' },
    { type: 'unnecessaryMovements', detail: 'Manual Re-tagging Area', count: 88, costPer: 1.2, waitTime: 'N/A' },
    { type: 'pickingCancellations', detail: 'Customer Change #9910', count: 5, costPer: 12.0, waitTime: 'N/A' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-50">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.inventoryTurnover}</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">12.5x</h3>
          <p className="text-[10px] text-green-500 font-bold mt-2">↑ 0.8x from target</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-50">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.emptyShelfRate}</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">18%</h3>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
             <div className="bg-blue-500 h-full w-[18%]"></div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2">82% {t.occupancy}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-50">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.stockCount}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-slate-800 mt-1">94%</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{t.inProgress}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2">{t.cycleCountingBatch} #04</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ring-1 ring-slate-50">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.overtime}</p>
          <h3 className="text-3xl font-black text-red-600 mt-1">265h</h3>
          <p className="text-[10px] text-red-400 font-bold mt-2">{t.lastSevenDaysTotal}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overtime Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">{t.overtime} Breakdown (Weekly)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overtimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="hours" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* General Overview Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-6">Stock Level by Category</h3>
          <div className="space-y-4">
             {[
               { cat: 'Finished Goods', qty: 6800, color: 'bg-green-500', trend: '+4%' },
               { cat: 'Raw Materials', qty: 4200, color: 'bg-blue-500', trend: '-2%' },
               { cat: 'WIP', qty: 1100, color: 'bg-amber-500', trend: '+1%' },
               { cat: 'Packaging', qty: 420, color: 'bg-indigo-500', trend: 'Stable' },
             ].map((row, i) => (
               <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3">
                     <div className={`w-2 h-8 rounded-full ${row.color}`}></div>
                     <div>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{row.cat}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{row.trend} Weekly</p>
                     </div>
                  </div>
                  <p className="text-lg font-black text-slate-700">{row.qty.toLocaleString()}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
      <AIInsights section="Warehouse Operations & KPIs" data={overtimeData} lang={lang} t={t} />
    </div>
  );

  const renderInefficiency = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{t.inefficiencyCosts} (Cost of Poor Quality)</h3>
            <p className="text-xs text-slate-500 mt-1">Detailed audit of unnecessary warehouse activities and resource drain.</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Monthly Leakage</p>
             <p className="text-2xl font-black text-red-600">$14,250</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                <th className="px-6 py-4">{t.movementList} / Type</th>
                <th className="px-6 py-4">Context Detail</th>
                <th className="px-6 py-4 text-center">Frequency/Wait</th>
                <th className="px-6 py-4 text-right">{t.costEffect}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inefficiencyData.map((item, idx) => {
                const totalCost = item.count * item.costPer;
                return (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                         item.type === 'unnecessaryMovements' ? 'bg-amber-100 text-amber-700' :
                         item.type === 'pickingCancellations' ? 'bg-red-100 text-red-700' :
                         'bg-indigo-100 text-indigo-700'
                       }`}>
                         {t[item.type as keyof Translations] as string}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700 italic">{item.detail}</td>
                    <td className="px-6 py-4 text-center">
                       <p className="text-sm font-bold text-slate-800">{item.count} occurrences</p>
                       {item.waitTime !== 'N/A' && <p className="text-[10px] text-indigo-500 font-bold">{item.waitTime}</p>}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <p className="text-sm font-black text-red-700">${totalCost.toLocaleString()}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Impact on Bottom Line</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-900 text-slate-400 text-[10px] font-medium flex justify-between">
          <span>* Unnecessary Movements: Calculated as (Forklift Rental + Energy + Labor) per unnecessary mile</span>
          <span>* Picking Cancellations: Calculated as labor hours wasted + restocking opportunity cost</span>
          <span>* Product Wait Time: Financial impact of stalled inventory capital</span>
        </div>
      </div>
      <AIInsights section="Inefficiency & Cost Leakage Audit" data={inefficiencyData} lang={lang} t={t} />
    </div>
  );

  return initialTab === 'inefficiency' ? renderInefficiency() : renderDashboard();
};

export default Warehouse;
