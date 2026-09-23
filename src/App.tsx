/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClinicProvider } from './context/ClinicContext';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutDoctorPage } from './pages/AboutDoctorPage';
import { ServicesPage } from './pages/ServicesPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  // Sync title and URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'services', 'book', 'reviews', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
  };

  return (
    <ClinicProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-700 selection:text-white">
        {/* Sticky 3-zone Navbar adhering to Top Bar Contract */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main Page Content */}
        <main className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'about' && <AboutDoctorPage onNavigate={handleNavigate} />}
          {currentPage === 'services' && (
            <ServicesPage
              onNavigate={handleNavigate}
              onSelectServiceForBooking={handleSelectServiceForBooking}
            />
          )}
          {currentPage === 'book' && (
            <BookAppointmentPage
              initialService={selectedServiceForBooking}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'reviews' && <ReviewsPage onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
          {currentPage === 'admin' && <AdminDashboardPage />}
        </main>

        {/* Minimal Compliant Healthcare Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </ClinicProvider>
  );
}
