import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO } from '../data/initialData';
import { 
  FileText, 
  CheckCircle, 
  UserCheck, 
  Calendar, 
  MessageCircle, 
  Send, 
  HelpCircle, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

export const AdmissionsPage: React.FC = () => {
  const { submitInquiry, openWhatsApp } = useSchool();

  // Pre-registration form state
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [targetClass, setTargetClass] = useState('Petite Section Maternelle');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const classesList = [
    'Crèche / Toute Petite Section (2 ans)',
    'Petite Section Maternelle (3 ans)',
    'Moyenne Section Maternelle (4 ans)',
    'Grande Section Maternelle (5 ans)',
    'CP1 (Cours Préparatoire 1)',
    'CP2 (Cours Préparatoire 2)',
    'CE1 (Cours Élémentaire 1)',
    'CE2 (Cours Élémentaire 2)',
    'CM1 (Cours Moyen 1)',
    'CM2 (Cours Moyen 2)',
    '7ème Année (Collège)',
    '8ème Année (Collège)',
    '9ème Année (Collège)',
    '10ème Année - Brevet BEPC'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !studentName) {
      alert('Veuillez remplir au moins le nom du parent, le numéro de téléphone et le nom de l\'enfant.');
      return;
    }

    // Save inquiry to school context
    submitInquiry({
      parentName,
      phone,
      email,
      studentName,
      studentAge: studentAge || 'Non précisé',
      targetClass,
      message: message || 'Demande d\'inscription standard'
    });

    setSubmitted(true);

    // Prepare formatted WhatsApp message
    const formattedMsg = `*DEMANDE DE PRÉ-INSCRIPTION - LE BERCEAU DES 3S*\n\n` +
      `👤 *Parent :* ${parentName}\n` +
      `📞 *Téléphone :* ${phone}\n` +
      `✉️ *Email :* ${email || 'Non renseigné'}\n` +
      `🧒 *Élève :* ${studentName}\n` +
      `🎂 *Âge :* ${studentAge || 'Non précisé'}\n` +
      `🎒 *Classe souhaitée :* ${targetClass}\n` +
      `💬 *Précisions / Questions :* ${message || 'Aucune'}\n\n` +
      `_Envoyé depuis le site web officiel de l'école._`;

    // Open WhatsApp directly after short delay
    setTimeout(() => {
      openWhatsApp(formattedMsg);
    }, 800);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
            Admissions & Renseignements Rentrée 2026 - 2027
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Inscriptions & Modalités
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Rejoignez la grande famille de l'école LE BERCEAU DES 3S. Suivez la procédure étape par étape ou envoyez votre pré-inscription directement par WhatsApp.
          </p>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
            Démarche simplifiée
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            Comment inscrire votre enfant en 4 étapes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <span className="text-3xl font-extrabold text-blue-600/30 font-heading block">01</span>
            <h3 className="font-bold text-slate-900 text-base">Contact & Découverte</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Échange préliminaire avec la direction ou le secrétariat sur WhatsApp pour connaître les places disponibles et planifier une visite du campus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <span className="text-3xl font-extrabold text-blue-600/30 font-heading block">02</span>
            <h3 className="font-bold text-slate-900 text-base">Constitution du Dossier</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rassemblement des pièces justificatives (acte de naissance, carnet de santé, bulletins antérieurs) et retrait de la fiche officielle d'admission.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <span className="text-3xl font-extrabold text-blue-600/30 font-heading block">03</span>
            <h3 className="font-bold text-slate-900 text-base">Entretien d'Accueil</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rencontre bienveillante avec l'élève et la direction pédagogique pour faire connaissance et évaluer le niveau pour une orientation optimale.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
            <span className="text-3xl font-extrabold text-blue-600/30 font-heading block">04</span>
            <h3 className="font-bold text-slate-900 text-base">Confirmation & Rentrée</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Validation administrative, remise du livret d'accueil, tenue d'uniforme et intégration dans la classe de votre enfant.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Required Docs & Interactive WhatsApp Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Documents & Fee info (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Required Documents Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg font-heading">
                  Pièces à fournir obligatoires
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1 Copie légalisée de l'extrait d'acte de naissance de l'enfant</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>4 Photos d'identité récentes en couleur (fond blanc)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1 Photocopie du carnet de santé & vaccination à jour</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Les bulletins de notes de l'année scolaire précédente (dès le CP1)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1 Certificat de radiation ou de transfert (pour les élèves transférés)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Photocopie de la pièce d'identité du parent ou tuteur légal</span>
                </li>
              </ul>

              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Effectifs limités :</strong> Pour préserver la qualité de l'apprentissage individualisé, chaque classe accueille au maximum 24 élèves. Les admissions sont traitées par ordre d'arrivée.
              </div>
            </div>

            {/* Fast WhatsApp Help Box */}
            <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-800 space-y-4">
              <h4 className="font-bold text-base font-heading flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Une question sur les tarifs ou la cantine ?</span>
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Contactez directement la comptabilité et le secrétariat sur WhatsApp au <strong>{SCHOOL_INFO.whatsappPhone}</strong>. Vous recevrez instantanément la grille tarifaire complète (frais de scolarité, cantine, transport scolaire, activités extrascolaires).
              </p>
              <button
                onClick={() => openWhatsApp("Bonjour, je souhaite recevoir la grille des tarifs et frais de scolarité de l'école Le Berceau des 3S.")}
                className="w-full py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-colors"
              >
                Demander la grille tarifaire sur WhatsApp
              </button>
            </div>

          </div>

          {/* Right Column: Pre-Registration Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6 text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Formulaire Interactif
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Fiche de Pré-inscription en ligne
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Remplissez ce formulaire pour générer votre dossier de candidature et le transmettre en 1 clic sur WhatsApp à la direction.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">
                    Dossier transmis avec succès !
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Votre demande de pré-inscription pour <strong>{studentName}</strong> a été enregistrée. WhatsApp s'est ouvert avec le message prérempli à destination du numéro <strong>{SCHOOL_INFO.whatsappPhone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-700 hover:underline pt-2"
                  >
                    Remplir une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Nom et Prénom du Parent / Tuteur *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: M. Ibrahima Diallo"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Numéro de Téléphone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: +224 62X XX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Adresse Email (optionnelle)
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: diallo.ibrahima@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Nom et Prénom de l'Enfant *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Fatoumata Diallo"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Âge ou Date de Naissance
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 5 ans (Né(e) en 2021)"
                        value={studentAge}
                        onChange={(e) => setStudentAge(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Classe souhaitée pour 2026 - 2027 *
                    </label>
                    <select
                      value={targetClass}
                      onChange={(e) => setTargetClass(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                    >
                      {classesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Observations particulières ou questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Informations sur la cantine, le transport ou les antécédents scolaires..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Envoyer la pré-inscription sur WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    En soumettant ce formulaire, votre message est pré-formaté et envoyé directement au numéro officiel <strong>{SCHOOL_INFO.whatsappPhone}</strong>.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
