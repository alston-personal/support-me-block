import React, { useState } from 'react';

export interface SupportTier {
  amount: number;
  label: string;
  desc: string;
}

export interface SupportMeBlockProps {
  authorName?: string;
  projectName?: string;
  buyMeACoffeeUrl?: string;
  payPalUrl?: string;
  tiers?: SupportTier[];
  onClose?: () => void;
}

export const defaultTiers: SupportTier[] = [
  { amount: 50, label: '☕ 請喝一杯咖啡', desc: '鼓勵作者持續維護開源與演算法研發' },
  { amount: 150, label: '🍵 贊助一壺好茶', desc: '支援雲端運算與伺服器營運成本' },
  { amount: 500, label: '🏡 核心資助', desc: '加速新功能開發與跨平台應用上架' }
];

export default function SupportMeBlock({
  authorName = 'Sunlake',
  projectName = '開源專案',
  buyMeACoffeeUrl = 'https://buymeacoffee.com/registerc',
  payPalUrl = '',
  tiers = defaultTiers,
  onClose
}: SupportMeBlockProps) {
  const [selectedTier, setSelectedTier] = useState<number>(150);

  return (
    <div className="support-me-block relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200 p-6 sm:p-7 space-y-5">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-amber-500/20 via-emerald-500/15 to-transparent pointer-events-none" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="關閉"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="text-center space-y-1.5 relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 text-slate-950 shadow-lg shadow-amber-500/20 mb-1 font-bold text-xl">
          ☕
        </div>
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
          支持「{projectName}」獨立開發
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          由 {authorName} 獨立維護與研發。沒有干擾廣告，您的贊助是維護伺服器與持續開發的最大動力！
        </p>
      </div>

      {/* Tier Selection */}
      <div className="grid grid-cols-3 gap-2.5 relative">
        {tiers.map((t) => (
          <button
            key={t.amount}
            type="button"
            onClick={() => setSelectedTier(t.amount)}
            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              selectedTier === t.amount
                ? 'border-amber-400/80 bg-amber-500/10 shadow-md shadow-amber-500/10 text-white'
                : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-semibold">{t.label.split(' ')[0]}</div>
            <div className="text-lg font-bold text-amber-300 mt-1">NT$ {t.amount}</div>
            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.label.split(' ').slice(1).join(' ')}</div>
          </button>
        ))}
      </div>

      {/* Channels & Payment Options */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs relative">
        <div className="flex items-center justify-between text-slate-300 font-medium pb-2 border-b border-slate-800">
          <span>贊助管道</span>
          <span className="text-[11px] text-emerald-400">官方安全金流</span>
        </div>

        {/* Buy Me a Coffee */}
        <div className="pt-1">
          <a
            href={buyMeACoffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FFDD00] hover:bg-[#ffe224] text-slate-950 font-bold transition shadow-lg text-sm cursor-pointer"
          >
            ☕ 前往 {authorName} 的 Buy Me a Coffee 專頁 ↗
          </a>
          <div className="mt-2 text-center text-[11px] text-slate-400 leading-relaxed">
            ✨ 支援信用卡、Apple Pay、Google Pay 及 PayPal 結帳付款
          </div>
        </div>

        {payPalUrl && (
          <div className="pt-1">
            <a
              href={payPalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0079C1] hover:bg-[#0069a8] text-white font-bold transition shadow text-xs cursor-pointer"
            >
              使用 PayPal 贊助 ↗
            </a>
          </div>
        )}
      </div>

      {/* Gratitude Footer */}
      <div className="text-center text-[11px] text-slate-500 relative">
        每一筆小額贊助都將全數用於伺服器費用與新功能研發，非常感謝您的慷慨支持！🙏
      </div>
    </div>
  );
}
