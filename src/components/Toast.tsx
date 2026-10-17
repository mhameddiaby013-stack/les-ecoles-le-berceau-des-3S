import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useSchool();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 text-white border-emerald-700',
    info: 'bg-blue-900/90 text-white border-blue-700',
    warning: 'bg-amber-900/90 text-white border-amber-700',
    error: 'bg-rose-900/90 text-white border-rose-700'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-300 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-300 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-start gap-3 ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
