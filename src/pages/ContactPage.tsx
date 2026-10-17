import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO } from '../data/initialData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Navigation, 
  Building 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openWhatsApp, showToast } = useSchool();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Renseignement général');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert('Veuillez renseigner votre nom et votre message.');
      return;
    }

    const whatsappMessage = `*MESSAGE VIA LE SITE WEB - LE BERCEAU DES 3S*\n\n` +
      `👤 *Expéditeur :* ${name}\n` +
      `📞 *Contact :* ${phone || 'Non renseigné'}\n` +
      `📌 *Objet :* ${subject}\n` +
      `📝 *Message :*\n${message}\n\n` +
      `_Envoyé depuis la page Contact._`;

    setIsSent(true);
    showToast('Redirection vers WhatsApp...');

    setTimeout(() => {
      openWhatsApp(whatsappMessage);
    }, 600);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
            Écoute & Disponibilité Permanente
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            Contacter l'Administration
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light">
            Une question, une visite ou un besoin d'information ? Notre équipe vous répond immédiatement sur WhatsApp au <strong>{SCHOOL_INFO.whatsappPhone}</strong>.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Coordonnées Officielles
              </h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Numéro WhatsApp Officiel</span>
                    <a 
                      href={`https://wa.me/${SCHOOL_INFO.whatsappRaw}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base font-extrabold text-emerald-700 hover:underline"
                    >
                      {SCHOOL_INFO.whatsappPhone}
                    </a>
                    <span className="text-[11px] text-emerald-600 block mt-0.5">Réponse rapide garantie</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Adresse du Campus</span>
                    <span className="font-semibold text-slate-900 leading-snug block">
                      {SCHOOL_INFO.address}
                    </span>
                    <span className="text-xs text-slate-500">Accessible facilement en transport et véhicule privé</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Horaires du Secrétariat</span>
                    <span className="font-semibold text-slate-900 leading-snug block">
                      {SCHOOL_INFO.hours}
                    </span>
                    <span className="text-xs text-slate-500">Permanence téléphonique assurée</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Courrier Électronique</span>
                    <span className="font-semibold text-slate-900 block">{SCHOOL_INFO.email}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <button
                onClick={() => openWhatsApp("Bonjour, je souhaite entrer en contact avec l'administration de l'école Le Berceau des 3S.")}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Contacter l'école sur WhatsApp</span>
              </button>
            </div>

            {/* Campus map preview banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm font-heading">Venir nous rendre visite</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Notre établissement est situé à Kipé (Ratoma, Conakry), dans une zone calme, sécurisée et facilement accessible. Contactez notre équipe d'accueil pour vous guider lors de votre arrivée.
              </p>
              <div className="pt-1">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Kipé Ratoma Conakry Guinée')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>Ouvrir dans Google Maps ↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6 text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  Formulaire Rapide
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Envoyer un message à l'administration
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Remplissez ce formulaire et votre requête sera immédiatement envoyée par WhatsApp ou enregistrée pour suivi prioritaire.
                </p>
              </div>

              {isSent ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">Message envoyé avec succès !</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Merci pour votre message. Notre équipe administrative vous répondra dans les meilleurs délais sur WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setMessage('');
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline pt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Votre Nom Complet *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Madame Bah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Téléphone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="Ex: +224 6XX XX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Objet de votre demande</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                    >
                      <option value="Renseignement général">Renseignement général</option>
                      <option value="Visite du campus">Demande de visite du campus</option>
                      <option value="Tarifs et scolarité">Tarifs & Frais de scolarité</option>
                      <option value="Transfert d'élève">Transfert d'un élève</option>
                      <option value="Question pédagogique">Question à la direction pédagogique</option>
                      <option value="Autre">Autre sujet</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Votre Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Écrivez votre message ici..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Transmettre directement sur WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Numéro officiel : <strong>{SCHOOL_INFO.whatsappPhone}</strong>. Aucun intermédiaire.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
