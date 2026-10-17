import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { MediaCategory, MediaType } from '../types/school';
import { 
  Play, 
  Image as ImageIcon, 
  Film, 
  Filter, 
  PlusCircle, 
  ShieldCheck, 
  Calendar, 
  Search, 
  MessageCircle 
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { mediaItems, openMediaModal, isAdminAuthenticated, setActivePage, openWhatsApp } = useSchool();
  
  const [typeFilter, setTypeFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Public visitors only see published items!
  const publishedItems = mediaItems.filter((item) => item.published);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'Vie scolaire', label: 'Vie scolaire' },
    { id: 'Maternelle', label: 'Maternelle' },
    { id: 'Primaire', label: 'Primaire' },
    { id: 'Sciences & Découverte', label: 'Sciences & Découverte' },
    { id: 'Sorties pédagogiques', label: 'Sorties pédagogiques' },
    { id: 'Fêtes & Cérémonies', label: 'Fêtes & Cérémonies' },
    { id: 'Sport & Culture', label: 'Sport & Culture' }
  ];

  const filteredMedia = publishedItems.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  const photoCount = publishedItems.filter((m) => m.type === 'photo').length;
  const videoCount = publishedItems.filter((m) => m.type === 'video').length;

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <span>Médiathèque Officielle de l'École</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Galerie Photos & Vidéos
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Vivez le quotidien vibrant de nos élèves : cérémonies, cours interactifs, sorties éducatives et célébrations.
          </p>

          {/* Quick stats unboxed */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>{photoCount} photos publiées</span>
            <span>·</span>
            <span>{videoCount} vidéos scolaires</span>
            <span>·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Droits d'image respectés
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Type Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setTypeFilter('all')}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                typeFilter === 'all'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tous ({publishedItems.length})
            </button>
            <button
              onClick={() => setTypeFilter('photo')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                typeFilter === 'photo'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos ({photoCount})</span>
            </button>
            <button
              onClick={() => setTypeFilter('video')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                typeFilter === 'video'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Vidéos ({videoCount})</span>
            </button>
          </div>

          {/* Center: Search input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
            />
          </div>

          {/* Right: Category selector */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Admin Quick Publish Banner if logged in */}
        {isAdminAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">Mode Direction Actif</h4>
                <p className="text-xs text-amber-800">Vous pouvez ajouter directement de nouvelles photos et vidéos depuis votre tableau de bord.</p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('admin')}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shrink-0"
            >
              Gérer la médiathèque
            </button>
          </div>
        )}

        {/* Media Grid */}
        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => openMediaModal(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-left"
              >
                {/* Media stage preview */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-semibold bg-white/95 text-slate-800 px-2 py-0.5 rounded shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    {item.type === 'video' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-amber-300 text-xs font-semibold">
                        <Play className="w-3 h-3 fill-amber-300" />
                        <span>{item.duration || 'Vidéo'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-xs font-semibold">
                        <ImageIcon className="w-3 h-3" />
                        <span>Photo</span>
                      </span>
                    )}
                  </div>

                  {/* Video Play Icon Overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <span className="text-blue-600 font-bold group-hover:underline">
                      {item.type === 'video' ? 'Visionner ▶' : 'Agrandir ⤢'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 max-w-md mx-auto">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Aucun média trouvé</h3>
            <p className="text-xs text-slate-500">
              Aucun contenu ne correspond à vos critères de recherche actuels.
            </p>
            <button
              onClick={() => {
                setTypeFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-blue-600 hover:underline pt-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>

      {/* Parent privacy info footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p>
              Toutes les images et vidéos publiées respectent la charte de droit à l'image et ont fait l'objet d'une autorisation parentale écrite.
            </p>
          </div>
          <button
            onClick={() => openWhatsApp("Bonjour, je souhaite poser une question au sujet de la galerie multimédia de l'école.")}
            className="text-emerald-700 font-bold hover:underline shrink-0 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Question sur une publication</span>
          </button>
        </div>
      </section>

    </div>
  );
};
