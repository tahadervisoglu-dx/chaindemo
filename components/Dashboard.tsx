
import React from 'react';
import { Translations, Language } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Line, LineChart
} from 'recharts';
import AIInsights from './AIInsights';

interface DashboardProps {
  t: Translations;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ t, lang }) => {
  // Mock data for visualizations
  const procurementData = [
    { name: 'Used', value: 78, fill: '#3b82f6' },
    { name: 'Remaining', value: 22, fill: '#e2e8f0' }
  ];

  const priceTrendData = [
    { month: 'Jan', price: 12.5, budget: 12.0 },
    { month: 'Feb', price: 12.8, budget: 12.0 },
    { month: 'Mar', price: 12.2, budget: 12.0 },
    { month: 'Apr', price: 13.1, budget: 12.0 },
    { month: 'May', price: 13.6, budget: 12.0 },
  ];

  const logisticsLoadData = [
    { name: 'Full', value: 45, fill: '#10b981' },
    { name: 'Partial', value: 35, fill: '#f59e0b' },
    { name: 'Under', value: 20, fill: '#ef4444' }
  ];

  const warehouseActivity = [
    { day: 'Mon', in: 400, out: 240 },
    { day: 'Tue', in: 300, out: 456 },
    { day: 'Wed', in: 200, out: 980 },
    { day: 'Thu', in: 278, out: 390 },
    { day: 'Fri', in: 189, out: 480 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Stat Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.actualSpend}</p>
          <h3 className="text-2xl font-black text-slate-800">$1,250,400</h3>
          <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            4.2% {t.vsLastMonth}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.efficiency}</p>
          <h3 className="text-2xl font-black text-slate-800">18.4 Days</h3>
          <p className="text-[10px] text-red-500 font-bold mt-2 flex items-center">
             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
             1.5d {t.delayRisk}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-rose-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.stockLevel}</p>
          <h3 className="text-2xl font-black text-slate-800">88.2%</h3>
          <p className="text-[10px] text-blue-500 font-bold mt-2">{t.nearingCapacity}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.clearanceTime}</p>
          <h3 className="text-2xl font-black text-slate-800">12.5 Hours</h3>
          <p className="text-[10px] text-green-500 font-bold mt-2">{t.optimalPerformance}</p>
        </div>
      </div>

      {/* 2x2 Master Grid for Functional Areas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* 1. PROCUREMENT SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.procurement}</h4>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">{t.budgetSync}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-600 pl-3">{t.budgetUtilization}</p>
              <div className="h-48 flex items-center justify-center relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={procurementData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" startAngle={90} endAngle={450}>
                        {procurementData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-slate-800">78%</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{t.utilized}</span>
                 </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-600 pl-3">{t.unitPriceVariance}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceTrendData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" hide />
                    <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
                    <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeDasharray="5 5" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-center font-bold text-slate-400">{t.currentPrice}: <span className="text-blue-600">$13.62</span> / {t.target}: $12.00</p>
            </div>
          </div>
        </div>

        {/* 2. LOGISTICS SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.logistics}</h4>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">{t.fleetDistribution}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-amber-500 pl-3">{t.vehicleLoadEfficiency}</p>
              <div className="space-y-6 pt-4 text-xs font-bold text-slate-600">
                <div className="space-y-2">
                   <div className="flex justify-between uppercase tracking-wider text-[10px]"><span>{t.fullLoad}</span><span>45%</span></div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[45%]"></div>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between uppercase tracking-wider text-[10px]"><span>{t.partialLoad}</span><span>35%</span></div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[35%]"></div>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between uppercase tracking-wider text-[10px]"><span>{t.underUtilized}</span><span>20%</span></div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-[20%]"></div>
                   </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-amber-500 pl-3">{t.onTimeArrivalRate}</p>
              <div className="h-48 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-5xl font-black text-amber-500">92.4%</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">{t.globalOtdRating}</div>
                    <div className="mt-4 flex space-x-1 justify-center">
                       {[1,2,3,4,5,6,7].map(i => <div key={i} className={`w-3 h-3 rounded-sm ${i < 6 ? 'bg-amber-400' : 'bg-slate-100'}`}></div>)}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. WAREHOUSE SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.warehouse}</h4>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">{t.inventoryLabor}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-rose-600 pl-3">{t.stockMovements}</p>
              <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={warehouseActivity}>
                       <XAxis dataKey="day" hide />
                       <Tooltip />
                       <Bar dataKey="in" fill="#fb7185" radius={[4, 4, 0, 0]} barSize={15} />
                       <Bar dataKey="out" fill="#fda4af" radius={[4, 4, 0, 0]} barSize={15} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-rose-600 pl-3">{t.inventoryTurnover}</p>
              <div className="flex flex-col items-center justify-center h-48 space-y-2">
                 <div className="text-4xl font-black text-slate-800">12.5x</div>
                 <div className="text-[10px] font-black text-rose-500 uppercase">{t.velocityTarget}: 10.0x</div>
                 <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
                    <div className="bg-rose-500 h-full w-[85%]"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CUSTOMS SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.customs}</h4>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">{t.complianceDuties}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-cyan-600 pl-3">{t.clearanceThroughput}</p>
              <div className="flex items-center justify-center h-48">
                 <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                       <path className="text-slate-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-cyan-500" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-xl font-black text-slate-800">85%</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase">{t.fastLane}</span>
                    </div>
                 </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-cyan-600 pl-3">{t.dutySavingsTracker}</p>
              <div className="bg-cyan-50 p-6 rounded-3xl border border-cyan-100 h-48 flex flex-col justify-center">
                 <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1">{t.totalRecovery}</p>
                 <h5 className="text-3xl font-black text-cyan-900">$45,200</h5>
                 <p className="text-[10px] text-cyan-700/60 font-medium mt-2">{t.targetReached}: 92% {t.annualGoal}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Intelligence Layer */}
      <div className="pt-4">
        <AIInsights section={t.crossDepartmentalAudit} data={{ regions: ['Turkey', 'India'], metrics: 'Inter-connected' }} lang={lang} t={t} />
      </div>
    </div>
  );
};

export default Dashboard;
