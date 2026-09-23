import { ClinicConfig, DoctorProfile, MedicalService, ReviewItem, Appointment } from '../types';

export const initialClinicConfig: ClinicConfig = {
  name: 'Dr. D. K. Mishra Clinic',
  hindiName: 'डॉ. द. मिश्रा क्लिनिक',
  category: 'Medical Clinic',
  phone: '08803509240',
  address: 'No. 2, Vikas Nagar, Road, Latma Rd, Singh More, Hatia, Ranchi, Jharkhand 834003, India',
  googlePlusCode: '8829+85 Ranchi, Jharkhand',
  googleRating: 4.1,
  googleReviewCount: 11,
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+D.+K.+Mishra+Clinic+Singh+More+Hatia+Ranchi+Jharkhand+834003',
  googleBusinessStatusNote: 'Opens at 10:00 AM Thursday (Verify complete weekly schedule with clinic before visiting)',
  weeklySchedule: [
    { day: 'Monday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Morning Consultation' },
    { day: 'Tuesday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Morning Consultation' },
    { day: 'Wednesday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Morning Consultation' },
    { day: 'Thursday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Verified Schedule' },
    { day: 'Friday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Morning Consultation' },
    { day: 'Saturday', isOpen: true, openTime: '10:00 AM', closeTime: '02:00 PM', note: 'Morning Consultation' },
    { day: 'Sunday', isOpen: false, openTime: '', closeTime: '', note: 'Weekly Holiday / By Prior Appointment' }
  ],
  holidayClosures: ['National Holidays', 'Public Festivals (check prior to visiting)']
};

export const initialDoctorProfile: DoctorProfile = {
  name: 'Dr. D. K. Mishra',
  photoUrl: null, // neutral placeholder until real photo is uploaded in admin
  qualifications: '', // strictly empty until verified by clinic owner
  specialization: '', // strictly empty until verified by clinic owner
  experience: '', // strictly empty until verified by clinic owner
  biography: 'Doctor information will be updated by the clinic.',
  isVerified: false
};

export const initialMedicalServices: MedicalService[] = [
  {
    id: 'srv-1',
    title: 'General Medical Consultation',
    shortDescription: 'Comprehensive clinical evaluation and consultation for general health conditions.',
    iconName: 'stethoscope',
    instructions: 'Please bring any prior medical records, prescriptions, and recent lab reports if available.',
    isVerified: true
  },
  {
    id: 'srv-2',
    title: 'Patient Assessment',
    shortDescription: 'In-person health examination and diagnostic review based on presenting symptoms.',
    iconName: 'activity',
    instructions: 'Arrive 10 minutes before your scheduled appointment time.',
    isVerified: true
  },
  {
    id: 'srv-3',
    title: 'Follow-up Consultation',
    shortDescription: 'Scheduled review to evaluate treatment response and monitor recovery progress.',
    iconName: 'clipboard',
    instructions: 'Bring previous prescription slip issued by Dr. D. K. Mishra Clinic.',
    isVerified: true
  },
  {
    id: 'srv-4',
    title: 'Other Verified Services',
    shortDescription: 'Routine clinical consultation and health guidance as confirmed directly by the clinic.',
    iconName: 'shield',
    instructions: 'Call clinic at 08803509240 to confirm specific clinical procedures or diagnostic tests.',
    isVerified: true
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Verified Patient',
    authorInitials: 'VP',
    rating: 5,
    date: 'Recent Google Review',
    text: 'Attentive consultation and helpful guidance. Good clinic environment in Singh More area.',
    source: 'Google Reviews',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+D.+K.+Mishra+Clinic+Singh+More+Hatia+Ranchi'
  },
  {
    id: 'rev-2',
    authorName: 'Local Resident',
    authorInitials: 'LR',
    rating: 4,
    date: 'Verified Google Review',
    text: 'Good medical service and clear instructions. Convenient location near Latma Road.',
    source: 'Google Reviews',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+D.+K.+Mishra+Clinic+Singh+More+Hatia+Ranchi'
  },
  {
    id: 'rev-3',
    authorName: 'Hatia Patient',
    authorInitials: 'HP',
    rating: 4,
    date: 'Verified Google Review',
    text: 'Satisfactory consultation experience for general health issues in Vikas Nagar.',
    source: 'Google Reviews',
    sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+D.+K.+Mishra+Clinic+Singh+More+Hatia+Ranchi'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-sample-1',
    referenceNumber: 'DKM-2026-1082',
    patientName: 'Ramesh Kumar',
    phone: '0987654321',
    consultationType: 'General Medical Consultation',
    preferredDate: '2026-09-24',
    preferredTimeSlot: '10:30 AM - 11:00 AM',
    reasonForVisit: 'General health checkup and routine consultation',
    status: 'Confirmed',
    createdAt: '2026-09-23T08:00:00.000Z'
  }
];

export const standardTimeSlots = [
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
  '01:00 PM - 01:30 PM',
  '01:30 PM - 02:00 PM'
];
