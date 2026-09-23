import React from 'react';
import {
  Stethoscope,
  Activity,
  ClipboardCheck,
  Shield,
  Calendar,
  Phone,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { PageId } from '../components/Navbar';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForBooking?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectServiceForBooking }) => {
  const { services, clinicConfig } = useClinic();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className="text-teal-700" size={24} />;
      case 'activity':
        return <Activity className="text-teal-700" size={24} />;
      case 'clipboard':
        return <ClipboardCheck className="text-teal-700" size={24} />;
      default:
        return <Shield className="text-teal-700" size={24} />;
    }
  };

  const handleBookService = (serviceTitle: string) => {
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(serviceTitle);
    }
    onNavigate('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Clinical Practice
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Medical Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Verified clinical consultation and patient assessment services at Dr. D. K. Mishra Clinic.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-teal-600/60 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                  {getServiceIcon(service.iconName)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h2>
                  <span className="text-[11px] text-teal-700 font-medium">In-Person Clinic Visit</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Consultation instructions if present */}
              {service.instructions && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 text-[11px]">
                    <Info size={13} className="text-teal-700" />
                    <span>Patient Preparation / Instructions:</span>
                  </div>
                  <p className="text-slate-500 pl-4 leading-relaxed">
                    {service.instructions}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Dr. D. K. Mishra Clinic · Ranchi
              </span>

              <button
                onClick={() => handleBookService(service.title)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Calendar size={13} />
                <span>Request Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Inquiries & Disclaimer Banner */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Have questions regarding a specific procedure or medical test?
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Only verified general medical services are published online. If you need inquiries regarding specific diagnostic services, tests, or specialist referrals, please reach out to the clinic reception directly.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={`tel:${clinicConfig.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
          >
            <Phone size={13} className="text-teal-700" />
            <span>Call Clinic ({clinicConfig.phone})</span>
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
          >
            View Clinic Hours & Address →
          </button>
        </div>
      </div>

    </div>
  );
};
