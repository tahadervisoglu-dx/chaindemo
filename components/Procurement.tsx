
import React, { useEffect, useState, useMemo } from 'react';
import { Translations, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import AIInsights from './AIInsights';

interface ProcurementProps {
  t: Translations;
  lang: Language;
  initialTab?: 'orders' | 'prices' | 'escalation' | 'suppliers' | 'bom';
}

const Procurement: React.FC<ProcurementProps> = ({ t, lang, initialTab = 'orders' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [analysisRegion, setAnalysisRegion] = useState<'TR' | 'IN' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
    // Reset selections on tab change
    setSelectedCategory(null);
  }, [initialTab]);

  // priceAnalysisData provides mock data for price variance and budget tracking.
  const priceAnalysisData = useMemo(() => [
    { category: t.rawMaterial, budgetQty: 1000, actualQty: 1200, budgetPrice: 10, actualPrice: 12, budgetTotal: 10000, actualTotal: 14400 },
    { category: t.components, budgetQty: 500, actualQty: 450, budgetPrice: 50, actualPrice: 48, budgetTotal: 25000, actualTotal: 21600 },
    { category: t.packaging, budgetQty: 2000, actualQty: 2200, budgetPrice: 5, actualPrice: 5.5, budgetTotal: 10000, actualTotal: 12100 },
    { category: t.mro, budgetQty: 100, actualQty: 110, budgetPrice: 20, actualPrice: 22, budgetTotal: 2000, actualTotal: 2420 },
  ], [t.rawMaterial]);

  // escalationData provides mock data for cost breakdown and macro-economic impact analysis.
  const escalationData = useMemo(() => [
    {
      item: t.coldRolledSteel,
      current: { raw: 8.5, labor: 2.0, energy: 1.0, other: 0.5 },
      new: { raw: 10.2, labor: 2.2, energy: 1.4, other: 0.5 },
      fxChange: 12.5,
      inflation: 8.2,
      actualQty: 5000,
    },
    {
      item: 'Electric Motor V2',
      current: { raw: 45.0, labor: 15.0, energy: 5.0, other: 5.0 },
      new: { raw: 48.0, labor: 16.5, energy: 7.0, other: 5.5 },
      fxChange: 4.2,
      inflation: 6.5,
      actualQty: 1200,
    },
    {
      item: 'Alu Ingot',
      current: { raw: 2.8, labor: 0.5, energy: 0.4, other: 0.3 },
      new: { raw: 3.4, labor: 0.6, energy: 0.6, other: 0.3 },
      fxChange: 8.1,
      inflation: 7.0,
      actualQty: 10000,
    }
  ], []);

  // supplierPerformanceData provides mock data for vendor assessment and risk management.
  const supplierPerformanceData = useMemo(() => [
    { name: 'Anatolia Steel Co.', otd: 94, quality: 98, priceIdx: 1.05, risk: 'Low', volume: '$450k' },
    { name: 'Bharat Motors Ltd', otd: 88, quality: 92, priceIdx: 0.98, risk: 'Medium', volume: '$320k' },
    { name: 'Global Pack India', otd: 99, quality: 99, priceIdx: 1.02, risk: 'Low', volume: '$120k' },
    { name: 'Euro Seals TR', otd: 65, quality: 85, priceIdx: 1.12, risk: 'High', volume: '$45k' },
  ], []);

  // bomErrorData provides mock data for Bill of Materials conflicts and MRP synchronization.
  const bomErrorData = useMemo(() => [
    { parentItem: 'XC-900 Main Assy', component: 'Control Board X8', errorCode: 'Qty Mismatch', errorDetail: 'MRP requires 1.2 but PO only covers 1.0', impactedReq: 'REQ-442', impactedPO: 'PO-8801', action: 'Update PO' },
    { parentItem: 'Gearbox Pro', component: 'Hydraulic Seal S2', errorCode: 'Lead Time Gap', errorDetail: 'Delivery date 2025-05-22 is after production start', impactedReq: 'REQ-450', impactedPO: 'PO-8815', action: 'Expedite' },
    { parentItem: 'Motor Unit X1', component: 'Copper Wire RM', errorCode: 'Invalid HS Code', errorDetail: 'HS Code 7408.11 conflicts with import regulations', impactedReq: 'REQ-881', impactedPO: 'PO-4450', action: 'Review Docs' },
  ], []);

  const handlePerformAnalysis = (region: 'TR' | 'IN') => {
    setIsAnalyzing(true);
    setShowAnalysisResults(false);
    setAnalysisRegion(region);
    setSelectedCategory(null); // Reset detail view on new analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysisResults(true);
    }, 1200);
  };

  const annualSummaryData = [
    { category: t.rawMaterial, totalOrders: 145, totalValue: 1250000, trend: '+5%' },
    { category: 'Components', totalOrders: 88, totalValue: 840000, trend: '-2%' },
    { category: 'Packaging', totalOrders: 210, totalValue: 120000, trend: '+12%' },
    { category: 'MRO', totalOrders: 56, totalValue: 45000, trend: 'Stable' },
  ];

  const openOrdersData = [
    { poNo: 'PO-8801', origin: 'Turkey', category: t.rawMaterial, item: 'Cold Rolled Steel', itemCode: 'RM-STEEL-01', actualQty: 1000, budgetQty: 1000, actualPrice: 12.5, budgetPrice: 11.0, deliveryDate: '2025-05-15', status: 'Delayed', pallets: 12 },
    { poNo: 'PO-4420', origin: 'India', category: 'Components', item: 'Electric Motor V2', itemCode: 'COMP-MOT-V2', actualQty: 5000, budgetQty: 4800, actualPrice: 2.1, budgetPrice: 2.1, deliveryDate: '2025-05-28', status: 'On Track', pallets: 4 },
    { poNo: 'PO-8805', origin: 'Turkey', category: 'Packaging', item: 'Euro Pallets', itemCode: 'PACK-PAL-09', actualQty: 10000, budgetQty: 10000, actualPrice: 0.45, budgetPrice: 0.50, deliveryDate: '2025-05-25', status: 'On Track', pallets: 22 },
    { poNo: 'PO-4432', origin: 'India', category: 'Components', item: 'Control Board X', itemCode: 'COMP-BRD-X8', actualQty: 200, budgetQty: 200, actualPrice: 48.0, budgetPrice: 42.0, deliveryDate: '2025-05-10', status: 'Delayed', pallets: 1 },
    { poNo: 'PO-8812', origin: 'Turkey', category: t.rawMaterial, item: 'Alu Ingot', itemCode: 'RM-ALU-04', actualQty: 2500, budgetQty: 2000, actualPrice: 3.2, budgetPrice: 3.0, deliveryDate: '2025-06-02', status: 'On Track', pallets: 18 },
    { poNo: 'PO-4450', origin: 'India', category: 'Raw Material', item: 'Copper Wire', itemCode: 'RM-COP-99', actualQty: 800, budgetQty: 800, actualPrice: 9.1, budgetPrice: 8.5, deliveryDate: '2025-05-30', status: 'On Track', pallets: 3 },
    { poNo: 'PO-8815', origin: 'Turkey', category: 'Components', item: 'Hydraulic Seal', itemCode: 'COMP-HYD-S2', actualQty: 300, budgetQty: 300, actualPrice: 15.5, budgetPrice: 14.0, deliveryDate: '2025-05-22', status: 'On Track', pallets: 2 },
    { poNo: 'PO-8819', origin: 'Turkey', category: t.rawMaterial, item: 'Polyamide Granules', itemCode: 'RM-POLY-G1', actualQty: 5000, budgetQty: 4500, actualPrice: 4.8, budgetPrice: 4.5, deliveryDate: '2025-05-29', status: 'On Track', pallets: 10 },
  ];

  const filteredOrders = useMemo(() => {
    if (!analysisRegion) return [];
    const targetOrigin = analysisRegion === 'TR' ? 'Turkey' : 'India';
    return openOrdersData.filter(o => o.origin === targetOrigin);
  }, [analysisRegion, openOrdersData]);

  const categoryDetails = useMemo(() => {
    if (!selectedCategory) return [];
    return filteredOrders.filter(o => o.category === selectedCategory);
  }, [selectedCategory, filteredOrders]);

  const priceMetrics = useMemo(() => {
    let overQty = 0;
    let overImpact = 0;
    priceAnalysisData.forEach(d => {
      const diffQty = Math.max(0, d.actualQty - d.budgetQty);
      if (diffQty > 0) {
        overQty += diffQty;
        overImpact += (diffQty * d.actualPrice);
      }
    });
    const overAvgPrice = overQty > 0 ? overImpact / overQty : 0;
    return { overQty, overImpact, overAvgPrice };
  }, [priceAnalysisData]);

  const renderOrderAnalysis = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Selection Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 bg-blue-600 h-full"></div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex-1">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.orderAnalysis}</h3>
            <p className="text-sm text-slate-500 mt-1">Stratejik sipariş verimliliği ve bölge bazlı tedarik risk analizi.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => handlePerformAnalysis('TR')} className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 hover:bg-slate-800 active:scale-95 transition-all shadow-xl">
               <img src="https://flagcdn.com/w20/tr.png" className="w-5 rounded-sm" />
               <span>{isAnalyzing && analysisRegion === 'TR' ? t.fetchingData : `${t.performAnalysis} (TR)`}</span>
            </button>
            <button onClick={() => handlePerformAnalysis('IN')} className="px-6 py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 hover:bg-slate-700 active:scale-95 transition-all shadow-xl">
               <img src="https://flagcdn.com/w20/in.png" className="w-5 rounded-sm" />
               <span>{isAnalyzing && analysisRegion === 'IN' ? t.fetchingData : `${t.performAnalysis} (IN)`}</span>
            </button>
          </div>
        </div>
      </div>

      {showAnalysisResults && (
        <div className="space-y-8 animate-slideInUp">
          {/* Summary Cards - STATIC AS REQUESTED */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {annualSummaryData.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</p>
                <div className="flex items-end justify-between mt-2">
                  <h5 className="text-2xl font-black text-slate-800">{item.totalOrders} <span className="text-[10px] text-slate-400">Sipariş</span></h5>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${item.trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Orders Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
               <h4 className="font-black text-slate-800 uppercase tracking-tight">Active Supply Chain Nodes - {analysisRegion === 'TR' ? 'Turkey Hub' : 'India Hub'}</h4>
               <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">TAP CATEGORY FOR DETAILS</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <th className="px-8 py-4">PO NO</th>
                    <th className="px-8 py-4">ITEM NAME</th>
                    <th className="px-8 py-4">CATEGORY (DRILL-DOWN)</th>
                    <th className="px-8 py-4 text-center">QTY (ACTUAL/BUDGET)</th>
                    <th className="px-8 py-4 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((o, idx) => (
                    <tr key={idx} className={`transition-colors ${selectedCategory === o.category ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-8 py-5 font-mono text-xs font-black text-slate-900">{o.poNo}</td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-800">{o.item}</td>
                      <td className="px-8 py-5">
                        <button 
                          onClick={() => setSelectedCategory(o.category === selectedCategory ? null : o.category)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            selectedCategory === o.category 
                            ? 'bg-blue-600 text-white shadow-lg scale-105' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          {o.category}
                        </button>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <p className="text-sm font-black text-slate-800">{o.actualQty} / {o.budgetQty}</p>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${o.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Drill-down Detail Table */}
          {selectedCategory && (
            <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-2xl overflow-hidden animate-slideInUp">
              <div className="px-8 py-6 border-b border-blue-100 bg-blue-50/30 flex justify-between items-center">
                 <div>
                    <h4 className="font-black text-blue-900 uppercase tracking-tight">Kategori Detay Analizi: {selectedCategory}</h4>
                    <p className="text-xs text-blue-600 font-bold mt-1">Seçilen kategori altındaki tüm sipariş kalemleri ve lojistik detaylar.</p>
                 </div>
                 <button onClick={() => setSelectedCategory(null)} className="text-slate-400 hover:text-red-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-blue-50/50 border-b border-blue-100 text-[10px] text-blue-400 font-black uppercase tracking-widest">
                      <th className="px-8 py-4">ITEM CODE</th>
                      <th className="px-8 py-4">ITEM NAME</th>
                      <th className="px-8 py-4 text-center">UNIT PRICE Δ (%)</th>
                      <th className="px-8 py-4 text-center">PALLETS</th>
                      <th className="px-8 py-4 text-right">WH DELIVERY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {categoryDetails.map((o, idx) => {
                      const priceDiff = ((o.actualPrice - o.budgetPrice) / o.budgetPrice) * 100;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/30">
                          <td className="px-8 py-5 font-mono text-xs font-bold text-blue-900">{o.itemCode}</td>
                          <td className="px-8 py-5 text-sm font-bold text-slate-700">{o.item}</td>
                          <td className="px-8 py-5 text-center">
                            <span className={`text-xs font-black ${priceDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-8 py-5 text-center font-black text-slate-700">{o.pallets}</td>
                          <td className="px-8 py-5 text-right font-bold text-slate-500 text-xs">{o.deliveryDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] text-center">
                 End of Detailed Breakdown for {selectedCategory}
              </div>
            </div>
          )}

          <AIInsights section={`Order Compliance Analysis (${analysisRegion})`} data={filteredOrders} lang={lang} t={t} />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'orders': return renderOrderAnalysis();
      case 'prices': {
        const chartData = priceAnalysisData.map(d => ({ name: d.category, Budget: d.budgetTotal, Actual: d.actualTotal }));
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">{t.budgetTotal} vs {t.actualTotal}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend iconType="circle" />
                      <Bar dataKey="Budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-y-auto max-h-[400px]">
                <h3 className="font-bold text-slate-800 mb-4">Price Variance Analysis</h3>
                {priceAnalysisData.map((d, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100 flex justify-between items-center">
                    <div className="font-bold text-sm text-slate-700">{d.category}</div>
                    <div className="text-right">
                       <div className={`text-sm font-black ${d.actualTotal > d.budgetTotal ? 'text-red-600' : 'text-green-600'}`}>${d.actualTotal.toLocaleString()}</div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase">Budget: ${d.budgetTotal.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AIInsights section="Price & Qty Audit" data={priceAnalysisData} lang={lang} t={t} />
          </div>
        );
      }
      case 'escalation':
        return (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="mb-8">
                  <h3 className="font-black text-slate-800 text-2xl uppercase tracking-tight">{t.escalationAnalysis}</h3>
                  <p className="text-slate-500 text-sm mt-1">Hammadde (LME), işçilik ve enerji maliyet kırılımı.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1200px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                      <th className="p-4 sticky left-0 bg-slate-50 z-20 shadow-r">STOCK ITEM</th>
                      <th className="p-4 text-center">CURRENT ($)</th>
                      <th className="p-4 text-center bg-amber-50 text-amber-600">FX Δ (%)</th>
                      <th className="p-4 text-center bg-amber-50 text-amber-600">INF Δ (%)</th>
                      <th className="p-4 text-center">RAW Δ</th>
                      <th className="p-4 text-center">ENERGY Δ</th>
                      <th className="p-4 text-center">LABOR Δ</th>
                      <th className="p-4 text-center bg-indigo-50 text-indigo-700">NEW ($)</th>
                      <th className="p-4 text-right bg-red-50 text-red-600">BUDGET IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {escalationData.map((row, i) => {
                      const curTotal = row.current.raw + row.current.labor + row.current.energy + row.current.other;
                      const newTotal = row.new.raw + row.new.labor + row.new.energy + row.new.other;
                      const impact = (newTotal - curTotal) * row.actualQty;
                      return (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 sticky left-0 bg-white font-bold text-sm text-slate-800 border-r border-slate-100">{row.item}</td>
                          <td className="p-4 text-center font-mono font-bold">${curTotal.toFixed(2)}</td>
                          <td className="p-4 text-center font-mono text-amber-600 font-black">+{row.fxChange.toFixed(1)}%</td>
                          <td className="p-4 text-center font-mono text-amber-600 font-black">+{row.inflation.toFixed(1)}%</td>
                          <td className="p-4 text-center text-xs text-slate-500">+{(row.new.raw - row.current.raw).toFixed(2)}$</td>
                          <td className="p-4 text-center text-xs text-slate-500">+{(row.new.energy - row.current.energy).toFixed(2)}$</td>
                          <td className="p-4 text-center text-xs text-slate-500">+{(row.new.labor - row.current.labor).toFixed(2)}$</td>
                          <td className="p-4 text-center font-mono font-black text-indigo-700 bg-indigo-50/20">${newTotal.toFixed(2)}</td>
                          <td className="p-4 text-right font-mono font-black text-red-600 bg-red-50/20">-${impact.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <AIInsights section="Cost Escalation Analysis" data={escalationData} lang={lang} t={t} />
          </div>
        );
      case 'suppliers':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
               <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.supplierPerformance}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Vendor List</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                          <th className="px-6 py-4">VENDOR NAME</th>
                          <th className="px-6 py-4 text-center">OTD (%)</th>
                          <th className="px-6 py-4 text-center">QUALITY (%)</th>
                          <th className="px-6 py-4 text-center">PRICE IDX</th>
                          <th className="px-6 py-4 text-center">RISK</th>
                          <th className="px-6 py-4 text-right">VOL.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {supplierPerformanceData.map((s, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800 text-sm">{s.name}</td>
                            <td className="px-6 py-4 text-center font-mono font-bold text-blue-600">{s.otd}%</td>
                            <td className="px-6 py-4 text-center font-mono font-bold text-green-600">{s.quality}%</td>
                            <td className="px-6 py-4 text-center font-mono text-slate-600">{s.priceIdx}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                s.risk === 'Low' ? 'bg-green-100 text-green-700' :
                                s.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>{s.risk}</span>
                            </td>
                            <td className="px-6 py-4 text-right font-black text-slate-700">{s.volume}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Supply Chain Health</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                        { subject: 'OTD', A: 92, fullMark: 100 },
                        { subject: 'Quality', A: 98, fullMark: 100 },
                        { subject: 'Cost Savings', A: 85, fullMark: 100 },
                        { subject: 'Lead Time', A: 70, fullMark: 100 },
                        { subject: 'Innovation', A: 60, fullMark: 100 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                        <Radar name="Vendor Avg" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
            <AIInsights section="Supplier Risk Matrix" data={supplierPerformanceData} lang={lang} t={t} />
          </div>
        );
      case 'bom':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.bomControl}</h3>
                    <p className="text-slate-500 text-sm mt-1">MRP, REQ ve PO arasındaki kiritik uyumsuzluklar.</p>
                  </div>
                  <span className="px-4 py-2 bg-red-100 text-red-700 text-[10px] font-black rounded-xl uppercase tracking-widest">{bomErrorData.length} CRITICAL ERRORS</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                       <th className="px-8 py-5">PARENT ITEM / COMPONENT</th>
                       <th className="px-8 py-5">ERROR CATEGORY</th>
                       <th className="px-8 py-5">DETAILS</th>
                       <th className="px-8 py-5 text-center">IMPACTED (REQ/PO)</th>
                       <th className="px-8 py-5 text-right">ACTION</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {bomErrorData.map((row, i) => (
                       <tr key={i} className="hover:bg-red-50/10 transition-colors">
                         <td className="px-8 py-6">
                           <p className="text-sm font-black text-slate-800">{row.parentItem}</p>
                           <p className="text-[11px] text-indigo-600 font-bold mt-1 uppercase">{row.component}</p>
                         </td>
                         <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-black uppercase tracking-widest">{row.errorCode}</span>
                         </td>
                         <td className="px-8 py-6 text-xs text-slate-500 italic">{row.errorDetail}</td>
                         <td className="px-8 py-6 text-center text-[10px] font-black text-slate-700">
                            {row.impactedReq} / {row.impactedPO}
                         </td>
                         <td className="px-8 py-6 text-right">
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-200">{row.action}</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
            <AIInsights section="BOM Conflict Analysis" data={bomErrorData} lang={lang} t={t} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* KPI Stats Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${activeTab === 'prices' ? '6' : '3'} gap-6`}>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-blue-100 text-[11px] font-bold uppercase tracking-wider">{t.totalBudget}</p>
          <h3 className="text-2xl font-bold mt-1">$458,200</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.unitPrice}</p>
          <h3 className="text-xl font-bold text-slate-800 mt-1">$13.62</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.quantity}</p>
          <h3 className="text-xl font-bold text-slate-800 mt-1">6,900 pcs</h3>
        </div>
        {activeTab === 'prices' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm"><p className="text-red-500 text-[11px] font-bold uppercase tracking-wider">{t.overBudgetPurchaseQty}</p><h3 className="text-xl font-bold text-slate-800 mt-1">{priceMetrics.overQty} pcs</h3></div>
            <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm"><p className="text-red-500 text-[11px] font-bold uppercase tracking-wider">{t.overBudgetAvgPrice}</p><h3 className="text-xl font-bold text-slate-800 mt-1">${priceMetrics.overAvgPrice.toFixed(2)}</h3></div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 shadow-sm"><p className="text-red-700 text-[11px] font-bold uppercase tracking-wider">{t.overBudgetImpact}</p><h3 className="text-xl font-bold text-red-800 mt-1">${priceMetrics.overImpact.toLocaleString()}</h3></div>
          </>
        )}
      </div>

      {/* Dynamic Sub-View Content */}
      {renderContent()}
    </div>
  );
};

export default Procurement;
