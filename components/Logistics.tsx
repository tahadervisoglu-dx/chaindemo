
import React, { useMemo } from 'react';
import { Translations, Language } from '../types';
import AIInsights from './AIInsights';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Reservation Data
const reservationData = [
  { rep: 'Alice Smith', customer: 'Global Tech Ltd', product: 'Precision Gears V2', qty: 500, waitDays: 22, unitProfit: 45, holdingCostPerDay: 0.5, capitalCostRate: 0.001 },
  { rep: 'John Doe', customer: 'Standard Solutions', product: 'Motor Unit X1', qty: 200, waitDays: 5, unitProfit: 120, holdingCostPerDay: 1.2, capitalCostRate: 0.001 },
  { rep: 'Alice Smith', customer: 'Apex Corp', product: 'Sensor Array Z', qty: 1000, waitDays: 18, unitProfit: 15, holdingCostPerDay: 0.2, capitalCostRate: 0.001 },
  { rep: 'Michael Brown', customer: 'Future Builders', product: 'Heavy Pump Set', qty: 50, waitDays: 35, unitProfit: 800, holdingCostPerDay: 5.0, capitalCostRate: 0.001 },
  { rep: 'Sarah Wilson', customer: 'Eco Energy', product: 'Battery Module 5K', qty: 300, waitDays: 12, unitProfit: 210, holdingCostPerDay: 2.5, capitalCostRate: 0.001 },
  { rep: 'John Doe', customer: 'City Infra', product: 'Steel Support B', qty: 5000, waitDays: 8, unitProfit: 5, holdingCostPerDay: 0.1, capitalCostRate: 0.001 },
];

// Mock Transportation Data - will be made dynamic
const staticTransportData = [
  { loadFactor: 88, count: 12 },
  { loadFactor: 95, count: 8 },
  { loadFactor: 72, count: 24 },
];

const shipmentPlanData = [
  { id: 'TRK-9001', route: 'Munich -> Istanbul', type: 'Import', vehicle: 'Container Truck', load: 92, eta: '2025-05-24' },
  { id: 'SHP-4421', route: 'Istanbul -> New York', type: 'Export', vehicle: 'Vessel MSC Ambra', load: 98, eta: '2025-06-12' },
  { id: 'LCL-1022', route: 'Gebze -> Ankara', type: 'Local', vehicle: 'Box Truck', load: 65, eta: '2025-05-22' },
  { id: 'TRK-9005', route: 'Bursa -> Istanbul', type: 'Local', vehicle: 'Lorry', load: 81, eta: '2025-05-23' },
  { id: 'SHP-4500', route: 'Shanghai -> Istanbul', type: 'Import', vehicle: 'Vessel Maersk', load: 85, eta: '2025-06-20' },
];

interface LogisticsProps {
  t: Translations;
  lang: Language;
  initialTab?: 'reservation' | 'transport';
}

