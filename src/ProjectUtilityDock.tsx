import React, {useState} from 'react';
import SupportMeBlock, {SupportMeBlockProps} from './SupportMeBlock';
import FeedbackBlock, {ProjectFeedbackContext, ProjectFeedbackCategory} from './FeedbackBlock';

export interface ProjectUtilityDockProps {
  project: ProjectFeedbackContext;
  feedbackEndpoint: string;
  support?: Omit<SupportMeBlockProps,'projectName'|'onClose'>;
  feedbackCategories?: Array<{value: ProjectFeedbackCategory; label: string}>;
}

export default function ProjectUtilityDock({
  project,
  feedbackEndpoint,
  support={},
  feedbackCategories,
}: ProjectUtilityDockProps){
  const [panel,setPanel]=useState<'feedback'|'support'|null>(null);
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex gap-2">
        <button type="button" onClick={()=>setPanel('feedback')} className="rounded-full border border-rose-300 bg-white/95 px-3.5 py-2 text-xs font-bold text-rose-700 shadow-xl backdrop-blur hover:bg-white">
          ⚠ 回報問題
        </button>
        <button type="button" onClick={()=>setPanel('support')} className="rounded-full border border-amber-500/50 bg-slate-900/95 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-xl backdrop-blur hover:bg-slate-800">
          ☕ 支持專案
        </button>
      </div>
      {panel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)setPanel(null);}}>
          {panel==='feedback'
            ? <FeedbackBlock endpoint={feedbackEndpoint} context={project} categories={feedbackCategories} onClose={()=>setPanel(null)}/>
            : <SupportMeBlock {...support} projectName={project.projectName} onClose={()=>setPanel(null)}/>}
        </div>
      )}
    </>
  );
}
