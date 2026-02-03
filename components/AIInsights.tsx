
import React, { useState } from 'react';
import { getSupplyChainInsights } from '../services/openai';
import { Translations, Language } from '../types';

interface AIInsightsProps {
  section: string;
  data: any;
  lang: Language;
  t: Translations;
}

const AIInsights: React.FC<AIInsightsProps> = ({ section, data, lang, t }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await getSupplyChainInsights(section, data, lang);
      setInsight(result);
    } catch (err) {
      setInsight("Unable to generate analysis at this time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h3 className="font-bold text-slate-800 text-lg">{t.aiInsights}</h3>
      </div>

      <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[150px] relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-indigo-600 uppercase animate-pulse">{t.generating}</p>
            </div>
          </div>
        ) : insight ? (
          <div className="prose prose-sm max-w-none text-slate-600 whitespace-pre-line text-sm leading-relaxed">
            {insight}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-slate-400 text-sm">Click the button to generate AI insights for current {section} data.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        <span>{t.analyze}</span>
      </button>
    </div>
  );
};

export default AIInsights;
