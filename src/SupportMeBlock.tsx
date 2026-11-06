import React from 'react';

export interface SupportMeBlockProps {
  authorName?: string;
  projectName?: string;
  buyMeACoffeeUrl?: string;
  onClose?: () => void;
}

export default function SupportMeBlock({
  authorName = 'Sunlake',
  projectName = '開源專案',
  buyMeACoffeeUrl = 'https://buymeacoffee.com/registerc',
  onClose
}: SupportMeBlockProps) {
  return (
    <div className="support-me-block relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200 p-6 sm:p-7 space-y-5">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-amber-500/20 via-emerald-500/15 to-transparent pointer-events-none" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          aria-label="關閉"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="text-center space-y-2 relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 text-slate-950 shadow-lg shadow-amber-500/20 mb-1 font-bold text-xl">
          ☕
        </div>
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
          支持「{projectName}」獨立開發 ❤️
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          由 {authorName} 獨立維護與研發。沒有干擾廣告，致力於打造純粹好用的工具。
        </p>
      </div>

      {/* Support Impact */}
      <div className="grid grid-cols-3 gap-2 relative">
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-800/40 text-center space-y-1">
          <div className="text-xl">🖥️</div>
          <div className="text-xs font-semibold text-slate-200">雲端運算</div>
          <div className="text-[10px] text-slate-400 leading-tight">伺服器與主機營運</div>
        </div>
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-800/40 text-center space-y-1">
          <div className="text-xl">📐</div>
          <div className="text-xs font-semibold text-slate-200">演算法開發</div>
          <div className="text-[10px] text-slate-400 leading-tight">持續開源與維護</div>
        </div>
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-800/40 text-center space-y-1">
          <div className="text-xl">📱</div>
          <div className="text-xs font-semibold text-slate-200">應用上架</div>
          <div className="text-[10px] text-slate-400 leading-tight">推動跨平台 App</div>
        </div>
      </div>

      {/* Channels & Payment Options */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs relative">
        <div className="flex items-center justify-between text-slate-300 font-medium pb-1 border-b border-slate-800/80">
          <span>贊助管道</span>
          <span className="text-[11px] text-emerald-400">官方安全金流</span>
        </div>

        <div className="pt-1 space-y-2">
          <a
            href={buyMeACoffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FFDD00] hover:bg-[#ffe224] text-slate-950 font-bold transition shadow-lg text-sm cursor-pointer"
          >
            ☕ 前往 {authorName} 的 Buy Me a Coffee 專頁 ↗
          </a>
          <div className="text-center text-[11px] text-slate-400 leading-relaxed">
            可自由選擇贊助杯數（1杯 / 3杯 / 自訂）<br />
            ✨ 支援信用卡、Apple Pay、Google Pay 及 PayPal 結帳付款
          </div>
        </div>
      </div>

      {/* Gratitude Footer */}
      <div className="text-center text-[11px] text-slate-500 relative">
        每一筆小額贊助都將全數用於伺服器費用與新功能研發，非常感謝您的慷慨支持！🙏
      </div>
    </div>
  );
}
