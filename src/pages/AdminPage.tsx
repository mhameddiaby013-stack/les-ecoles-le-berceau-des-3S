import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { MediaItem, NewsItem, MediaCategory, NewsCategory, Inquiry } from '../types/school';
import { SCHOOL_INFO } from '../data/initialData';
import { 
  Lock, 
  UserCheck, 
  LogOut, 
  Image as ImageIcon, 
  Film, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  X, 
  FileText, 
  Users, 
  Cloud, 
  Server, 
  RotateCcw, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    adminUser, 
    loginAdmin, 
    logoutAdmin,
    mediaItems,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    toggleMediaStatus,
    toggleMediaFeatured,
    newsItems,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    toggleNewsStatus,
    toggleNewsFeatured,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    openMediaModal,
    openWhatsApp,
    resetToDefaults
  } = useSchool();

  // Login form states
  const [email, setEmail] = useState('direction@berceaudes3s.com');
  const [password, setPassword] = useState('Berceau3S@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab
  const [adminTab, setAdminTab] = useState<'media' | 'news' | 'inquiries' | 'cloud-guide'>('media');
  const [mediaFilterStatus, setMediaFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Media Modal state (Create / Edit)
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaCategory, setMediaCategory] = useState<MediaCategory>('Vie scolaire');
  const [mediaPublished, setMediaPublished] = useState(true);
  const [mediaFeatured, setMediaFeatured] = useState(false);
  const [mediaConsent, setMediaConsent] = useState(true);
  const [mediaDuration, setMediaDuration] = useState('');
  const [mediaUploading, setMediaUploading] = useState(false);

  // News Modal state
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsCategory>('Vie de l\'école');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('');
  const [newsPublished, setNewsPublished] = useState(true);
  const [newsFeatured, setNewsFeatured] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    const res = await loginAdmin(email, password);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Erreur lors de la connexion.');
    }
  };

  // Handle local file upload for photo or video
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isVideo = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setMediaUrl(reader.result);
      }
      setMediaUploading(false);
    };
    reader.onerror = () => {
      alert("Erreur lors de la lecture du fichier sur votre appareil.");
      setMediaUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const openAddMedia = (type: 'photo' | 'video') => {
    setEditingMediaId(null);
    setMediaType(type);
    setMediaTitle('');
    setMediaDescription('');
    setMediaUrl('');
    setMediaCategory('Vie scolaire');
    setMediaPublished(true);
    setMediaFeatured(false);
    setMediaConsent(true);
    setMediaDuration(type === 'video' ? '02:00' : '');
    setMediaModalOpen(true);
  };

  const openEditMedia = (item: MediaItem) => {
    setEditingMediaId(item.id);
    setMediaType(item.type);
    setMediaTitle(item.title);
    setMediaDescription(item.description);
    setMediaUrl(item.url);
    setMediaCategory(item.category);
    setMediaPublished(item.published);
    setMediaFeatured(item.featuredOnHome);
    setMediaConsent(item.parentalConsentVerified);
    setMediaDuration(item.duration || '');
    setMediaModalOpen(true);
  };

  const saveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim() || !mediaUrl.trim()) {
      alert("Veuillez renseigner un titre et sélectionner un fichier ou saisir une URL.");
      return;
    }

    const today = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

    if (editingMediaId) {
      updateMediaItem(editingMediaId, {
        type: mediaType,
        title: mediaTitle.trim(),
        description: mediaDescription.trim(),
        url: mediaUrl,
        category: mediaCategory,
        published: mediaPublished,
        featuredOnHome: mediaFeatured,
        parentalConsentVerified: mediaConsent,
        duration: mediaType === 'video' ? mediaDuration : undefined
      });
    } else {
      addMediaItem({
        type: mediaType,
        title: mediaTitle.trim(),
        description: mediaDescription.trim(),
        url: mediaUrl,
        category: mediaCategory,
        published: mediaPublished,
        featuredOnHome: mediaFeatured,
        parentalConsentVerified: mediaConsent,
        date: today,
        author: adminUser?.name || 'Direction Générale',
        duration: mediaType === 'video' ? (mediaDuration || '02:30') : undefined
      });
    }

    setMediaModalOpen(false);
  };

  const openAddNews = () => {
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsCategory('Vie de l\'école');
    setNewsExcerpt('');
    setNewsContent('');
    setNewsImageUrl('/src/assets/images/school_campus_exterior_1792242498160.jpg');
    setNewsPublished(true);
    setNewsFeatured(true);
    setNewsModalOpen(true);
  };

  const openEditNews = (news: NewsItem) => {
    setEditingNewsId(news.id);
    setNewsTitle(news.title);
    setNewsCategory(news.category);
    setNewsExcerpt(news.excerpt);
    setNewsContent(news.content);
    setNewsImageUrl(news.imageUrl || '');
    setNewsPublished(news.published);
    setNewsFeatured(news.featuredOnHome);
    setNewsModalOpen(true);
  };

  const saveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) {
      alert("Veuillez renseigner un titre et le contenu de l'actualité.");
      return;
    }

    const today = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

    if (editingNewsId) {
      updateNewsItem(editingNewsId, {
        title: newsTitle.trim(),
        category: newsCategory,
        excerpt: newsExcerpt.trim() || newsContent.slice(0, 120) + '...',
        content: newsContent.trim(),
        imageUrl: newsImageUrl.trim() || undefined,
        published: newsPublished,
        featuredOnHome: newsFeatured
      });
    } else {
      addNewsItem({
        title: newsTitle.trim(),
        category: newsCategory,
        excerpt: newsExcerpt.trim() || newsContent.slice(0, 120) + '...',
        content: newsContent.trim(),
        imageUrl: newsImageUrl.trim() || undefined,
        published: newsPublished,
        featuredOnHome: newsFeatured,
        date: today,
        author: adminUser?.name || 'Le Directeur Général'
      });
    }

    setNewsModalOpen(false);
  };

  // If NOT authenticated, show the login screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-100">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl max-w-md w-full space-y-6 text-left">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-amber-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Espace Administrateur
            </h1>
            <p className="text-xs text-slate-500">
              Accès réservé exclusivement à la Direction de l'école <strong>LE BERCEAU DES 3S</strong>.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Adresse e-mail du Directeur</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="direction@berceaudes3s.com"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Mot de passe sécurisé</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-blue-700 hover:underline"
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>{isLoggingIn ? 'Vérification...' : 'Se connecter au Tableau de Bord'}</span>
            </button>
          </form>

          {/* Test credentials helper banner for director */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1.5">
            <span className="font-bold block text-blue-950">Identifiants configurés par défaut :</span>
            <div className="font-mono text-[11px] space-y-0.5">
              <div>Email : <span className="font-bold">direction@berceaudes3s.com</span></div>
              <div>Mot de passe : <span className="font-bold">Berceau3S@2026</span></div>
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              (Tout mot de passe de plus de 6 caractères est également accepté pour les tests).
            </p>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED DIRECTOR DASHBOARD
  const publishedMediaCount = mediaItems.filter((m) => m.published).length;
  const draftMediaCount = mediaItems.filter((m) => !m.published).length;
  const homeMediaCount = mediaItems.filter((m) => m.featuredOnHome).length;

  const filteredMediaList = mediaItems.filter((m) => {
    if (mediaFilterStatus === 'published') return m.published;
    if (mediaFilterStatus === 'draft') return !m.published;
    return true;
  });

  return (
    <div className="space-y-10 pb-24 text-left">
      
      {/* Top Admin Header Bar */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Espace Direction Générale
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Tableau de Bord & Gestion de Contenu
            </h1>
            <p className="text-xs text-slate-400">
              Connecté en tant que : <strong className="text-slate-200">{adminUser?.name}</strong> ({adminUser?.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openAddMedia('photo')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Publier Photo</span>
            </button>

            <button
              onClick={() => openAddMedia('video')}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Film className="w-4 h-4" />
              <span>+ Importer Vidéo</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Metric Cards Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Médiathèque</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading tabular-nums">
                {mediaItems.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {mediaItems.filter(m => m.type === 'photo').length} photos · {mediaItems.filter(m => m.type === 'video').length} vidéos
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 uppercase">Visibles sur le Site</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-emerald-600 font-heading tabular-nums">
                {publishedMediaCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {homeMediaCount} sur l'accueil
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-amber-600 uppercase">En Attente / Brouillons</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-amber-600 font-heading tabular-nums">
                {draftMediaCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">Non visibles au public</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-blue-600 uppercase">Dossiers Inscription</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-blue-600 font-heading tabular-nums">
                {inquiries.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Reçus via le site</span>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setAdminTab('media')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
              adminTab === 'media'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gestion Photos & Vidéos ({mediaItems.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
              adminTab === 'news'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Gestion Actualités & Annonces ({newsItems.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
              adminTab === 'inquiries'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pré-inscriptions ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('cloud-guide')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
              adminTab === 'cloud-guide'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Guide Déploiement & Firebase</span>
          </button>
        </div>

        {/* TAB 1: MEDIA MANAGER */}
        {adminTab === 'media' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top filter + action bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-slate-500">Filtrer par statut :</span>
                <button
                  onClick={() => setMediaFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    mediaFilterStatus === 'all' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Tous ({mediaItems.length})
                </button>
                <button
                  onClick={() => setMediaFilterStatus('published')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    mediaFilterStatus === 'published' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Publiés ({publishedMediaCount})
                </button>
                <button
                  onClick={() => setMediaFilterStatus('draft')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    mediaFilterStatus === 'draft' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Brouillons ({draftMediaCount})
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAddMedia('photo')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Ajouter une photo</span>
                </button>
                <button
                  onClick={() => openAddMedia('video')}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Ajouter une vidéo</span>
                </button>
              </div>
            </div>

            {/* Media Items Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMediaList.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
                    item.published ? 'border-slate-200' : 'border-amber-300 bg-amber-50/20'
                  }`}
                >
                  <div>
                    {/* Media preview thumbnail */}
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Status Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.published ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {item.published ? 'Publié' : 'Brouillon'}
                        </span>

                        {item.featuredOnHome && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white" />
                            Accueil
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/75 text-white">
                          {item.category}
                        </span>
                      </div>

                      {item.type === 'video' && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-amber-300 text-[11px] font-semibold flex items-center gap-1">
                          <Film className="w-3 h-3" />
                          <span>{item.duration || 'Vidéo'}</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                        <span>{item.date}</span>
                        <span>·</span>
                        {item.parentalConsentVerified ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            Accord parental OK
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium">Accord parental en attente</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleMediaStatus(item.id)}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                          item.published 
                            ? 'text-amber-700 bg-amber-100/60 hover:bg-amber-100' 
                            : 'text-emerald-700 bg-emerald-100/60 hover:bg-emerald-100'
                        }`}
                        title={item.published ? 'Passer en brouillon' : 'Publier sur le site'}
                      >
                        {item.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{item.published ? 'Brouillon' : 'Publier'}</span>
                      </button>

                      <button
                        onClick={() => toggleMediaFeatured(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.featuredOnHome ? 'text-amber-600 bg-amber-100' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={item.featuredOnHome ? 'Retirer de la page d\'accueil' : 'Afficher sur la page d\'accueil'}
                      >
                        <Star className={`w-4 h-4 ${item.featuredOnHome ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openMediaModal(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 transition-colors"
                        title="Aperçu grand format"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditMedia(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Confirmez-vous la suppression de "${item.title}" ?`)) {
                            deleteMediaItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: NEWS & ANNOUNCEMENTS MANAGER */}
        {adminTab === 'news' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Gestion des Actualités & Événements</h3>
                <p className="text-xs text-slate-500">Rédigez et publiez les communiqués et avis aux parents.</p>
              </div>
              <button
                onClick={openAddNews}
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Nouvelle Actualité</span>
              </button>
            </div>

            <div className="space-y-4">
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className={`p-5 rounded-2xl bg-white border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
                    news.published ? 'border-slate-200' : 'border-amber-300 bg-amber-50/20'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        news.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {news.published ? 'Publié' : 'Brouillon'}
                      </span>
                      <span className="font-semibold text-blue-700">{news.category}</span>
                      <span>·</span>
                      <span className="text-slate-400">{news.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{news.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{news.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleNewsStatus(news.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      {news.published ? 'Basculer en brouillon' : 'Publier'}
                    </button>
                    <button
                      onClick={() => openEditNews(news)}
                      className="p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer l'actualité "${news.title}" ?`)) {
                          deleteNewsItem(news.id);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES & DOSSIERS INBOX */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Dossiers de Pré-inscription Reçus</h3>
                <p className="text-xs text-slate-500">Demandes soumises par les parents d'élèves via le formulaire web.</p>
              </div>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                          inq.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                          inq.status === 'contacté' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {inq.status}
                        </span>
                        <span className="text-slate-400">{inq.date}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        <div>
                          <strong>Élève :</strong> {inq.studentName} ({inq.studentAge})
                        </div>
                        <div>
                          <strong>Classe souhaitée :</strong> {inq.targetClass}
                        </div>
                        <div>
                          <strong>Parent :</strong> {inq.parentName}
                        </div>
                        <div>
                          <strong>Téléphone :</strong> <span className="font-mono text-emerald-700 font-bold">{inq.phone}</span>
                        </div>
                      </div>

                      {inq.message && (
                        <p className="text-xs text-slate-500 p-2.5 rounded-lg bg-slate-50 italic border border-slate-100">
                          « {inq.message} »
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const replyMsg = `Bonjour ${inq.parentName}, c'est la Direction de l'école LE BERCEAU DES 3S au sujet de votre pré-inscription pour ${inq.studentName} en ${inq.targetClass}.`;
                          openWhatsApp(replyMsg);
                          updateInquiryStatus(inq.id, 'contacté');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Répondre sur WhatsApp</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Supprimer cette demande ?')) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Supprimer la demande"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <p className="text-sm text-slate-500">Aucune demande d'inscription pour l'instant.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FIREBASE / SUPABASE / VERCEL INTEGRATION GUIDE */}
        {adminTab === 'cloud-guide' && (
          <div className="space-y-8 animate-fade-in text-left">
            
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold font-heading">
                    Guide de Configuration Cloud & Déploiement Gratuit
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instructions complètes pour connecter Firebase / Supabase et déployer le site sur Vercel sans frais.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Step 1: Firebase Configuration */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</span>
                  <span>Configuration Firebase / Base de données & Médias</span>
                </div>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <p>
                    1. Rendez-vous sur <strong>console.firebase.google.com</strong> et créez un projet gratuit nommé <em>"le-berceau-des-3s"</em>.
                  </p>
                  <p>
                    2. Activez <strong>Authentication</strong> avec le fournisseur <em>Email/Mot de passe</em> pour le compte du directeur.
                  </p>
                  <p>
                    3. Créez votre base <strong>Cloud Firestore</strong> en mode production.
                  </p>
                  <p>
                    4. Activez <strong>Cloud Storage</strong> pour stocker les photos haute résolution et vidéos importées.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
                    // Règles de sécurité recommandées :<br />
                    allow read: if true; // Public pour les visiteurs<br />
                    allow write: if request.auth != null; // Réservé au directeur
                  </div>
                </div>
              </div>

              {/* Step 2: Vercel Free Deployment */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">2</span>
                  <span>Mise en ligne gratuite sur Vercel</span>
                </div>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <p>
                    1. Connectez votre compte GitHub sur <strong>vercel.com</strong> (plan Hobby gratuit à vie).
                  </p>
                  <p>
                    2. Cliquez sur <em>"Add New Project"</em> et importez ce dépôt de code.
                  </p>
                  <p>
                    3. Framework Preset : <strong>Vite</strong>. Build Command : <code>npm run build</code>. Output Directory : <code>dist</code>.
                  </p>
                  <p>
                    4. Cliquez sur <em>"Deploy"</em>. Votre site sera instantanément accessible via une URL sécurisée HTTPS (ex: <em>le-berceau-des-3s.vercel.app</em>). Vous pouvez également y relier un nom de domaine personnalisé.
                  </p>
                </div>
              </div>

            </div>

            {/* Persistence & Data reset */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Synchronisation Immédiate</h4>
                <p className="text-xs text-slate-500">
                  Toute photo, vidéo ou actualité que vous publiez s'affiche instantanément sur la page d'accueil et la galerie pour tous les visiteurs.
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm("Réinitialiser toutes les données aux valeurs par défaut de démonstration ?")) {
                    resetToDefaults();
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Réinitialiser les données de démo</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT MEDIA (PHOTO OR VIDEO) */}
      {mediaModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setMediaModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                {mediaType === 'video' ? (
                  <Film className="w-5 h-5 text-amber-600" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                )}
                <h3 className="font-bold text-slate-900 text-lg font-heading">
                  {editingMediaId ? 'Modifier la publication' : mediaType === 'video' ? 'Importer une vidéo scolaire' : 'Publier une nouvelle photo'}
                </h3>
              </div>
              <button 
                onClick={() => setMediaModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveMedia} className="space-y-4">
              {/* Type Switcher */}
              {!editingMediaId && (
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMediaType('photo')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      mediaType === 'photo' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Photo de l'école
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType('video')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      mediaType === 'video' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Vidéo d'activité
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Titre de la publication *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cérémonie de remise des prix d'excellence"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Catégorie / Album</label>
                <select
                  value={mediaCategory}
                  onChange={(e) => setMediaCategory(e.target.value as MediaCategory)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                >
                  <option value="Vie scolaire">Vie scolaire</option>
                  <option value="Maternelle">Maternelle</option>
                  <option value="Primaire">Primaire</option>
                  <option value="Collège">Collège</option>
                  <option value="Sciences & Découverte">Sciences & Découverte</option>
                  <option value="Sorties pédagogiques">Sorties pédagogiques</option>
                  <option value="Fêtes & Cérémonies">Fêtes & Cérémonies</option>
                  <option value="Sport & Culture">Sport & Culture</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Description détaillée</label>
                <textarea
                  rows={3}
                  placeholder="Décrivez l'activité, les classes concernées et le contexte..."
                  value={mediaDescription}
                  onChange={(e) => setMediaDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* File upload from computer or phone */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-bold text-slate-800 block">
                  Importer depuis votre ordinateur ou téléphone :
                </label>
                
                <input
                  type="file"
                  accept={mediaType === 'video' ? 'video/mp4,video/webm,video/ogg' : 'image/*'}
                  onChange={(e) => handleFileUpload(e, mediaType === 'video')}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-950 cursor-pointer"
                />

                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 block mb-1">Ou saisir une URL de fichier :</span>
                  <input
                    type="url"
                    placeholder={mediaType === 'video' ? 'https://.../video.mp4' : 'https://.../photo.jpg'}
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {mediaUploading && (
                  <p className="text-xs text-blue-600 font-semibold animate-pulse">Chargement du fichier en cours...</p>
                )}

                {/* Preview if URL exists */}
                {mediaUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden aspect-video bg-black max-h-36 relative">
                    {mediaType === 'video' ? (
                      <video src={mediaUrl} className="w-full h-full object-contain" controls />
                    ) : (
                      <img src={mediaUrl} alt="Aperçu" className="w-full h-full object-contain" />
                    )}
                  </div>
                )}
              </div>

              {/* Video duration if video */}
              {mediaType === 'video' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Durée indicative (ex: 02:45)</label>
                  <input
                    type="text"
                    placeholder="02:30"
                    value={mediaDuration}
                    onChange={(e) => setMediaDuration(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {/* Toggles & Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mediaPublished}
                    onChange={(e) => setMediaPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Publier immédiatement (visible publiquement sur le site)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mediaFeatured}
                    onChange={(e) => setMediaFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Mettre en vedette sur la page d'accueil
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mediaConsent}
                    onChange={(e) => setMediaConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Autorisation parentale vérifiée (Protection de l'enfance)
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={mediaUploading}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition-colors shadow-md"
                >
                  {editingMediaId ? 'Enregistrer les modifications' : 'Publier sur le site'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT NEWS */}
      {newsModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setNewsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-lg font-heading">
                {editingNewsId ? 'Modifier l\'actualité' : 'Publier une nouvelle actualité'}
              </h3>
              <button 
                onClick={() => setNewsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveNews} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Titre de l'actualité *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Calendrier des congés de fin de premier trimestre"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Catégorie</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as NewsCategory)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
                >
                  <option value="Annonce officielle">Annonce officielle</option>
                  <option value="Vie de l'école">Vie de l'école</option>
                  <option value="Événement">Événement</option>
                  <option value="Pédagogie">Pédagogie</option>
                  <option value="Vacances & Calendrier">Vacances & Calendrier</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bref résumé (accroche)</label>
                <input
                  type="text"
                  placeholder="Une ou deux phrases courtes résumant le communiqué..."
                  value={newsExcerpt}
                  onChange={(e) => setNewsExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Contenu intégral du communiqué *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Rédigez l'intégralité de l'annonce..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Image d'illustration (URL ou asset)</label>
                <input
                  type="text"
                  placeholder="/src/assets/images/... ou https://..."
                  value={newsImageUrl}
                  onChange={(e) => setNewsImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsPublished}
                    onChange={(e) => setNewsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Publier immédiatement pour les parents et visiteurs
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsFeatured}
                    onChange={(e) => setNewsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Afficher en une sur la page d'accueil
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold shadow-md"
                >
                  {editingNewsId ? 'Mettre à jour' : 'Publier l\'actualité'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
