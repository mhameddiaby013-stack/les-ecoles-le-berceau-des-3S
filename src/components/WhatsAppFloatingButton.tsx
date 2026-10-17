import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SCHOOL_INFO } from '../data/initialData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = "Bonjour, je souhaite obtenir des informations sur l'école Le Berceau des 3S.";
  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappRaw}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 animate-fade-in transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Secrétariat disponible sur WhatsApp</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Fermer l'infobulle"
            className="text-slate-400 hover:text-slate-600 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter l'école sur WhatsApp au +224 662 11 80 00"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-600/30 transition-all duration-200 border-2 border-white/20"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-emerald-600 shrink-0" />
        <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
          Contacter l'école sur WhatsApp
        </span>
      </a>
    </div>
  );
};
