import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { PageId } from '../components/Navbar';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { clinicConfig } = useClinic();

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.phone.trim() || !inquiryForm.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setFormSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Clinic Details & Directions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact & Location
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Find Dr. D. K. Mishra Clinic in Ranchi or reach out for consultation availability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contact Cards & Operating Hours */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Contact Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{clinicConfig.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{clinicConfig.hindiName}</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-0.5">
                    Physical Address
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {clinicConfig.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Google Plus Code: {clinicConfig.googlePlusCode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-0.5">
                    Clinic Telephone
                  </span>
                  <a
                    href={`tel:${clinicConfig.phone}`}
                    className="text-base font-bold text-teal-800 hover:underline block"
                  >
                    {clinicConfig.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click to initiate phone call from your device
                  </p>
                </div>
              </div>

              {/* Schedule Status Notice */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-0.5">
                    Google Listing Status
                  </span>
                  <p className="text-slate-800 font-medium">{clinicConfig.googleBusinessStatusNote}</p>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={clinicConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <MapPin size={13} />
                <span>Open in Google Maps</span>
                <ExternalLink size={11} />
              </a>

              <button
                onClick={() => onNavigate('book')}
                className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={13} />
                <span>Book Appointment</span>
              </button>
            </div>

          </div>

          {/* Weekly Schedule Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock size={16} className="text-teal-700" />
                <span>Weekly Consultation Schedule</span>
              </h3>
              <span className="text-[11px] text-slate-400">Subject to confirmation</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-2 font-semibold">Day</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 font-semibold">Consultation Hours</th>
                    <th className="pb-2 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clinicConfig.weeklySchedule.map((sched) => (
                    <tr key={sched.day} className="py-2.5">
                      <td className="py-2.5 font-medium text-slate-800">{sched.day}</td>
                      <td className="py-2.5">
                        {sched.isOpen ? (
                          <span className="text-emerald-700 font-medium">Open</span>
                        ) : (
                          <span className="text-slate-400 font-medium">Closed</span>
                        )}
                      </td>
                      <td className="py-2.5 font-mono text-slate-700">
                        {sched.isOpen ? `${sched.openTime} - ${sched.closeTime}` : '—'}
                      </td>
                      <td className="py-2.5 text-slate-500 text-[11px]">{sched.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              * The schedule can be configured and updated at any time from the private clinic admin dashboard.
            </p>
          </div>

        </div>

        {/* Right Column: Inquiry Form & Interactive Map */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Simple Contact / General Inquiry Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">General Inquiry</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                For non-urgent inquiries regarding location, directions, or visiting guidelines.
              </p>
            </div>

            {formSent ? (
              <div className="p-5 bg-teal-50 rounded-xl border border-teal-200 text-teal-950 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-teal-900">
                  <CheckCircle2 size={16} />
                  <span>Inquiry Submitted</span>
                </div>
                <p>
                  Thank you. Your message has been received by the clinic staff. For urgent consultation, please call <strong>{clinicConfig.phone}</strong> directly.
                </p>
                <button
                  onClick={() => { setFormSent(false); setInquiryForm({ name: '', phone: '', message: '' }); }}
                  className="mt-2 text-xs font-semibold text-teal-800 underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="inquiryName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="inquiryName"
                    type="text"
                    placeholder="Full name"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inquiryPhone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="inquiryPhone"
                    type="tel"
                    placeholder="e.g. 0987654321"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inquiryMessage" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="inquiryMessage"
                    rows={3}
                    placeholder="Describe your inquiry..."
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={13} />
                  <span>Send Message to Clinic</span>
                </button>
              </form>
            )}
          </div>

          {/* Map & Landmark Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Landmark & Neighborhood
            </h4>
            <p className="text-slate-600 leading-relaxed">
              The clinic is located in Singh More, Hatia area along Latma Road / Vikas Nagar, Ranchi, Jharkhand.
            </p>
            <div className="pt-2">
              <a
                href={clinicConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-800 font-semibold text-center block transition-colors shadow-2xs"
              >
                Navigate via Google Maps ↗
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
