import React, { useState, useId } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  FileText,
  Printer,
  RotateCcw
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { standardTimeSlots } from '../data/initialData';
import { Appointment } from '../types';
import { PageId } from '../components/Navbar';

interface BookAppointmentPageProps {
  initialService?: string;
  onNavigate: (page: PageId) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({
  initialService,
  onNavigate
}) => {
  const { clinicConfig, services, bookAppointment, isSlotBooked, appointments } = useClinic();

  // Helper for today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    consultationType: initialService || (services[0]?.title ?? 'General Medical Consultation'),
    preferredDate: todayStr,
    preferredTimeSlot: '',
    reasonForVisit: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Determine day of week for selected date
  const getDayName = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const selectedDayName = getDayName(formData.preferredDate);
  const selectedDaySchedule = clinicConfig.weeklySchedule.find(
    (s) => s.day.toLowerCase() === selectedDayName.toLowerCase()
  );
  const isSelectedDateClosed = selectedDaySchedule && !selectedDaySchedule.isOpen;

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      errors.patientName = 'Patient full name is required.';
    } else if (formData.patientName.trim().length < 2) {
      errors.patientName = 'Please enter a valid patient name.';
    }

    // Phone validation (accepts 10-digit Indian numbers with or without leading 0 / +91)
    const phoneClean = formData.phone.replace(/[\s\-()]/g, '');
    if (!phoneClean) {
      errors.phone = 'Contact phone number is required.';
    } else if (!/^((\+91|0)?[6-9]\d{9}|08803509240|\d{10,11})$/.test(phoneClean)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.consultationType) {
      errors.consultationType = 'Please select a consultation type.';
    }

    if (!formData.preferredDate) {
      errors.preferredDate = 'Preferred appointment date is required.';
    } else if (formData.preferredDate < todayStr) {
      errors.preferredDate = 'Past dates cannot be selected.';
    } else if (isSelectedDateClosed) {
      errors.preferredDate = `Clinic is closed on ${selectedDayName}s according to current schedule.`;
    }

    if (!formData.preferredTimeSlot) {
      errors.preferredTimeSlot = 'Please choose an available time slot.';
    } else if (isSlotBooked(formData.preferredDate, formData.preferredTimeSlot)) {
      errors.preferredTimeSlot = 'This slot has already been booked. Please select another time.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 125)) {
      errors.age = 'Please enter a valid age between 0 and 125.';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const result = bookAppointment({
        patientName: formData.patientName,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        consultationType: formData.consultationType,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        reasonForVisit: formData.reasonForVisit
      });

      if (result.success && result.appointment) {
        setSubmissionSuccess(result.appointment);
      } else {
        setGlobalError(result.error || 'Failed to submit appointment request.');
      }
    } catch (err: any) {
      setGlobalError(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      age: '',
      consultationType: services[0]?.title ?? 'General Medical Consultation',
      preferredDate: todayStr,
      preferredTimeSlot: '',
      reasonForVisit: ''
    });
    setFormErrors({});
    setSubmissionSuccess(null);
    setGlobalError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Appointment Request
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Book a Medical Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Request an appointment at Dr. D. K. Mishra Clinic. Your request will be directly reviewed by clinic staff.
        </p>
      </div>

