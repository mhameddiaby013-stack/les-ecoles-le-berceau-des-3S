import React, { useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { X, Calendar, ShieldCheck, Film, Image as ImageIcon, ExternalLink, Play } from 'lucide-react';

export const MediaModal: React.FC = () => {
  const { activeMediaModal, closeMediaModal, openWhatsApp } = useSchool();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMediaModal();
      }
    };
    if (activeMediaModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMediaModal, closeMediaModal]);

  if (!activeMediaModal) return null;

  const item = activeMediaModal;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={closeMediaModal}
    >
      <div 
        className="relative bg-slate-900 border border-slate-800 text-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {item.type === 'video' ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Film className="w-3.5 h-3.5" />
                Vidéo scolaire
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <ImageIcon className="w-3.5 h-3.5" />
                Photo
              </span>
            )}
            <span className="text-xs text-slate-400 truncate">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeMediaModal}
              aria-label="Fermer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Content Stage */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] max-h-[60vh] overflow-hidden">
          {item.type === 'video' ? (
            <video 
              src={item.url} 
              controls 
              autoPlay 
              playsInline
              className="w-full h-full max-h-[60vh] object-contain"
            >
              Votre navigateur ne prend pas en charge la lecture de cette vidéo.
            </video>
          ) : (
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full max-h-[60vh] object-contain select-none"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Metadata Footer */}
        <div className="p-5 sm:p-6 bg-slate-900 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {item.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.date}</span>
                </div>
                <span>·</span>
                <span>Publié par : {item.author}</span>
                {item.parentalConsentVerified && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Autorisation parentale vérifiée
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0">
              <button
                onClick={() => openWhatsApp(`Bonjour, je vous contacte concernant le contenu : "${item.title}".`)}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                Poser une question sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
