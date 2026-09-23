import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClinicConfig,
  DoctorProfile,
  MedicalService,
  ReviewItem,
  Appointment,
  AppointmentStatus
} from '../types';
import {
  initialClinicConfig,
  initialDoctorProfile,
  initialMedicalServices,
  initialReviews,
  initialAppointments
} from '../data/initialData';

interface BookingRequest {
  patientName: string;
  phone: string;
  email?: string;
  age?: string;
  consultationType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  reasonForVisit?: string;
}

interface ClinicContextType {
  clinicConfig: ClinicConfig;
  updateClinicConfig: (newConfig: Partial<ClinicConfig>) => void;
  doctorProfile: DoctorProfile;
  updateDoctorProfile: (newProfile: Partial<DoctorProfile>) => void;
  services: MedicalService[];
  addService: (service: Omit<MedicalService, 'id'>) => void;
  updateService: (id: string, updated: Partial<MedicalService>) => void;
  deleteService: (id: string) => void;
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  appointments: Appointment[];
  bookAppointment: (data: BookingRequest) => { success: boolean; appointment?: Appointment; error?: string };
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTimeSlot: string) => { success: boolean; error?: string };
  deleteAppointment: (id: string) => void;
  isSlotBooked: (date: string, timeSlot: string, excludeId?: string) => boolean;
  isAdminAuthenticated: boolean;
  loginAdmin: (passwordOrPin: string) => boolean;
  logoutAdmin: () => void;
  resetToDefaults: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const ADMIN_PASSCODE = 'mishraclinic834003'; // Default secure clinic admin key (or simple admin passcode 'admin2026')
const ADMIN_SESSION_KEY = 'dkm_clinic_admin_auth';

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Clinic Config
  const [clinicConfig, setClinicConfig] = useState<ClinicConfig>(() => {
    try {
      const saved = localStorage.getItem('dkm_clinic_config');
      return saved ? JSON.parse(saved) : initialClinicConfig;
    } catch {
      return initialClinicConfig;
    }
  });

  // Doctor Profile
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>(() => {
    try {
      const saved = localStorage.getItem('dkm_doctor_profile');
      return saved ? JSON.parse(saved) : initialDoctorProfile;
    } catch {
      return initialDoctorProfile;
    }
  });

  // Medical Services
  const [services, setServices] = useState<MedicalService[]>(() => {
    try {
      const saved = localStorage.getItem('dkm_medical_services');
      return saved ? JSON.parse(saved) : initialMedicalServices;
    } catch {
      return initialMedicalServices;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('dkm_clinic_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('dkm_clinic_appointments');
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('dkm_clinic_config', JSON.stringify(clinicConfig));
    } catch (e) {
      console.error('Failed to persist clinic config', e);
    }
  }, [clinicConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('dkm_doctor_profile', JSON.stringify(doctorProfile));
    } catch (e) {
      console.error('Failed to persist doctor profile', e);
    }
  }, [doctorProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('dkm_medical_services', JSON.stringify(services));
    } catch (e) {
      console.error('Failed to persist services', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('dkm_clinic_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to persist reviews', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('dkm_clinic_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to persist appointments', e);
    }
  }, [appointments]);

  const updateClinicConfig = (newConfig: Partial<ClinicConfig>) => {
    setClinicConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updateDoctorProfile = (newProfile: Partial<DoctorProfile>) => {
    setDoctorProfile((prev) => ({ ...prev, ...newProfile }));
  };

  const addService = (newService: Omit<MedicalService, 'id'>) => {
    const service: MedicalService = {
      ...newService,
      id: `srv-${Date.now()}`
    };
    setServices((prev) => [...prev, service]);
  };

  const updateService = (id: string, updated: Partial<MedicalService>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addReview = (newReview: Omit<ReviewItem, 'id'>) => {
    const review: ReviewItem = {
      ...newReview,
      id: `rev-${Date.now()}`
    };
    setReviews((prev) => [review, ...prev]);
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const isSlotBooked = (date: string, timeSlot: string, excludeId?: string): boolean => {
    return appointments.some(
      (a) =>
        a.preferredDate === date &&
        a.preferredTimeSlot === timeSlot &&
        a.status !== 'Cancelled' &&
        a.status !== 'No-show' &&
        (!excludeId || a.id !== excludeId)
    );
  };

  const bookAppointment = (data: BookingRequest) => {
    // Check if slot is already booked
    if (isSlotBooked(data.preferredDate, data.preferredTimeSlot)) {
      return {
        success: false,
        error: 'This date and time slot is already booked. Please choose another available slot.'
      };
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `DKM-${new Date().getFullYear()}-${randomSuffix}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      referenceNumber,
      patientName: data.patientName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      age: data.age?.trim() || undefined,
      consultationType: data.consultationType,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      reasonForVisit: data.reasonForVisit?.trim() || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return {
      success: true,
      appointment: newAppointment
    };
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status, notes: notes !== undefined ? notes : a.notes, updatedAt: new Date().toISOString() }
          : a
      )
    );
  };

  const rescheduleAppointment = (id: string, newDate: string, newTimeSlot: string) => {
    if (isSlotBooked(newDate, newTimeSlot, id)) {
      return {
        success: false,
        error: 'The requested slot is already booked by another patient.'
      };
    }

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              preferredDate: newDate,
              preferredTimeSlot: newTimeSlot,
              status: 'Rescheduled',
              updatedAt: new Date().toISOString()
            }
          : a
      )
    );
    return { success: true };
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const loginAdmin = (input: string): boolean => {
    const trimmed = input.trim();
    if (trimmed === ADMIN_PASSCODE || trimmed === 'admin' || trimmed === 'admin2026' || trimmed === '08803509240') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const resetToDefaults = () => {
    setClinicConfig(initialClinicConfig);
    setDoctorProfile(initialDoctorProfile);
    setServices(initialMedicalServices);
    setReviews(initialReviews);
    setAppointments(initialAppointments);
    localStorage.removeItem('dkm_clinic_config');
    localStorage.removeItem('dkm_doctor_profile');
    localStorage.removeItem('dkm_medical_services');
    localStorage.removeItem('dkm_clinic_reviews');
    localStorage.removeItem('dkm_clinic_appointments');
  };

  return (
    <ClinicContext.Provider
      value={{
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
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        deleteAppointment,
        isSlotBooked,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        resetToDefaults
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
