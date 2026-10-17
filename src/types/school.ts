export type MediaType = 'photo' | 'video';

export type MediaCategory = 
  | 'Vie scolaire'
  | 'Maternelle'
  | 'Primaire'
  | 'Collège'
  | 'Sciences & Découverte'
  | 'Sorties pédagogiques'
  | 'Fêtes & Cérémonies'
  | 'Sport & Culture';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  description: string;
  url: string; // Image URL or Video URL / Blob / Embed
  thumbnailUrl?: string; // For videos
  category: MediaCategory;
  published: boolean; // Published vs Brouillon
  featuredOnHome: boolean; // Display on Home page
  parentalConsentVerified: boolean; // Privacy & Child protection flag
  date: string;
  author: string;
  duration?: string; // For videos (e.g. "02:45")
}

export type NewsCategory = 
  | 'Annonce officielle'
  | 'Vie de l\'école'
  | 'Événement'
  | 'Pédagogie'
  | 'Vacances & Calendrier';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  date: string;
  imageUrl?: string;
  published: boolean;
  featuredOnHome: boolean;
  author: string;
  eventDate?: string;
}

export interface Inquiry {
  id: string;
  parentName: string;
  phone: string;
  email?: string;
  studentName: string;
  studentAge: string;
  targetClass: string;
  message: string;
  date: string;
  status: 'nouveau' | 'contacté' | 'inscrit';
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'Directeur Général' | 'Directrice Pédagogique' | 'Administrateur';
  avatar?: string;
}
