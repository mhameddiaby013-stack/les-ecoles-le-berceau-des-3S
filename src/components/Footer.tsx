import React from 'react';
import { useSchool, PageId } from '../context/SchoolContext';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/initialData';

export const Footer: React.FC = () => {
  const { setActivePage, openWhatsApp } = useSchool();

  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight font-heading">
                  LE BERCEAU DES 3S
                </h3>
                <p className="text-xs text-amber-400 font-medium">Savoir · Sagesse · Succès</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Institution scolaire de référence en Guinée. Nous formons avec rigueur et bienveillance les bâtisseurs et leaders de demain, de la Toute Petite Section jusqu'au Collège.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Engagement strict pour la protection de l'enfance</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Plan du site
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('accueil')} className="hover:text-white transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('apropos')} className="hover:text-white transition-colors">
                  À propos de notre école
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programmes')} className="hover:text-white transition-colors">
                  Nos classes & programmes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('galerie')} className="hover:text-white transition-colors">
                  Galerie photos & vidéos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('actualites')} className="hover:text-white transition-colors">
                  Actualités & événements
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('inscriptions')} className="hover:text-white transition-colors">
                  Inscriptions & tarifs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact & plan d'accès
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Contact & Secrétariat
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-slate-200">{SCHOOL_INFO.whatsappPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>{SCHOOL_INFO.hours}</span>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp()}
              className="mt-2 w-full py-2.5 px-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter sur WhatsApp</span>
            </button>
          </div>

          {/* Column 4: Cycles & Inscription */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Cycles d'enseignement
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-amber-300 block mb-0.5">La Maternelle (2 - 5 ans)</span>
                <span>Crèche, TPS, Petite, Moyenne et Grande Section</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-blue-300 block mb-0.5">Le Primaire (CP à CM2)</span>
                <span>Bases fondamentales solides et préparation au concours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-emerald-300 block mb-0.5">Le Collège (7e à 10e)</span>
                <span>Rigueur académique et préparation au BEPC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} École LE BERCEAU DES 3S - Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Conakry, République de Guinée</span>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Espace Administrateur (Directeur)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
