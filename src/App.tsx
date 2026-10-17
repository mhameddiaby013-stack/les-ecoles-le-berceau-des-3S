/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MediaModal } from './components/MediaModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePage } = useSchool();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Router */}
      <main className="flex-1">
        {activePage === 'accueil' && <HomePage />}
        {activePage === 'apropos' && <AboutPage />}
        {activePage === 'programmes' && <ProgramsPage />}
        {activePage === 'galerie' && <GalleryPage />}
        {activePage === 'actualites' && <NewsPage />}
        {activePage === 'inscriptions' && <AdmissionsPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminPage />}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Floating WhatsApp Contact Button (Visible across all pages) */}
      <WhatsAppFloatingButton />

      {/* Lightbox / Video Player Modal */}
      <MediaModal />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
