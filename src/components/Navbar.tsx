import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, ShieldCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export type PageId = 'home' | 'about' | 'services' | 'book' | 'reviews' | 'contact' | 'admin';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { clinicConfig, isAdminAuthenticated } = useClinic();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Doctor' },
    { id: 'services', label: 'Medical Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* ZONE 1: Single element Brand Wordmark (Strict Top Bar Contract) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-bold text-lg md:text-xl tracking-tight text-slate-900 hover:text-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            aria-label="Dr. D. K. Mishra Clinic Home"
          >
            {clinicConfig.name}
          </button>

          {/* ZONE 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                  currentPage === link.id
                    ? 'text-teal-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ZONE 3: 1-2 Primary Action Points */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${clinicConfig.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="Call Clinic at 08803509240"
            >
              <Phone size={14} className="text-teal-700" />
              <span>Call Clinic</span>
            </a>

            <button
              onClick={() => handleNavClick('book')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </button>

            {/* Subtle Admin Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'admin' ? 'text-teal-700 bg-teal-50' : ''
              }`}
              title={isAdminAuthenticated ? 'Admin Dashboard (Active Session)' : 'Clinic Admin Access'}
              aria-label="Admin Portal"
            >
              <ShieldCheck size={16} />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${clinicConfig.phone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-md"
              aria-label="Call clinic"
            >
              <Phone size={13} />
              <span>Call</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-teal-600 cursor-pointer"
              aria-label="Open mobile navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <a
              href={`tel:${clinicConfig.phone}`}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg text-center"
            >
              <Phone size={13} className="text-teal-700" />
              <span>Call: {clinicConfig.phone}</span>
            </a>
            <button
              onClick={() => handleNavClick('book')}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg text-center"
            >
              <Calendar size={13} />
              <span>Book Visit</span>
            </button>
          </div>

          <div className="pt-1 flex justify-end">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 py-1"
            >
              <ShieldCheck size={13} />
              <span>Admin Dashboard {isAdminAuthenticated ? '(Logged In)' : ''}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
