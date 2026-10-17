import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO, SCHOOL_VALUES } from '../data/initialData';
import { 
  ShieldCheck, 
  Award, 
  Heart, 
  Target, 
  GraduationCap, 
  MessageCircle, 
  Users, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openWhatsApp, setActivePage } = useSchool();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>Histoire & Projet Éducatif</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            À propos de l'école LE BERCEAU DES 3S
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Découvrez notre histoire, notre vision pédagogique et notre engagement indéfectible pour l'épanouissement de chaque élève en République de Guinée.
          </p>
        </div>
      </section>

      {/* Le Mot du Directeur */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-4 text-center space-y-4">
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-blue-50">
                <img
                  src="/src/assets/images/school_campus_exterior_1792242498160.jpg"
                  alt="Direction de l'école Le Berceau des 3S"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg font-heading">
                  M. Le Directeur Général
                </h3>
                <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider">
                  Fondateur & Chef d'Établissement
                </p>
                <p className="text-xs text-slate-500 mt-1">LE BERCEAU DES 3S - Conakry</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Message aux familles
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  « Préparer nos enfants à exceller avec rigueur, humanisme et confiance »
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Chers parents, chers membres de la communauté éducative,
                </p>
                <p>
                  Choisir l'école de son enfant est l'une des décisions les plus déterminantes dans la vie d'une famille. À <strong>LE BERCEAU DES 3S</strong>, nous avons conçu un sanctuaire d'apprentissage où la rigueur académique ne sacrifie jamais la tendresse, et où la discipline rime toujours avec encouragement.
                </p>
                <p>
                  Le nom <strong>« Les 3S »</strong> résume toute notre vocation : le <strong>Savoir</strong> pour éclairer l'esprit, la <strong>Sagesse</strong> pour forger le caractère et les valeurs morales, et le <strong>Succès</strong> comme couronnement naturel du travail assidu.
                </p>
                <p>
                  Chaque jour, nos enseignants et éducateurs déploient toute leur passion pour offrir à vos enfants un enseignement personnalisé, stimulant leur curiosité dès la crèche et les propulsant vers les plus hauts sommets du cycle fondamental.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => openWhatsApp("Bonjour Monsieur le Directeur, je souhaiterais échanger avec vous concernant l'école Le Berceau des 3S.")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Échanger avec la Direction sur WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Notre Histoire & Évolution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Une décennie d'engagement
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              De quelques salles pionnières à un complexe scolaire d'excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Créée en 2016 à Conakry pour répondre à la demande de familles exigeantes en quête d'un enseignement de qualité internationale, l'école <strong>LE BERCEAU DES 3S</strong> a débuté avec les sections de maternelle avant d'ouvrir progressivement l'ensemble du cycle primaire puis le collège.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Aujourd'hui, l'établissement compte plus de 480 élèves, des laboratoires de sciences, une bibliothèque vivante, une salle informatique connectée et un espace vert récréatif entièrement sécurisé.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">Programme national guinéen enrichi de modules linguistiques en anglais</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">Suivi psychopédagogique individualisé pour chaque élève</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">Relation école-parents permanente et transparente par WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/src/assets/images/children_science_activity_1792242500149.jpg"
                alt="Activités d'apprentissage à l'école Le Berceau des 3S"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Charte de Sécurité et Protection des Élèves */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  Charte de Protection des Enfants & Respect de l'Image
                </h3>
                <p className="text-xs text-slate-400">Politique éthique et conformité de l'école LE BERCEAU DES 3S</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
              Conformité Garantie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="font-bold text-amber-300 block">Autorisation Parentale Préalable</span>
              <p className="text-slate-300 text-xs leading-relaxed">
                Aucune photo ou vidéo d'élève identifiable n'est publiée sur notre site internet ou nos réseaux sans le consentement écrit formel des parents ou tuteurs légaux lors de l'inscription.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="font-bold text-blue-300 block">Sécurisation du Campus & Contrôle</span>
              <p className="text-slate-300 text-xs leading-relaxed">
                L'accès à l'école est strictement filtré par des agents assermentés. La remise des élèves en fin de journée s'effectue exclusivement auprès des personnes autorisées munies de la carte parent.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="font-bold text-emerald-300 block">Droit de Retrait Immédiat</span>
              <p className="text-slate-300 text-xs leading-relaxed">
                Tout parent dispose d'un droit inconditionnel de rectification ou de retrait de tout média représentant son enfant, sur simple notification par WhatsApp au secrétariat au {SCHOOL_INFO.whatsappPhone}.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