const Logistics: React.FC<LogisticsProps> = ({ t, lang, initialTab = 'reservation' }) => {
  
  // Dynamic transportation data with translations
  const transportUtilizationData = useMemo(() => [
    { type: t.import, loadFactor: 88, count: 12 },
    { type: t.export, loadFactor: 95, count: 8 },
    { type: t.local, loadFactor: 72, count: 24 },
  ], [t.import, t.export, t.local]);
  
  const renderReservationPerformance = () => {
    const threshold = 15;
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{t.reservationPerformance}</h3>
              <p className="text-xs text-slate-500 mt-1">{t.trackingCapitalCosts}</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center">
                 <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                 {t.thresholdWarning} (&gt; {threshold} Days)
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">{t.salesRep}</th>
                  <th className="px-6 py-4">{t.customer}</th>
                  <th className="px-6 py-4">{t.product} / {t.quantity}</th>
                  <th className="px-6 py-4 text-center">{t.waitTimeDays}</th>
                  <th className="px-6 py-4 text-right">{t.stockCostImpact}</th>
                  <th className="px-6 py-4 text-right">{t.financialImpact}</th>
                  <th className="px-6 py-4 text-right text-orange-600">{t.opportunityLoss}</th>
                  <th className="px-6 py-4 text-right font-black bg-slate-100/50">{t.totalImpact}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reservationData.map((item, idx) => {
                  const totalStockCost = item.qty * item.holdingCostPerDay * item.waitDays;
                  const totalFinancialImpact = item.qty * item.unitProfit * item.capitalCostRate * item.waitDays;
                  const opportunityLoss = item.waitDays > threshold ? (item.qty * item.unitProfit) : 0;
                  const totalNegativeImpact = totalStockCost + totalFinancialImpact + opportunityLoss;
                  const isOverThreshold = item.waitDays > threshold;

                  return (
                    <tr key={idx} className={`group transition-colors ${isOverThreshold ? 'bg-red-50/40 hover:bg-red-50' : 'hover:bg-slate-50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 uppercase">
                            {item.rep.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{item.rep}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.customer}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{item.product}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{item.qty.toLocaleString()} Units Reserved</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${isOverThreshold ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                          {item.waitDays} d
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-mono text-slate-600">${totalStockCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-right text-sm font-mono text-slate-600">${totalFinancialImpact.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-right">
                         {opportunityLoss > 0 ? (
                           <div className="flex flex-col items-end">
                             <span className="text-sm font-bold font-mono text-orange-600">-${opportunityLoss.toLocaleString()}</span>
                             <span className="text-[9px] text-orange-400 font-bold uppercase">Profit at Stake</span>
                           </div>
                         ) : (
                           <span className="text-sm font-mono text-slate-300">$0.00</span>
                         )}
                      </td>
                      <td className="px-6 py-4 text-right bg-slate-50/50 group-hover:bg-transparent">
                        <span className={`text-sm font-black font-mono ${totalNegativeImpact > 5000 ? 'text-red-700' : 'text-slate-800'}`}>
                          ${totalNegativeImpact.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTransportation = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Shipment Types Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t.importShipments, count: 12, trend: `8 ${t.activeVessel}`, iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: t.exportShipments, count: 8, trend: `3 ${t.scheduledToday}`, iconColor: 'text-green-600', bgColor: 'bg-green-50' },
          { label: t.localShipments, count: 24, trend: t.dailyCityLoop, iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-5">
            <div className={`w-12 h-12 ${item.bgColor} ${item.iconColor} rounded-xl flex items-center justify-center`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{item.count} <span className="text-sm font-medium text-slate-400">{t.loads}</span></h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicle Utilization Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">{t.vehicleUtilization} (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transportUtilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 700}} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="loadFactor" radius={[0, 4, 4, 0]} barSize={32}>
                  {transportUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.loadFactor > 90 ? '#10b981' : entry.loadFactor > 80 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">{t.avgFleetLoadEfficiency}</span>
            <span className="text-lg font-black text-blue-600">85.3%</span>
          </div>
        </div>

        {/* AI Insight Box for Logistics */}
        <AIInsights section="Transportation & Fleet Load Factor" data={transportUtilizationData} lang={lang} t={t} />
      </div>

      {/* Detailed Shipment Plan Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/20">
          <h3 className="text-lg font-bold text-slate-800">{t.shipmentPlan}</h3>
          <p className="text-xs text-slate-500 mt-1">{t.dailyOperationalSchedule}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                <th className="px-6 py-4">{t.idType}</th>
                <th className="px-6 py-4">{t.routeOriginDestination}</th>
                <th className="px-6 py-4">{t.vesselVehicle}</th>
                <th className="px-6 py-4 text-center">{t.loadFactor}</th>
                <th className="px-6 py-4 text-right">{t.eta}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {shipmentPlanData.map((ship, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{ship.id}</p>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase ${
                      ship.type === 'Import' ? 'bg-blue-100 text-blue-700' : 
                      ship.type === 'Export' ? 'bg-green-100 text-green-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>{ship.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{ship.route}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">{ship.vehicle}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-tighter">Assigned Carrier</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                       <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${ship.load > 90 ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${ship.load}%`}}></div>
                       </div>
                       <span className="text-xs font-bold text-slate-700">{ship.load}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-mono font-bold text-slate-800">{ship.eta}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Arrival</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return initialTab === 'reservation' ? renderReservationPerformance() : renderTransportation();
};

export default Logistics;
