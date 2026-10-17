import React, { createContext, useContext, useState, useEffect } from 'react';
import { MediaItem, NewsItem, Inquiry, AdminUser } from '../types/school';
import { INITIAL_MEDIA, INITIAL_NEWS, SCHOOL_INFO } from '../data/initialData';

export type PageId = 
  | 'accueil' 
  | 'apropos' 
  | 'programmes' 
  | 'galerie' 
  | 'actualites' 
  | 'inscriptions' 
  | 'contact' 
  | 'admin';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface SchoolContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  mediaItems: MediaItem[];
  newsItems: NewsItem[];
  inquiries: Inquiry[];
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  // Media mutations
  addMediaItem: (item: Omit<MediaItem, 'id'>) => void;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  toggleMediaStatus: (id: string) => void;
  toggleMediaFeatured: (id: string) => void;
  // News mutations
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  updateNewsItem: (id: string, updates: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;
  toggleNewsStatus: (id: string) => void;
  toggleNewsFeatured: (id: string) => void;
  // Inquiries
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  // Modal viewer
  activeMediaModal: MediaItem | null;
  openMediaModal: (item: MediaItem) => void;
  closeMediaModal: () => void;
  // Notifications & WhatsApp
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;
  openWhatsApp: (customMessage?: string) => void;
  resetToDefaults: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MEDIA: 'berceau3s_media_v2',
  NEWS: 'berceau3s_news_v2',
  INQUIRIES: 'berceau3s_inquiries_v2',
  ADMIN: 'berceau3s_admin_session_v2'
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageId>('accueil');
  
  // Initialize state with LocalStorage or InitialData
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read media from localStorage', e);
    }
    return INITIAL_MEDIA;
  });

  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read news from localStorage', e);
    }
    return INITIAL_NEWS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read inquiries', e);
    }
    return [
      {
        id: 'inq-1',
        parentName: 'M. Ousmane Bangoura',
        phone: '+224 620 44 55 66',
        email: 'ousmane.bangoura@gmail.com',
        studentName: 'Alpha Ousmane Bangoura',
        studentAge: '5 ans',
        targetClass: 'Grande Section Maternelle',
        message: 'Demande de dossier pour inscription rentrée prochaine. Visite souhaitée un samedi matin.',
        date: '16 Octobre 2026',
        status: 'nouveau'
      }
    ];
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read admin session', e);
    }
    return null;
  });

  const [activeMediaModal, setActiveMediaModal] = useState<MediaItem | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaItems));
    } catch (e) {
      console.warn('Failed saving media to storage', e);
    }
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsItems));
    } catch (e) {
      console.warn('Failed saving news to storage', e);
    }
  }, [newsItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed saving inquiries to storage', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
      }
    } catch (e) {
      console.warn('Failed saving admin session to storage', e);
    }
  }, [adminUser]);

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = "Bonjour, je souhaite obtenir des informations sur l'école Le Berceau des 3S.";
    const text = customMessage || defaultMsg;
    const url = `https://wa.me/${SCHOOL_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Authenticate director
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Veuillez renseigner votre email et mot de passe.' };
    }

    // Default Director credentials or flexible login for demo
    if (
      (cleanEmail === 'direction@berceaudes3s.com' && cleanPass === 'Berceau3S@2026') ||
      (cleanEmail.includes('@') && cleanPass.length >= 6)
    ) {
      const user: AdminUser = {
        email: cleanEmail,
        name: cleanEmail === 'direction@berceaudes3s.com' ? 'M. Le Directeur Général' : 'Direction de l\'Établissement',
        role: 'Directeur Général',
      };
      setAdminUser(user);
      showToast('Connexion réussie. Bienvenue dans l\'espace de gestion.', 'success');
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Identifiants invalides. Utilisez "direction@berceaudes3s.com" et "Berceau3S@2026" ou un mot de passe d\'au moins 6 caractères.' 
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    showToast('Déconnexion effectuée avec succès.', 'info');
    setActivePage('accueil');
  };

  // Media Actions
  const addMediaItem = (item: Omit<MediaItem, 'id'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `media-${Date.now()}`
    };
    setMediaItems(prev => [newItem, ...prev]);
    showToast(newItem.type === 'video' ? 'Vidéo ajoutée et publiée avec succès !' : 'Photo ajoutée et publiée avec succès !');
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    showToast('Publication mise à jour avec succès.');
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
    showToast('Publication supprimée.');
  };

  const toggleMediaStatus = (id: string) => {
    setMediaItems(prev => prev.map(m => {
      if (m.id === id) {
        const next = !m.published;
        showToast(next ? 'Contenu désormais visible publiquement.' : 'Contenu basculé en brouillon privé.');
        return { ...m, published: next };
      }
      return m;
    }));
  };

  const toggleMediaFeatured = (id: string) => {
    setMediaItems(prev => prev.map(m => {
      if (m.id === id) {
        const next = !m.featuredOnHome;
        showToast(next ? 'Affiché sur la page d\'accueil.' : 'Retiré de la page d\'accueil.');
        return { ...m, featuredOnHome: next };
      }
      return m;
    }));
  };

  // News Actions
  const addNewsItem = (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`
    };
    setNewsItems(prev => [newItem, ...prev]);
    showToast('Actualité publiée avec succès !');
  };

  const updateNewsItem = (id: string, updates: Partial<NewsItem>) => {
    setNewsItems(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    showToast('Actualité modifiée.');
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(prev => prev.filter(n => n.id !== id));
    showToast('Actualité supprimée.');
  };

  const toggleNewsStatus = (id: string) => {
    setNewsItems(prev => prev.map(n => {
      if (n.id === id) {
        const next = !n.published;
        showToast(next ? 'Actualité publiée.' : 'Actualité archivée en brouillon.');
        return { ...n, published: next };
      }
      return n;
    }));
  };

  const toggleNewsFeatured = (id: string) => {
    setNewsItems(prev => prev.map(n => n.id === id ? { ...n, featuredOnHome: !n.featuredOnHome } : n));
  };

  // Inquiries
  const submitInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      status: 'nouveau'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Votre demande a été enregistrée avec succès. Redirection vers WhatsApp...', 'success');
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const openMediaModal = (item: MediaItem) => {
    setActiveMediaModal(item);
  };

  const closeMediaModal = () => {
    setActiveMediaModal(null);
  };

  const resetToDefaults = () => {
    setMediaItems(INITIAL_MEDIA);
    setNewsItems(INITIAL_NEWS);
    showToast('Données réinitialisées aux valeurs par défaut.');
  };

  return (
    <SchoolContext.Provider
      value={{
        activePage,
        setActivePage,
        mediaItems,
        newsItems,
        inquiries,
        adminUser,
        isAdminAuthenticated: !!adminUser,
        loginAdmin,
        logoutAdmin,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        toggleMediaStatus,
        toggleMediaFeatured,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        toggleNewsStatus,
        toggleNewsFeatured,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        activeMediaModal,
        openMediaModal,
        closeMediaModal,
        toast,
        showToast,
        openWhatsApp,
        resetToDefaults
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
