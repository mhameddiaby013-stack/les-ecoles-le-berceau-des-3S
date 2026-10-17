import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO, SCHOOL_VALUES, TESTIMONIALS } from '../data/initialData';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  HeartHandshake, 
  Trophy, 
  CheckCircle, 
  Play, 
  Image as ImageIcon, 
  Calendar, 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  Users 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, mediaItems, newsItems, openMediaModal, openWhatsApp } = useSchool();

  // Filter published media featured on home
  const featuredMedia = mediaItems
    .filter((m) => m.published && m.featuredOnHome)
    .slice(0, 4);

  // Fallback to any published media if none flagged
  const displayMedia = featuredMedia.length > 0 ? featuredMedia : mediaItems.filter((m) => m.published).slice(0, 4);

  // Latest published news
  const homeNews = newsItems.filter((n) => n.published).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle decorative glowing background blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Excellence Éducative en République de Guinée</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight text-balance">
                Bienvenue à l'école <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-amber-200 to-emerald-300">
                  LE BERCEAU DES 3S
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
                <span className="font-semibold text-amber-300">Savoir · Sagesse · Succès</span> : un cadre scolaire d'exception, moderne et sécurisé, où chaque enfant s'épanouit de la Maternelle au Collège.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openWhatsApp()}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
                  <span>Contacter l'école sur WhatsApp</span>
                </button>

                <button
                  onClick={() => setActivePage('apropos')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 hover:border-white/40 transition-colors"
                >
                  Découvrir notre école
                </button>

                <button
                  onClick={() => setActivePage('programmes')}
                  className="px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-semibold text-sm sm:text-base transition-colors"
                >
                  Nos programmes →
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Effectifs limités par classe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Enseignants certifiés & dévoués</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Activités bilingues & numériques</span>
                </div>
              </div>
            </div>

            {/* Right Media Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group">
                <img
                  src="/src/assets/images/hero_school_children_1792242497726.jpg"
                  alt="Élèves de l'école Le Berceau des 3S en classe"
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Vie Scolaire 2026 - 2027
                    </span>
                    <p className="text-sm text-white font-medium mt-1">
                      Des enfants joyeux, curieux et engagés dans leur parcours d'apprentissage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* KPI Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-heading block tabular-nums">
                {SCHOOL_INFO.stats.students}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Élèves inscrits</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading block tabular-nums">
                {SCHOOL_INFO.stats.successRate}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Taux de réussite aux examens</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-heading block tabular-nums">
                {SCHOOL_INFO.stats.teachers}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Enseignants & Éducateurs</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading block tabular-nums">
                {SCHOOL_INFO.stats.classes}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Classes modernes équipées</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PRÉSENTATION DE L'ÉTABLISSEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/src/assets/images/school_campus_exterior_1792242498160.jpg"
                alt="Campus moderne de l'école Le Berceau des 3S"
                className="w-full h-[380px] sm:h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Campus Sécurisé & Accueillant</h2>
                    <p className="text-xs text-slate-600">Surveillance continue, infirmerie scolaire et cour végétalisée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                À propos de notre établissement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight text-balance">
                Une école humaine, exigeante et tournée vers l'avenir
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Fondée avec la conviction profonde que chaque enfant porte en lui un trésor d'intelligence et de créativité, l'école <strong>LE BERCEAU DES 3S</strong> offre un environnement éducatif d'élite à Conakry.
            </p>

            <p className="text-slate-600 leading-relaxed">
              De la toute petite enfance jusqu'au brevet du collège, nos méthodes associent la rigueur des programmes nationaux guinéens aux meilleures pratiques pédagogiques internationales (éveil scientifique, pratique de l'anglais renforcé, informatique et éducation morale).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <span className="font-bold text-blue-900 text-sm block mb-1">Maternelle Épanouie</span>
                <span className="text-xs text-slate-600">Développement moteur, langage, sociabilisation et confiance en soi.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="font-bold text-emerald-900 text-sm block mb-1">Primaire & Collège d'Élite</span>
                <span className="text-xs text-slate-600">Apprentissages fondamentaux solides et taux d'admission record.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('apropos')}
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-bold text-sm"
              >
                <span>En savoir plus sur notre histoire et notre équipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. LES VALEURS FONDATRICES : LES 3S */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Notre Philosophie Éducative
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Les 3 Piliers du Berceau des 3S
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Chaque lettre de notre nom incarne une promesse faite aux parents et aux enfants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCHOOL_VALUES.map((val, idx) => {
              const borderStyles = [
                'border-t-4 border-t-blue-600',
                'border-t-4 border-t-emerald-600',
                'border-t-4 border-t-amber-500'
              ][idx];

              const icon = [
                <BookOpen className="w-8 h-8 text-blue-600" key="1" />,
                <HeartHandshake className="w-8 h-8 text-emerald-600" key="2" />,
                <Trophy className="w-8 h-8 text-amber-500" key="3" />
              ][idx];

              return (
                <div
                  key={val.title}
                  className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 ${borderStyles} space-y-4 text-left hover:shadow-md transition-shadow`}
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Pilier 0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                      {val.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{val.subtitle}</p>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. DERNIÈRES PHOTOS ET VIDÉOS PUBLIÉES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
              Galerie & Vie Scolaire
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Dernières photos et vidéos de l'école
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Immergez-vous dans les moments forts de notre communauté scolaire : ateliers, sorties et cérémonies.
            </p>
          </div>

          <button
            onClick={() => setActivePage('galerie')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 shrink-0"
          >
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => openMediaModal(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Media Type Badge */}
                <div className="absolute top-3 left-3">
                  {item.type === 'video' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 text-xs font-semibold">
                      <Play className="w-3.5 h-3.5 fill-amber-300" />
                      <span>{item.duration || 'Vidéo'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-semibold">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Photo</span>
                    </span>
                  )}
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-semibold bg-white/90 text-slate-800 px-2 py-0.5 rounded shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.date}</span>
                  <span className="text-blue-600 font-semibold group-hover:underline">Ouvrir</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ACTUALITÉS ET ÉVÉNEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Actualités & Agenda
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              La vie à l'école Le Berceau des 3S
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Consultez les dernières annonces officielles de la direction et les temps forts à venir.
            </p>
          </div>

          <button
            onClick={() => setActivePage('actualites')}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 shrink-0"
          >
            <span>Toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setActivePage('actualites')}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col text-left"
            >
              {news.imageUrl && (
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{news.date}</span>
                    <span>·</span>
                    <span className="text-blue-700 font-semibold">{news.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {news.excerpt}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                  <span>Lire le communiqué complet →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TÉMOIGNAGES DE PARENTS */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
              La Confiance des Familles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Ce que disent les parents d'élèves
            </h2>
            <p className="text-blue-200 text-sm sm:text-base">
              La meilleure preuve de notre engagement quotidien est le sourire de nos élèves et la satisfaction de leurs parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-blue-100 italic leading-relaxed">
                    « {t.quote} »
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-bold text-white text-sm">{t.parentName}</h4>
                  <p className="text-xs text-amber-300 mt-0.5">{t.childClass}</p>
                  <p className="text-[11px] text-blue-300 mt-0.5">{t.year}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHATSAPP ADMISSION CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contact Direct & Échange Immédiat</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              Vous souhaitez inscrire votre enfant ou visiter notre campus ?
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Le secrétariat et la direction de l'école <strong>LE BERCEAU DES 3S</strong> répondent directement à vos questions sur WhatsApp au <strong>{SCHOOL_INFO.whatsappPhone}</strong>. Recevez la grille tarifaire, la fiche d'inscription ou planifiez une rencontre.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openWhatsApp("Bonjour, je souhaite obtenir des informations pour une nouvelle inscription au Berceau des 3S.")}
                className="px-6 py-4 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-800 text-white" />
                <span>Contacter l'école sur WhatsApp</span>
              </button>

              <button
                onClick={() => setActivePage('inscriptions')}
                className="px-6 py-4 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-semibold text-sm sm:text-base border border-emerald-400/30 transition-colors"
              >
                Consulter les démarches d'inscription
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
