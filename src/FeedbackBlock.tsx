import React, {useState} from 'react';

export type ProjectFeedbackCategory =
  | 'result_missing'
  | 'result_incorrect'
  | 'ui_problem'
  | 'other';

export interface ProjectFeedbackContext {
  projectId: string;
  projectName: string;
  projectVersion?: string;
  page?: string;
  source?: string;
  details?: Record<string, unknown>;
}

export interface FeedbackBlockProps {
  endpoint: string;
  context: ProjectFeedbackContext;
  categories?: Array<{value: ProjectFeedbackCategory; label: string}>;
  onClose?: () => void;
}

const DEFAULT_CATEGORIES: FeedbackBlockProps['categories'] = [
  {value:'result_missing', label:'沒有得到結果／資料'},
  {value:'result_incorrect', label:'結果或判斷不正確'},
  {value:'ui_problem', label:'畫面或操作有問題'},
  {value:'other', label:'其他'},
];

export default function FeedbackBlock({
  endpoint,
  context,
  categories=DEFAULT_CATEGORIES,
  onClose,
}: FeedbackBlockProps) {
  const [category,setCategory]=useState<ProjectFeedbackCategory>('result_incorrect');
  const [note,setNote]=useState('');
  const [sending,setSending]=useState(false);
  const [feedbackId,setFeedbackId]=useState('');
  const [error,setError]=useState('');

  async function submit(){
    setSending(true); setError('');
    try{
      const response=await fetch(endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          schema:'milkcat.project-feedback/v1',
          category,
          note,
          context:{
            ...context,
            page:context.page || (typeof window!=='undefined' ? window.location.href : undefined),
            viewport:typeof window!=='undefined' ? window.innerWidth+'x'+window.innerHeight : undefined,
          }
        })
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw Error(data.error || 'feedback_submit_failed');
      setFeedbackId(data.feedback_id || 'received');
    }catch(err){
      setError((err as Error).message || 'feedback_submit_failed');
    }finally{
      setSending(false);
    }
  }

  return (
    <div className="project-feedback-block relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 p-6 space-y-5">
      {onClose && <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:bg-slate-100" aria-label="關閉">✕</button>}
      <div>
        <h3 className="text-lg font-bold">回報「{context.projectName}」問題</h3>
        <p className="mt-1 text-xs text-slate-500">會附帶專案、版本、頁面與診斷上下文；不應自動上傳使用者私人檔案內容。</p>
      </div>
      {feedbackId ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <b>已收到，謝謝你的回報。</b>
          <div className="mt-1 text-xs break-all">回報編號：{feedbackId}</div>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            {categories.map(item=>(
              <label key={item.value} className={'flex items-center gap-2 rounded-xl border px-3 py-2.5 cursor-pointer '+(category===item.value?'border-rose-400 bg-rose-50':'border-slate-200')}>
                <input type="radio" checked={category===item.value} onChange={()=>setCategory(item.value)}/>
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
          <textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={1600} rows={4} placeholder="請補充發生什麼情況；若知道正確結果，也請一起提供。" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"/>
          {error && <div className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</div>}
          <button type="button" disabled={sending} onClick={submit} className="w-full rounded-xl bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold py-2.5 text-sm">
            {sending?'正在送出…':'送出回報'}
          </button>
        </>
      )}
    </div>
  );
}
