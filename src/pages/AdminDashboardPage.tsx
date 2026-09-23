import React, { useState } from 'react';
import {
  Lock,
  LogOut,
  Calendar,
  User,
  Activity,
  Settings,
  Star,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Clock,
  Phone,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { AppointmentStatus, DaySchedule, MedicalService, ReviewItem } from '../types';
import { standardTimeSlots } from '../data/initialData';
import { DoctorPhotoPlaceholder } from '../components/DoctorPhotoPlaceholder';

export const AdminDashboardPage: React.FC = () => {
  const {
    clinicConfig,
    updateClinicConfig,
    doctorProfile,
    updateDoctorProfile,
    services,
    addService,
    updateService,
    deleteService,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    appointments,
    updateAppointmentStatus,
    rescheduleAppointment,
    deleteAppointment,
    isSlotBooked,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    resetToDefaults
  } = useClinic();

  // Login state
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'appointments' | 'doctor' | 'services' | 'clinic' | 'reviews'>('appointments');

  // Appointment filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rescheduleModal, setRescheduleModal] = useState<{ id: string; date: string; timeSlot: string } | null>(null);
  const [rescheduleError, setRescheduleError] = useState('');

  // Feedback notifications
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const triggerFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // -------------------------------------------------------------
  // AUTHENTICATION GATE
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (loginAdmin(passcodeInput)) {
        setAuthError('');
        setPasscodeInput('');
      } else {
        setAuthError('Invalid clinic passcode. Please check and try again.');
      }
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Clinic Administration</h1>
            <p className="text-xs text-slate-500">
              Private console for Dr. D. K. Mishra Clinic. Authorized staff only.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminKey" className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Passcode / Key
              </label>
              <input
                id="adminKey"
                type="password"
                placeholder="Enter passcode"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                required
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Authorized master keys: <code className="text-slate-600 font-mono">admin2026</code> or clinic phone <code className="text-slate-600 font-mono">08803509240</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
            <span>ADMINISTRATOR CONSOLE</span>
            <span>·</span>
            <span>{clinicConfig.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Clinic Operations & Content Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all clinic data, services, and profile back to verified initial defaults?')) {
                resetToDefaults();
                triggerFeedback('Configuration reset to verified clinic defaults.');
              }
            }}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Restore original clinic settings"
          >
            <RefreshCw size={12} />
            <span>Reset Baseline Defaults</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveSuccessMsg && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 size={14} className="text-teal-700 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl max-w-fit">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'appointments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar size={14} />
          <span>Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('doctor')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'doctor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User size={14} />
          <span>Doctor Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'services' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity size={14} />
          <span>Medical Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('clinic')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'clinic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings size={14} />
          <span>Clinic Settings & Hours</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reviews' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Star size={14} />
          <span>Authorized Reviews ({reviews.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: APPOINTMENTS MANAGEMENT                            */}
      {/* ========================================================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patient, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 w-56 sm:w-64 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter size={13} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No-show">No-show</option>
                </select>
              </div>
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </span>
          </div>

          {/* Appointments Table */}
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No appointments match the current filter.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Ref / Date</th>
                      <th className="px-4 py-3 font-semibold">Patient</th>
                      <th className="px-4 py-3 font-semibold">Contact</th>
                      <th className="px-4 py-3 font-semibold">Consultation</th>
                      <th className="px-4 py-3 font-semibold">Time Slot</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3.5">
                          <span className="font-mono font-bold text-slate-900 block">{apt.referenceNumber}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{apt.preferredDate}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-semibold text-slate-900 block">{apt.patientName}</span>
                          {apt.age && <span className="text-[11px] text-slate-400">Age: {apt.age}</span>}
                        </td>
                        <td className="px-4 py-3.5">
                          <a href={`tel:${apt.phone}`} className="text-teal-800 font-medium hover:underline block">
                            {apt.phone}
                          </a>
                          {apt.email && <span className="text-[11px] text-slate-400 block">{apt.email}</span>}
                        </td>
                        <td className="px-4 py-3.5 max-w-[180px]">
                          <span className="font-medium text-slate-800 block truncate">{apt.consultationType}</span>
                          {apt.reasonForVisit && (
                            <span className="text-[10px] text-slate-400 block truncate" title={apt.reasonForVisit}>
                              Note: {apt.reasonForVisit}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                          {apt.preferredTimeSlot}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              apt.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : apt.status === 'Pending'
                                ? 'bg-amber-100 text-amber-900'
                                : apt.status === 'Rescheduled'
                                ? 'bg-sky-100 text-sky-800'
                                : apt.status === 'Completed'
                                ? 'bg-slate-100 text-slate-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1">
                          {apt.status !== 'Confirmed' && (
                            <button
                              onClick={() => {
                                updateAppointmentStatus(apt.id, 'Confirmed');
                                triggerFeedback(`Appointment ${apt.referenceNumber} marked Confirmed.`);
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[11px] font-medium transition-colors cursor-pointer"
                              title="Confirm visit"
                            >
                              Confirm
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setRescheduleModal({
                                id: apt.id,
                                date: apt.preferredDate,
                                timeSlot: apt.preferredTimeSlot
                              });
                              setRescheduleError('');
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Reschedule
                          </button>

                          {apt.status !== 'Completed' && (
                            <button
                              onClick={() => {
                                updateAppointmentStatus(apt.id, 'Completed');
                                triggerFeedback(`Appointment ${apt.referenceNumber} marked Completed.`);
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              Complete
                            </button>
                          )}

                          {apt.status !== 'Cancelled' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Cancel appointment for ${apt.patientName}?`)) {
                                  updateAppointmentStatus(apt.id, 'Cancelled');
                                  triggerFeedback(`Appointment ${apt.referenceNumber} marked Cancelled.`);
                                }
                              }}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete record for ${apt.patientName}?`)) {
                                deleteAppointment(apt.id);
                                triggerFeedback('Appointment deleted.');
                              }
                            }}
                            className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors inline-block cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reschedule Modal */}
          {rescheduleModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">Reschedule Appointment</h3>
                  <button
                    onClick={() => setRescheduleModal(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {rescheduleError && (
                  <div className="p-2 bg-rose-50 text-rose-700 text-xs rounded border border-rose-200">
                    {rescheduleError}
                  </div>
                )}

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Select New Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={rescheduleModal.date}
                      onChange={(e) => setRescheduleModal({ ...rescheduleModal, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Select New Time Slot</label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                      {standardTimeSlots.map((slot) => {
                        const booked = isSlotBooked(rescheduleModal.date, slot, rescheduleModal.id);
                        const isSelected = rescheduleModal.timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={booked}
                            onClick={() => setRescheduleModal({ ...rescheduleModal, timeSlot: slot })}
                            className={`p-2 text-xs rounded border text-left cursor-pointer ${
                              booked
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-teal-700 text-white border-teal-700 font-medium'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600'
                            }`}
                          >
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setRescheduleModal(null)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const res = rescheduleAppointment(rescheduleModal.id, rescheduleModal.date, rescheduleModal.timeSlot);
                      if (res.success) {
                        setRescheduleModal(null);
                        triggerFeedback('Appointment rescheduled successfully.');
                      } else {
                        setRescheduleError(res.error || 'Cannot reschedule to this slot.');
                      }
                    }}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Save New Schedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: DOCTOR PROFILE                                     */}
      {/* ========================================================= */}
      {activeTab === 'doctor' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Doctor Profile & Professional Credentials</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict Rule: Do not invent doctor qualifications or experience. Only verified details entered here will appear on public pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Photo Upload Area */}
            <div className="md:col-span-4 flex flex-col items-center space-y-3">
              <DoctorPhotoPlaceholder
                photoUrl={doctorProfile.photoUrl}
                name={doctorProfile.name}
                size="xl"
              />

              <div className="w-full space-y-2">
                <label className="block text-center text-xs font-semibold text-slate-700">
                  Upload Real Doctor Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const dataUrl = event.target?.result as string;
                        updateDoctorProfile({ photoUrl: dataUrl });
                        triggerFeedback('Doctor photograph updated.');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />

                {doctorProfile.photoUrl && (
                  <button
                    onClick={() => {
                      updateDoctorProfile({ photoUrl: null });
                      triggerFeedback('Photo removed. Using neutral placeholder.');
                    }}
                    className="w-full py-1 text-xs text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    Remove Photo (Return to Neutral Placeholder)
                  </button>
                )}
              </div>
            </div>

            {/* Profile Fields */}
            <div className="md:col-span-8 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={doctorProfile.name}
                  onChange={(e) => updateDoctorProfile({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Verified Qualifications (e.g. MBBS, MD)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank until verified by clinic"
                    value={doctorProfile.qualifications}
                    onChange={(e) => updateDoctorProfile({ qualifications: e.target.value, isVerified: true })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. General Medicine"
                    value={doctorProfile.specialization}
                    onChange={(e) => updateDoctorProfile({ specialization: e.target.value, isVerified: true })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Verified Experience (e.g. 15+ Years)
                </label>
                <input
                  type="text"
                  placeholder="Leave blank until confirmed"
                  value={doctorProfile.experience}
                  onChange={(e) => updateDoctorProfile({ experience: e.target.value, isVerified: true })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Professional Biography / Introduction
                </label>
                <textarea
                  rows={4}
                  value={doctorProfile.biography}
                  onChange={(e) => updateDoctorProfile({ biography: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => triggerFeedback('Doctor profile saved.')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                >
                  Save Doctor Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: MEDICAL SERVICES                                   */}
      {/* ========================================================= */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Verified Medical Services</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, or remove services offered at Dr. D. K. Mishra Clinic.
              </p>
            </div>

            <button
              onClick={() => {
                const title = window.prompt('Enter service title:');
                if (title && title.trim()) {
                  addService({
                    title: title.trim(),
                    shortDescription: 'General consultation service verified by Dr. D. K. Mishra Clinic.',
                    iconName: 'stethoscope',
                    instructions: 'Please bring prior medical records and prescription slips.',
                    isVerified: true
                  });
                  triggerFeedback(`Service "${title}" added.`);
                }
              }}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <input
                    type="text"
                    value={srv.title}
                    onChange={(e) => updateService(srv.id, { title: e.target.value })}
                    className="font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-teal-600 focus:outline-hidden w-full text-sm"
                  />
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete service "${srv.title}"?`)) {
                        deleteService(srv.id);
                        triggerFeedback(`Service removed.`);
                      }
                    }}
                    className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer"
                    title="Delete service"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={srv.shortDescription}
                    onChange={(e) => updateService(srv.id, { shortDescription: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Patient Preparation Instructions
                  </label>
                  <input
                    type="text"
                    value={srv.instructions || ''}
                    onChange={(e) => updateService(srv.id, { instructions: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: CLINIC SETTINGS & WEEKLY HOURS                     */}
      {/* ========================================================= */}
      {activeTab === 'clinic' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-8">
          <div>
            <h2 className="text-base font-bold text-slate-900">Clinic Information & Weekly Hours</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage verified contact details, address, Google Maps link, and day-by-day operating hours.
            </p>
          </div>

          {/* Basic Clinic Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinic Name (English)</label>
              <input
                type="text"
                value={clinicConfig.name}
                onChange={(e) => updateClinicConfig({ name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hindi Clinic Name</label>
              <input
                type="text"
                value={clinicConfig.hindiName}
                onChange={(e) => updateClinicConfig({ hindiName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone (Click-to-call)</label>
              <input
                type="text"
                value={clinicConfig.phone}
                onChange={(e) => updateClinicConfig({ phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Plus Code</label>
              <input
                type="text"
                value={clinicConfig.googlePlusCode}
                onChange={(e) => updateClinicConfig({ googlePlusCode: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Full Clinic Address</label>
              <input
                type="text"
                value={clinicConfig.address}
                onChange={(e) => updateClinicConfig({ address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Google Maps Profile URL</label>
              <input
                type="text"
                value={clinicConfig.googleMapsUrl}
                onChange={(e) => updateClinicConfig({ googleMapsUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Google Status / Schedule Note</label>
              <input
                type="text"
                value={clinicConfig.googleBusinessStatusNote}
                onChange={(e) => updateClinicConfig({ googleBusinessStatusNote: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Day-by-Day Weekly Hours */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Weekly Consultation Schedule (Configurable by day)
            </h3>
            <div className="space-y-3">
              {clinicConfig.weeklySchedule.map((sched, idx) => (
                <div
                  key={sched.day}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <input
                      type="checkbox"
                      id={`day-${sched.day}`}
                      checked={sched.isOpen}
                      onChange={(e) => {
                        const updated = [...clinicConfig.weeklySchedule];
                        updated[idx] = { ...sched, isOpen: e.target.checked };
                        updateClinicConfig({ weeklySchedule: updated });
                      }}
                      className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                    />
                    <label htmlFor={`day-${sched.day}`} className="font-bold text-slate-900 cursor-pointer">
                      {sched.day}
                    </label>
                  </div>

                  {sched.isOpen ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-500">From:</span>
                      <input
                        type="text"
                        value={sched.openTime}
                        onChange={(e) => {
                          const updated = [...clinicConfig.weeklySchedule];
                          updated[idx] = { ...sched, openTime: e.target.value };
                          updateClinicConfig({ weeklySchedule: updated });
                        }}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-center"
                      />
                      <span className="text-slate-500">To:</span>
                      <input
                        type="text"
                        value={sched.closeTime}
                        onChange={(e) => {
                          const updated = [...clinicConfig.weeklySchedule];
                          updated[idx] = { ...sched, closeTime: e.target.value };
                          updateClinicConfig({ weeklySchedule: updated });
                        }}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-center"
                      />
                      <input
                        type="text"
                        placeholder="Optional note (e.g. Morning OPD)"
                        value={sched.note || ''}
                        onChange={(e) => {
                          const updated = [...clinicConfig.weeklySchedule];
                          updated[idx] = { ...sched, note: e.target.value };
                          updateClinicConfig({ weeklySchedule: updated });
                        }}
                        className="px-2 py-1 bg-white border border-slate-300 rounded w-44"
                      />
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Clinic Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => triggerFeedback('Clinic settings saved.')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Save Clinic Settings
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: REVIEWS MANAGEMENT                                 */}
      {/* ========================================================= */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Authorized Patient Reviews</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Maintain authentic Google review excerpts. Do not fabricate or distort patient reviews.
              </p>
            </div>

            <button
              onClick={() => {
                const text = window.prompt('Enter authorized review excerpt:');
                if (text && text.trim()) {
                  addReview({
                    authorName: 'Verified Patient',
                    authorInitials: 'VP',
                    rating: 5,
                    date: 'Google Review',
                    text: text.trim(),
                    source: 'Google Reviews',
                    sourceUrl: clinicConfig.googleMapsUrl
                  });
                  triggerFeedback('Review excerpt added.');
                }
              }}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add Authorized Excerpt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rev.authorName}
                      onChange={(e) => updateReview(rev.id, { authorName: e.target.value })}
                      className="font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:outline-hidden w-36"
                    />
                    <span className="text-slate-400">·</span>
                    <select
                      value={rev.rating}
                      onChange={(e) => updateReview(rev.id, { rating: Number(e.target.value) })}
                      className="border border-slate-200 rounded px-1 py-0.5 font-semibold text-slate-700"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('Remove this review excerpt?')) {
                        deleteReview(rev.id);
                        triggerFeedback('Review removed.');
                      }
                    }}
                    className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={rev.text}
                  onChange={(e) => updateReview(rev.id, { text: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs resize-none"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: {rev.source}</span>
                  <input
                    type="text"
                    value={rev.date}
                    onChange={(e) => updateReview(rev.id, { date: e.target.value })}
                    className="border-b border-transparent hover:border-slate-300 text-right w-32"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
