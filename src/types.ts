export type AppointmentStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Rescheduled'
  | 'Completed'
  | 'Cancelled'
  | 'No-show';

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  phone: string;
  email?: string;
  age?: string;
  consultationType: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: string; // e.g. "10:00 AM - 10:30 AM"
  reasonForVisit?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface DaySchedule {
  day: string; // "Monday", "Tuesday", etc.
  isOpen: boolean;
  openTime: string; // "10:00 AM"
  closeTime: string; // "07:00 PM"
  note?: string;
}

export interface ClinicConfig {
  name: string;
  hindiName: string;
  category: string;
  phone: string;
  address: string;
  googlePlusCode: string;
  googleRating: number;
  googleReviewCount: number;
  googleMapsUrl: string;
  googleBusinessStatusNote: string;
  weeklySchedule: DaySchedule[];
  holidayClosures: string[];
}

export interface DoctorProfile {
  name: string;
  photoUrl: string | null; // null represents placeholder until real photo is uploaded
  qualifications: string; // empty unless verified
  specialization: string; // empty unless verified
  experience: string; // empty unless verified
  biography: string; // short verified intro or placeholder message
  isVerified: boolean;
}

export interface MedicalService {
  id: string;
  title: string;
  shortDescription: string;
  iconName: 'stethoscope' | 'clipboard' | 'activity' | 'user-check' | 'shield';
  instructions?: string;
  isVerified: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorInitials: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews';
  sourceUrl?: string;
}