      {/* Success Confirmation Screen */}
      {submissionSuccess ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 text-teal-800">
            <CheckCircle2 size={32} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Appointment Request Received</h2>
              <p className="text-xs text-teal-800 font-medium mt-0.5">
                Reference Code: <span className="font-mono font-bold">{submissionSuccess.referenceNumber}</span>
              </p>
            </div>
          </div>

          {/* Mandatory Transparent Confirmation Notice */}
          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200/80 text-teal-950 text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Important Notice: </span>
            Your appointment request has been submitted. The clinic will confirm availability.
          </div>

          {/* Appointment Details Summary */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Summary of Requested Visit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Patient Name:</span>
                <span className="font-semibold text-slate-900">{submissionSuccess.patientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Contact Phone:</span>
                <span className="font-semibold text-slate-900">{submissionSuccess.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Service:</span>
                <span className="font-semibold text-slate-900">{submissionSuccess.consultationType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Requested Date & Slot:</span>
                <span className="font-semibold text-slate-900">
                  {submissionSuccess.preferredDate} ({submissionSuccess.preferredTimeSlot})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Status:</span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900">
                  {submissionSuccess.status} (Awaiting Clinic Verification)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Clinic Location:</span>
                <span className="font-semibold text-slate-900">Singh More, Hatia, Ranchi 834003</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer size={13} />
              <span>Print / Save Slip</span>
            </button>

            <a
              href={`tel:${clinicConfig.phone}`}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Phone size={13} />
              <span>Call Clinic to Confirm ({clinicConfig.phone})</span>
            </a>

            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Book Another Appointment</span>
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          
          {globalError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <span>{globalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Patient Information */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Patient Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div>
                  <label htmlFor="patientName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="patientName"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-all ${
                        formErrors.patientName ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300 bg-white'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.patientName && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.patientName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="patientPhone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="patientPhone"
                    type="tel"
                    placeholder="e.g. 0987654321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-all ${
                      formErrors.phone ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300 bg-white'
                    }`}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Optional Email */}
                <div>
                  <label htmlFor="patientEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="patientEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-all ${
                      formErrors.email ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Optional Age */}
                <div>
                  <label htmlFor="patientAge" className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Age <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="patientAge"
                    type="number"
                    min="0"
                    max="125"
                    placeholder="e.g. 42"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-all ${
                      formErrors.age ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {formErrors.age && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.age}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Consultation & Schedule */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Consultation Service & Schedule
              </h2>

              {/* Consultation Type */}
              <div>
                <label htmlFor="consultationType" className="block text-xs font-semibold text-slate-700 mb-1">
                  Consultation Service <span className="text-rose-500">*</span>
                </label>
                <select
                  id="consultationType"
                  value={formData.consultationType}
                  onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  required
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
                {formErrors.consultationType && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.consultationType}</p>
                )}
              </div>

              {/* Preferred Date (Past dates disabled) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    min={todayStr}
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value, preferredTimeSlot: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 cursor-pointer ${
                      formErrors.preferredDate ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300 bg-white'
                    }`}
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Selected day: <span className="font-semibold text-slate-700">{selectedDayName}</span>
                    {selectedDaySchedule && (
                      <span> · {selectedDaySchedule.isOpen ? `Open (${selectedDaySchedule.openTime} - ${selectedDaySchedule.closeTime})` : 'Clinic Closed'}</span>
                    )}
                  </p>
                  {formErrors.preferredDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.preferredDate}</p>
                  )}
                </div>

                {/* Available Time Slots with Double Booking Prevention */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available Time Slots <span className="text-rose-500">*</span>
                  </label>
                  
                  {isSelectedDateClosed ? (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-xs">
                      The clinic is closed on {selectedDayName}s. Please choose another date or call 08803509240.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {standardTimeSlots.map((slot) => {
                        const booked = isSlotBooked(formData.preferredDate, slot);
                        const isSelected = formData.preferredTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={booked}
                            onClick={() => setFormData({ ...formData, preferredTimeSlot: slot })}
                            className={`px-2.5 py-2 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                              booked
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-teal-700 text-white border-teal-700 font-medium shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600 hover:bg-slate-50'
                            }`}
                            title={booked ? 'Already booked' : 'Available slot'}
                          >
                            <span className="block text-[11px]">{slot}</span>
                            <span className="text-[9px] block">
                              {booked ? 'Booked' : isSelected ? 'Selected' : 'Available'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {formErrors.preferredTimeSlot && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.preferredTimeSlot}</p>
                  )}
                </div>
              </div>

              {/* Optional Reason for Visit */}
              <div>
                <label htmlFor="reasonForVisit" className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Visit / Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="reasonForVisit"
                  rows={3}
                  placeholder="Brief note on health consultation or symptoms..."
                  value={formData.reasonForVisit}
                  onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

            </div>

            {/* Notice & Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed space-y-1">
              <p className="font-semibold text-slate-700">Appointment Confirmation Policy:</p>
              <p>
                Appointments submitted through this form are manual requests. The clinic staff reviews schedule availability and confirms patient visits during operating hours. Please call <strong>{clinicConfig.phone}</strong> for emergency medical assistance.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={`tel:${clinicConfig.phone}`}
                className="text-xs text-slate-600 hover:text-teal-700 flex items-center gap-1.5"
              >
                <Phone size={13} />
                <span>Prefer to book by phone? Call {clinicConfig.phone}</span>
              </a>

              <button
                type="submit"
                disabled={isSubmitting || isSelectedDateClosed}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Submitting Request...' : 'Submit Appointment Request'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
