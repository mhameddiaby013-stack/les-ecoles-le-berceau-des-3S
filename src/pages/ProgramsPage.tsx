import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO } from '../data/initialData';
import { 
  Baby, 
  BookOpen, 
  GraduationCap, 
  Palette, 
  Cpu, 
  Globe2, 
  CheckCircle, 
  MessageCircle, 
  Clock, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { openWhatsApp, setActivePage } = useSchool();
  const [selectedCycle, setSelectedCycle] = useState<'maternelle' | 'primaire' | 'college' | 'clubs'>('maternelle');

  const cycles = [
    {
      id: 'maternelle' as const,
      name: 'La Maternelle (2 - 5 ans)',
      short: 'Maternelle',
      icon: <Baby className="w-5 h-5" />,
      color: 'amber'
    },
    {
      id: 'primaire' as const,
      name: 'Le Primaire (CP à CM2)',
      short: 'Primaire',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'college' as const,
      name: 'Le Collège (7e à 10e année)',
      short: 'Collège',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'emerald'
    },
    {
      id: 'clubs' as const,
      name: 'Clubs & Périscolaire',
      short: 'Ateliers',
      icon: <Palette className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
            Cycles & Méthodes Pédagogiques
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Nos Classes et nos Programmes
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Un cursus structuré, progressif et stimulant conçu pour révéler le meilleur potentiel de votre enfant à chaque étape de sa croissance.
          </p>
        </div>
      </section>

      {/* Interactive Cycle Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-2xl mx-auto mb-10">
          {cycles.map((c) => {
            const isActive = selectedCycle === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCycle(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-white text-blue-950 shadow-md scale-102'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {c.icon}
                <span>{c.short}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Maternelle */}
        {selectedCycle === 'maternelle' && (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-amber-50/50 rounded-3xl p-8 sm:p-12 border border-amber-200/70 text-left grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Cycle 1 · Petite Enfance
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  Le Berceau : Un cocon d'éveil, de douceur et d'autonomie
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  De 2 à 5 ans, l'enfant explore le monde avec tous ses sens. Notre section maternelle offre un univers bienveillant, stimulant et sécurisé où chaque jour est une aventure d'apprentissage.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm space-y-1">
                    <span className="font-bold text-amber-900 text-sm block">Toute Petite & Petite Section</span>
                    <span className="text-xs text-slate-600">Acquisition du langage oral, propreté, motricité globale et jeux sensoriels.</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm space-y-1">
                    <span className="font-bold text-amber-900 text-sm block">Moyenne & Grande Section</span>
                    <span className="text-xs text-slate-600">Pré-lecture phonétique, graphisme, numération et initiation à l'anglais.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openWhatsApp("Bonjour, je souhaite des renseignements sur l'inscription en classe de Maternelle au Berceau des 3S.")}
                    className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Renseignements Maternelle sur WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-amber-200">
                  <img
                    src="/src/assets/images/kindergarten_play_learning_1792242499931.jpg"
                    alt="Classe de maternelle Le Berceau des 3S"
                    className="w-full h-[360px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Curriculum detail list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">Langage & Expression Orale</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Contes, comptines, vocabulaire riche, articulation et premiers repères phonologiques pour préparer la lecture.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">Motricité Fine & Graphisme</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pâte à modeler, perles, puzzles géants et tenue du crayon pour développer une coordination gestuelle parfaite.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">Sociabilisation & Autonomie</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apprentissage du vivre-ensemble, respect des règles de la classe, partage et confiance en ses capacités.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Primaire */}
        {selectedCycle === 'primaire' && (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-blue-50/50 rounded-3xl p-8 sm:p-12 border border-blue-200/70 text-left grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  Cycle Fondamental · CP à CM2
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  L'Enseignement Primaire : L'ancrage des savoirs fondamentaux
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Le cycle primaire pose les fondations intellectuelles et morales de l'élève. Notre pédagogie active valorise le goût de l'effort, la rigueur de raisonnement et le plaisir de réussir.
                </p>

                <div className="space-y-2 pt-1 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>CP1 & CP2 : Maîtrise de la lecture fluide, écriture soignée et calcul</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>CE1 & CE2 : Grammaire, conjugaison, fractions, géométrie et histoire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>CM1 & CM2 : Esprit d'analyse et préparation intensive à l'Examen d'Entrée en 7e</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openWhatsApp("Bonjour, je souhaite des renseignements sur l'inscription au Primaire au Berceau des 3S.")}
                    className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Renseignements Primaire sur WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-blue-200">
                  <img
                    src="/src/assets/images/hero_school_children_1792242497726.jpg"
                    alt="Élèves du primaire Le Berceau des 3S"
                    className="w-full h-[360px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Collège */}
        {selectedCycle === 'college' && (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-emerald-200/70 text-left grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Enseignement Fondamental · 7e à 10e Année
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  Le Collège : Rigueur scientifique, méthode et préparation au BEPC
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Le collège prépare les adolescents à devenir des élèves autonomes, réfléchis et ambitieux. Un encadrement strict et bienveillant les accompagne vers l'obtention brillante du Brevet d'Études du Premier Cycle.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm space-y-1">
                    <span className="font-bold text-emerald-900 text-sm block">Sciences & Pratique</span>
                    <span className="text-xs text-slate-600">Mathématiques, Physique-Chimie, SVT et informatique appliquée.</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm space-y-1">
                    <span className="font-bold text-emerald-900 text-sm block">Lettres & Humanités</span>
                    <span className="text-xs text-slate-600">Français, dissertation, littérature africaine, histoire et anglais.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openWhatsApp("Bonjour, je souhaite des renseignements sur l'inscription au Collège au Berceau des 3S.")}
                    className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Renseignements Collège sur WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-emerald-200">
                  <img
                    src="/src/assets/images/children_science_activity_1792242500149.jpg"
                    alt="Atelier sciences collège Le Berceau des 3S"
                    className="w-full h-[360px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Clubs & Périscolaire */}
        {selectedCycle === 'clubs' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Clubs de Découverte & Activités Périscolaires
              </h2>
              <p className="text-slate-600 text-sm">
                Parce qu'un élève épanoui développe aussi des passions artistiques, sportives et technologiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Club Robotique & Numérique</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Initiation au code informatique visuel, logique algorithmique et manipulation de composants robotiques éducatifs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Club d'Échecs & Stratégie</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Développement de la concentration, anticipation, patience et analyse tactique dès la classe de CE1.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Théâtre, Arts Plastiques & Élocution</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prise de parole en public sans timidité, peinture, chorale scolaire et expression corporelle.
                </p>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Schedule & Campus life info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Rythme & Horaires
            </span>
            <h3 className="text-2xl font-bold font-heading">
              Une journée équilibrée à l'école Le Berceau des 3S
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Accueil dès 07h30, cours du matin, pause méridienne encadrée avec cantine saine, ateliers pratiques l'après-midi et étude surveillée jusqu'à 17h00.
            </p>
          </div>

          <button
            onClick={() => setActivePage('inscriptions')}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shrink-0 transition-colors flex items-center gap-2"
          >
            <span>Consulter les inscriptions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
