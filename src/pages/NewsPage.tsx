import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { NewsItem } from '../types/school';
import { 
  Calendar, 
  Clock, 
  Share2, 
  MessageCircle, 
  ArrowRight, 
  X, 
  Bell, 
  CalendarDays, 
  CheckCircle2 
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { newsItems, openWhatsApp, showToast } = useSchool();
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Visitors see published news items
  const publishedNews = newsItems.filter((n) => n.published);

  // Upcoming School Calendar Events
  const upcomingEvents = [
    {
      title: 'Journée Portes Ouvertes & Visite du Campus',
      date: 'Samedi 24 Octobre 2026',
      time: '09h00 - 15h00',
      location: 'Campus Le Berceau des 3S - Kipé',
      tag: 'Grand Public'
    },
    {
      title: 'Première Réunion Générale des Parents d\'Élèves',
      date: 'Samedi 07 Novembre 2026',
      time: '10h00 - 12h30',
      location: 'Salle polyvalente',
      tag: 'Parents'
    },
    {
      title: 'Foire Scientifique & Démonstration Robotique',
      date: 'Vendredi 18 Décembre 2026',
      time: '13h30 - 17h00',
      location: 'Cour d\'honneur & Laboratoires',
      tag: 'Élèves & Familles'
    },
    {
      title: 'Session d\'Examens Blancs n°1 (CM2 & 10e Année)',
      date: 'Du 11 au 15 Janvier 2027',
      time: '08h00 - 14h00',
      location: 'Salles d\'examens',
      tag: 'Examen'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
            Journal de l'Établissement & Agenda
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Actualités et Événements Scolaires
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Retrouvez tous les communiqués officiels, les projets pédagogiques et les dates clés de l'année scolaire 2026-2027.
          </p>
        </div>
      </section>

      {/* Main Grid: Articles + Calendar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: News Articles (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-700" />
              <span>Dernières publications de la direction</span>
            </h2>

            <div className="space-y-6">
              {publishedNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                >
                  {news.imageUrl && (
                    <div className="md:w-64 bg-slate-100 shrink-0 aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-700">{news.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {news.date}
                        </span>
                        <span>·</span>
                        <span>Par {news.author}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {news.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {news.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <button
                        onClick={() => setSelectedArticle(news)}
                        className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                      >
                        <span>Lire le communiqué complet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openWhatsApp(`Bonjour, je souhaite des précisions au sujet de l'actualité : "${news.title}".`)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Question WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Calendar & Highlights (4 cols) */}
          <div className="lg:col-span-4 space-y-8 text-left">
            
            {/* Calendar card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
                <CalendarDays className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-heading">Calendrier Scolaire 2026 - 2027</h3>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-amber-300">{ev.date}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
                        {ev.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{ev.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{ev.time}</span>
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openWhatsApp("Bonjour, je souhaite obtenir le calendrier scolaire officiel complet du Berceau des 3S.")}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold text-center block transition-colors"
              >
                Demander le calendrier complet sur WhatsApp
              </button>
            </div>

            {/* Quick newsletter/alert box */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200/70 space-y-3">
              <h4 className="text-sm font-bold text-blue-950 font-heading">
                Restez informés en temps réel
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Les circulaires importantes, dates d'examens et convocations sont également diffusées sur notre fil de diffusion WhatsApp officiel réservé aux parents d'élèves.
              </p>
              <button
                onClick={() => openWhatsApp("Bonjour, je souhaite être ajouté au fil d'information WhatsApp de l'école.")}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Rejoindre le fil WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Article Full Detail Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedArticle.imageUrl && (
              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{selectedArticle.date}</span>
                <span>·</span>
                <span>Auteur : {selectedArticle.author}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="prose prose-sm text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base border-t border-slate-100 pt-4">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => openWhatsApp(`Bonjour, je vous écris suite au communiqué : "${selectedArticle.title}".`)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contacter l'administration sur WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Lien du communiqué copié dans le presse-papier.');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
