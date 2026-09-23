import React from 'react';
import { Phone, MapPin, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { clinicConfig } = useClinic();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Clinic Identity */}
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">{clinicConfig.name}</h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">{clinicConfig.hindiName}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional medical consultation and patient-focused healthcare in Ranchi, Jharkhand.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-teal-400 font-semibold">{clinicConfig.googleRating} ★</span>
              <span>·</span>
              <span>{clinicConfig.googleReviewCount} Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Doctor
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Patient Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact & Schedule */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Clinic Contact</h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-teal-400 shrink-0 mt-0.5" />
                <span>{clinicConfig.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-teal-400 shrink-0" />
                <a href={`tel:${clinicConfig.phone}`} className="hover:text-white transition-colors font-medium">
                  {clinicConfig.phone}
                </a>
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Plus Code: <span className="text-slate-300 font-mono">{clinicConfig.googlePlusCode}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Action & Google Listing */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Patient Care</h3>
            <p className="text-xs text-slate-400">
              Book your consultation slot online or call during clinic hours.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('book'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Calendar size={14} />
                <span>Book Appointment</span>
              </button>

              {clinicConfig.googleMapsUrl && (
                <a
                  href={clinicConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                >
                  <span>Google Business Profile</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-2xl text-[11px] leading-relaxed text-slate-400 text-center md:text-left">
            <span className="font-semibold text-slate-400">Medical Disclaimer: </span>
            Information on this website is for general informational purposes and does not replace professional medical advice.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} {clinicConfig.name}</span>
            <span>·</span>
            <button
              onClick={() => { onNavigate('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck size={11} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
