import React from 'react';
import { Phone, Calendar, MapPin, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { DoctorPhotoPlaceholder } from '../components/DoctorPhotoPlaceholder';
import { PageId } from '../components/Navbar';

interface AboutDoctorPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutDoctorPage: React.FC<AboutDoctorPageProps> = ({ onNavigate }) => {
  const { clinicConfig, doctorProfile } = useClinic();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Doctor Profile
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About {doctorProfile.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Official profile and clinical consultation details for Dr. D. K. Mishra Clinic in Ranchi.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Doctor Portrait Placeholder / Uploaded Photo */}
          <div className="md:col-span-5 flex flex-col items-center">
            <DoctorPhotoPlaceholder
              photoUrl={doctorProfile.photoUrl}
              name={doctorProfile.name}
              size="xl"
            />

            <div className="mt-4 text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <ShieldCheck size={14} className="text-teal-700" />
                <span>Verified Clinic Entity</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Doctor photo and verified credentials can be updated from the Admin Dashboard.
              </p>
            </div>
          </div>

          {/* Details & Biography */}
          <div className="md:col-span-7 space-y-6">
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{doctorProfile.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{clinicConfig.name} · {clinicConfig.hindiName}</p>
            </div>

            {/* Verified Clinical Credentials Section */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Clinical Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Qualifications:</span>
                  <span className="font-medium text-slate-800">
                    {doctorProfile.qualifications ? doctorProfile.qualifications : 'Will be updated by clinic'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Specialization:</span>
                  <span className="font-medium text-slate-800">
                    {doctorProfile.specialization ? doctorProfile.specialization : 'General Medical Practice'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Clinical Experience:</span>
                  <span className="font-medium text-slate-800">
                    {doctorProfile.experience ? doctorProfile.experience : 'Will be updated by clinic'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Consultation Mode:</span>
                  <span className="font-medium text-slate-800">In-Person Consultation</span>
                </div>
              </div>
            </div>

            {/* Professional Biography */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Professional Introduction</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctorProfile.biography}
              </p>
            </div>

            {/* Practice Location */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-teal-700 shrink-0 mt-0.5" />
                <span>{clinicConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-teal-700 shrink-0" />
                <span>Google Plus Code: {clinicConfig.googlePlusCode}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('book')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={14} />
                <span>Book Appointment with Doctor</span>
              </button>

              <a
                href={`tel:${clinicConfig.phone}`}
                className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Phone size={14} className="text-teal-700" />
                <span>Call Clinic ({clinicConfig.phone})</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Trust & Policy Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-500 leading-relaxed">
        <p className="font-semibold text-slate-800 mb-1">Authenticity & Patient Information Notice</p>
        <p>
          Dr. D. K. Mishra Clinic adheres to authentic and transparent healthcare standards. Professional credentials and qualifications are published only as verified by the medical practitioner. Patients may also verify credentials directly during in-person visits.
        </p>
      </div>

    </div>
  );
};
