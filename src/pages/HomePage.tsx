import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Stethoscope,
  Activity,
  ClipboardCheck,
  Shield,
  Building2
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { DoctorPhotoPlaceholder } from '../components/DoctorPhotoPlaceholder';
import { PageId } from '../components/Navbar';

// Generated imagery paths
import consultationRoomImg from '../assets/images/clinic_consultation_room_1790163333846.jpg';
import receptionInteriorImg from '../assets/images/clinic_reception_interior_1790163347372.jpg';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { clinicConfig, doctorProfile, services, reviews } = useClinic();
  const [imgError, setImgError] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className="text-teal-700" size={20} />;
      case 'activity':
        return <Activity className="text-teal-700" size={20} />;
      case 'clipboard':
        return <ClipboardCheck className="text-teal-700" size={20} />;
      default:
        return <Shield className="text-teal-700" size={20} />;
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      
      {/* ======================================================== */}
      {/* HERO SECTION                                             */}
      {/* ======================================================== */}
      <section className="relative pt-6 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Col: Core Message */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Region and Trust Kicker */}
              <div className="text-xs font-bold text-teal-800 tracking-wider uppercase flex items-center gap-2">
                <span>DR. D. K. MISHRA CLINIC</span>
                <span className="text-slate-300">·</span>
                <span>RANCHI</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Trusted Medical Care, Focused on Your Wellbeing
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Connect with Dr. D. K. Mishra Clinic in Ranchi for professional medical consultation and patient-focused care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('book')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calendar size={16} />
                  <span>Book an Appointment</span>
                </button>

                <a
                  href={`tel:${clinicConfig.phone}`}
                  className="px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Phone size={16} className="text-teal-700" />
                  <span>Call Clinic ({clinicConfig.phone})</span>
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-200/80">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Facility</span>
                    <span className="font-semibold text-slate-800">{clinicConfig.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Rating</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {clinicConfig.googleRating} / 5.0
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Google Reviews</span>
                    <span className="font-semibold text-slate-800">{clinicConfig.googleReviewCount} Verified</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Location</span>
                    <span className="font-semibold text-slate-800 truncate">Hatia, Ranchi</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Verified Non-Human Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                {!imgError ? (
                  <img
                    src={consultationRoomImg}
                    alt="Dr. D. K. Mishra Clinic Consultation Room in Ranchi"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-center text-slate-600">
                    <Building2 size={40} className="text-teal-700 mb-2" />
                    <span className="font-semibold text-sm">Dr. D. K. Mishra Clinic</span>
                    <span className="text-xs text-slate-500">Consultation Practice · Hatia, Ranchi</span>
                  </div>
                )}

                {/* Quiet overlay caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-4 text-white">
                  <p className="text-xs font-medium">Dr. D. K. Mishra Clinic · Consultation Space</p>
                  <p className="text-[11px] text-slate-300">Singh More, Hatia, Ranchi 834003</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* QUICK INFORMATION STRIP                                   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-slate-200">
            
            {/* Item 1: Category */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Classification</h3>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{clinicConfig.category}</p>
                <p className="text-xs text-slate-500">{clinicConfig.hindiName}</p>
              </div>
            </div>

            {/* Item 2: Verified Address */}
            <div className="flex items-start gap-3 lg:pl-6">
              <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clinic Address</h3>
                <p className="text-xs font-medium text-slate-800 mt-0.5 leading-snug line-clamp-2">
                  No. 2, Vikas Nagar, Singh More, Hatia, Ranchi
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">PIN: 834003</p>
              </div>
            </div>

            {/* Item 3: Phone Contact */}
            <div className="flex items-start gap-3 lg:pl-6">
              <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Contact</h3>
                <a
                  href={`tel:${clinicConfig.phone}`}
                  className="text-sm font-semibold text-slate-900 hover:text-teal-700 transition-colors block mt-0.5"
                >
                  {clinicConfig.phone}
                </a>
                <p className="text-[11px] text-slate-500">Click to call clinic</p>
              </div>
            </div>

            {/* Item 4: Schedule / Availability */}
            <div className="flex items-start gap-3 lg:pl-6">
              <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Availability</h3>
                <p className="text-xs font-medium text-slate-800 mt-0.5 leading-snug">
                  Opens 10:00 AM Thursday
                </p>
                <p className="text-[11px] text-slate-500">Advance appointment advised</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* ABOUT THE DOCTOR PREVIEW                                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Photo Placeholder */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <DoctorPhotoPlaceholder
                photoUrl={doctorProfile.photoUrl}
                name={doctorProfile.name}
                size="lg"
              />
            </div>

            {/* Content */}
            <div className="md:col-span-8 space-y-4">
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Doctor Introduction
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {doctorProfile.name}
              </h2>

              {/* Verified Qualifications / Specialization row */}
              {doctorProfile.isVerified && (doctorProfile.qualifications || doctorProfile.specialization) ? (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                  {doctorProfile.qualifications && <span>{doctorProfile.qualifications}</span>}
                  {doctorProfile.qualifications && doctorProfile.specialization && <span>·</span>}
                  {doctorProfile.specialization && <span>{doctorProfile.specialization}</span>}
                  {doctorProfile.experience && (
                    <>
                      <span>·</span>
                      <span>{doctorProfile.experience} Experience</span>
                    </>
                  )}
                </div>
              ) : null}

              {/* Biography or placeholder note */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {doctorProfile.biography}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <span>View Doctor Profile</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar size={13} />
                  <span>Book Consultation</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MEDICAL SERVICES PREVIEW                                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
              Clinical Offerings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Medical Care at Our Clinic
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Verified consultation services offered at Dr. D. K. Mishra Clinic.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 hover:underline cursor-pointer"
          >
            <span>View Medical Services</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 3-4 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-teal-600/60 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {getServiceIcon(service.iconName)}
                </div>
                <h3 className="font-semibold text-sm text-slate-900 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">In-Person Clinic</span>
                <button
                  onClick={() => onNavigate('book')}
                  className="font-semibold text-teal-800 hover:text-teal-900 cursor-pointer"
                >
                  Book Slot →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* APPOINTMENT CTA                                          */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Schedule Your Visit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Need a Medical Consultation?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Contact the clinic to check availability and schedule your visit. No fake urgency—our team reviews and confirms each appointment personally.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('book')}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar size={15} />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${clinicConfig.phone}`}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone size={15} className="text-teal-400" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* REVIEWS PREVIEW                                          */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
              Google Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Patient Ratings
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="font-semibold text-slate-900">{clinicConfig.googleRating} ★</span>
              <span>·</span>
              <span>Based on {clinicConfig.googleReviewCount} Google Reviews</span>
              <span>·</span>
              <span className="text-teal-700">Google Verified Profile</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('reviews')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 hover:underline cursor-pointer"
          >
            <span>View All Reviews</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Text-based review cards with neutral initials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Neutral initials avatar - strict prohibition on fake human faces */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center">
                      {rev.authorInitials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{rev.authorName}</p>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Source: {rev.source}</span>
                {rev.sourceUrl && (
                  <a
                    href={rev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-700 flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* LOCATION PREVIEW                                         */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Location Details */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Clinic Location
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {clinicConfig.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {clinicConfig.address}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2">
                  <p>
                    <span className="font-medium text-slate-700">Phone: </span>
                    <a href={`tel:${clinicConfig.phone}`} className="text-teal-700 hover:underline">
                      {clinicConfig.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Google Plus Code: </span>
                    <span className="font-mono text-slate-800">{clinicConfig.googlePlusCode}</span>
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Status: </span>
                    <span>{clinicConfig.googleBusinessStatusNote}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                <a
                  href={clinicConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <MapPin size={13} className="text-teal-700" />
                  <span>Get Directions</span>
                  <ExternalLink size={11} />
                </a>

                <a
                  href={`tel:${clinicConfig.phone}`}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  <span>Call Clinic</span>
                </a>

                <button
                  onClick={() => onNavigate('book')}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar size={13} />
                  <span>Book Appointment</span>
                </button>
              </div>

            </div>

            {/* Map Preview / Interactive directions placeholder */}
            <div className="lg:col-span-7 bg-slate-100 relative min-h-[280px] flex items-center justify-center p-6 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="text-center max-w-sm space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Dr. D. K. Mishra Clinic</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Singh More, Hatia, Ranchi, Jharkhand 834003</p>
                </div>
                <a
                  href={clinicConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
