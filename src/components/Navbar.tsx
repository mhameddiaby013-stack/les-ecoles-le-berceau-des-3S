import React, { useState } from 'react';
import { useSchool, PageId } from '../context/SchoolContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  MessageCircle, 
  Lock, 
  UserCheck, 
  PhoneCall 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/initialData';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, isAdminAuthenticated, adminUser, openWhatsApp } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À propos' },
    { id: 'programmes', label: 'Classes & Programmes' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'inscriptions', label: 'Inscriptions' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-emerald-400">Rentrée Scolaire 2026-2027</span>
            <span>·</span>
            <span className="text-slate-300">Inscriptions ouvertes de la Maternelle au Collège</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SCHOOL_INFO.whatsappPhone}</span>
            </span>
            <span>·</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="hover:text-white flex items-center gap-1 transition-colors text-slate-400 hover:text-amber-300"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Tableau de bord (Directeur)' : 'Espace Directeur'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand wordmark & seal */}
        <button
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-blue-950 font-heading leading-tight whitespace-nowrap">
              LE BERCEAU DES 3S
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
              Savoir · Sagesse · Succès
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Admin quick access */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin badge if logged in */}
          {isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
              title="Connecté en tant que Directeur"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="truncate max-w-[120px]">Espace Directeur</span>
            </button>
          )}

          {/* Official WhatsApp Primary Action */}
          <button
            onClick={() => openWhatsApp()}
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
            <span className="whitespace-nowrap">WhatsApp École</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </button>
              );
            })}

            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => openWhatsApp()}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Contacter sur WhatsApp (+224 662 11 80 00)</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 transition-colors"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                <span>{isAdminAuthenticated ? 'Accéder au Tableau de Bord' : 'Connexion Espace Directeur'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
