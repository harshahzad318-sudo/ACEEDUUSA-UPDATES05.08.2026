import { db } from "@/db";
import { tutors, assignments, lessons, lessonNotes, lessonRecords, tutorPayments, announcements, supportTickets, leads, students, tutorRequests, invoices, messages, notifications } from "@/db/schema";

export interface StudentRecord {
  id: number;
  parentId?: number;
  parentEmail: string;
  fullName: string;
  email?: string;
  photoUrl?: string;
  dateOfBirth?: string;
  gender?: string;
  schoolName?: string;
  gradeLevel: string;
  curriculum: string;
  subjects: string[];
  learningGoals?: string;
  medicalNotes?: string;
  learningDifficulties?: string;
  preferredTutorGender?: string;
  preferredTeachingMode?: string;
  preferredLanguage?: string;
  emergencyContact?: string;
  parentNotes?: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface TutorRequestRecord {
  id: number;
  parentId?: number;
  parentEmail: string;
  parentName: string;
  studentId?: number;
  studentName: string;
  subject: string;
  curriculum?: string;
  gradeLevel: string;
  learningMode: string;
  preferredDays: string[];
  preferredTimes: string;
  budget: number;
  learningGoals?: string;
  preferredTutorGender?: string;
  preferredLanguage?: string;
  additionalNotes?: string;
  status: "New" | "AI Matching" | "Admin Review" | "Tutor Contacted" | "Tutor Confirmed" | "Parent Confirmation" | "Scheduled" | "Active" | "Completed" | "Cancelled";
  aiRecommendations?: Array<{ tutorId: number; fullName: string; matchScore: number; reason: string }>;
  assignedTutorId?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface MessageRecord {
  id: number;
  senderEmail: string;
  senderName: string;
  senderRole: "parent" | "tutor" | "admin" | "student";
  receiverEmail: string;
  receiverName: string;
  receiverRole: "parent" | "tutor" | "admin" | "student";
  subject?: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationRecord {
  id: number;
  userEmail: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface TutorRecord {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  linkedinUrl?: string;
  totalExperienceYears: number;
  degree?: string;
  major?: string;
  institution?: string;
  graduationYear?: number;
  previousInstitutions?: string;
  onlineExperienceYears: number;
  gradeLevels: string[];
  subjects: string[];
  curriculums: string[];
  learningModes: string[];
  availability: Record<string, string[]>; // e.g. { Monday: ["09:00 - 12:00", "14:00 - 18:00"] }
  expectedRate: number;
  finalRate: number;
  sellingPrice: number;
  margin: number;
  idType?: string;
  idDocumentUrl?: string;
  identityVerified: boolean;
  resumeUrl?: string;
  certificateUrls: string[];
  demoVideoUrl?: string;
  digitalSignature?: string;
  termsAccepted: boolean;
  status: "draft" | "submitted" | "under_review" | "interview_scheduled" | "interview_completed" | "verification_pending" | "approved" | "rejected" | "suspended" | "inactive";
  interviewScheduledAt?: string;
  interviewNotes?: string;
  internalRemarks?: string;
  verificationChecklist: {
    idVerified: boolean;
    bgCheckPassed: boolean;
    educationVerified: boolean;
    demoVideoApproved: boolean;
  };
  aiSummary?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentRecord {
  id: number;
  leadId?: number;
  tutorId: number;
  studentName: string;
  parentName: string;
  parentEmail: string;
  subject: string;
  gradeLevel: string;
  learningMode: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
  tutorRate: number;
  parentPrice: number;
  margin: number;
  notes?: string;
  assignedAt: string;
}

export interface LessonRecord {
  id: number;
  assignmentId?: number;
  tutorId: number;
  studentName: string;
  parentEmail?: string;
  studentEmail?: string;
  subject: string;
  scheduleType?: "One-time" | "Recurring" | "Weekly" | "Monthly" | "Package" | "Trial" | "Assessment";
  learningMode?: "Online" | "Home Tuition" | "Center";
  startTime: string;
  endTime: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show" | "pending_reschedule";
  meetingUrl?: string;
  meetingInfo?: {
    meetingUrl: string;
    meetingId: string;
    password?: string;
    sessionNotes?: string;
    recordingEnabled: boolean;
  };
  attendanceLogged: boolean;
  attendanceStatus?: "Pending" | "Present" | "Late" | "Absent";
  cancellationReason?: string;
  packageId?: number;
  timezone?: string;
  createdAt: string;
}

export interface LessonNoteRecord {
  id: number;
  lessonId: number;
  tutorId: number;
  studentName: string;
  subject: string;
  summary: string;
  homeworkAssigned?: string;
  studentProgress: string;
  createdAt: string;
}

export interface StructuredLessonRecord {
  id: number;
  lessonId: number;
  tutorId: number;
  tutorName: string;
  studentName: string;
  studentId?: number;
  parentEmail?: string;
  subject: string;
  startTime: string;
  endTime: string;
  attendance: "Present" | "Late" | "Absent" | "Excused";
  lessonObjectives: string[];
  topicsCovered: string[];
  lessonSummary: string;
  keyConceptsLearned: string[];
  resourcesShared: Array<{ title: string; url: string; description?: string }>;
  homeworkAssigned: string;
  tutorFeedback: string;
  studentParticipation: string; // e.g. "Active & Engaged (5/5 Stars)"
  aiGeneratedRevisionSummary: string;
  videoPolicy: {
    recordingEnabled: boolean; // default false
    storageLocation: string; // "External (Cloud Vault)"
    autoExpiryDays: number; // default 30
  };
  createdAt: string;
  updatedAt: string;
}

export interface HomeworkSubmission {
  id: number;
  lessonRecordId?: number;
  studentName: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  submittedAt?: string;
  status: "Pending" | "Submitted" | "Graded" | "Late";
  fileUrls: Array<{ name: string; url: string; size: string; type: string }>;
  submissionText?: string;
  grade?: string;
  tutorFeedback?: string;
  isLate?: boolean;
}

export interface QuizResult {
  id: number;
  studentName: string;
  subject: string;
  quizTitle: string;
  quizType: "MCQ" | "Timed Quiz" | "Flashcards" | "Vocab Builder" | "Practice Test";
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeSpentMinutes: number;
  feedback: string;
}

export interface StudentMilestone {
  id: number;
  studentName: string;
  category: "Initial Assessment" | "Learning Goal" | "Skill Mastered" | "Skill In Progress" | "Monthly Review" | "Exam Readiness";
  title: string;
  subject: string;
  description: string;
  status: "Mastered" | "In Progress" | "Needs Review" | "Achieved";
  scoreOrProgress?: string;
  date: string;
}

export interface StudentAchievement {
  id: number;
  studentName: string;
  badgeId: string;
  title: string;
  description: string;
  iconName: string;
  category: "Attendance" | "Homework" | "Quizzes" | "Milestone";
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LearningResourceItem {
  id: number;
  subject: string;
  title: string;
  type: "PDF Notes" | "Worksheet" | "Slides" | "Practice Paper" | "Video" | "External Link";
  tutorName: string;
  description: string;
  url: string;
  fileSize?: string;
  uploadedAt: string;
  tags: string[];
}

export interface PaymentRecord {
  id: number;
  tutorId: number;
  lessonId?: number;
  hours: number;
  hourlyRate: number;
  grossPayout: number;
  status: "pending" | "approved" | "paid";
  createdAt: string;
}

export interface AnnouncementRecord {
  id: number;
  title: string;
  content: string;
  targetRole: string;
  author: string;
  createdAt: string;
}

export interface SupportTicketRecord {
  id: number;
  userEmail: string;
  userRole: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

export interface PackageSubscriptionRecord {
  id: number;
  parentEmail: string;
  parentName: string;
  studentName: string;
  subject: string;
  packageType: "Single Lesson" | "5 Lesson Package" | "10 Lesson Package" | "20 Lesson Package" | "Unlimited Monthly" | "Corporate Package";
  totalLessons: number;
  completedLessons: number;
  remainingLessons: number;
  price: number;
  status: "active" | "depleted" | "expired" | "renewed";
  startDate: string;
  expiryDate: string;
}

export interface RescheduleRequestRecord {
  id: number;
  lessonId: number;
  requestedByRole: "parent" | "tutor" | "student" | "admin";
  requestedByEmail: string;
  reason: string;
  originalStartTime: string;
  originalEndTime: string;
  proposedStartTime: string;
  proposedEndTime: string;
  status: "pending_admin" | "approved" | "declined";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CancellationRecord {
  id: number;
  lessonId: number;
  requestedByRole: "parent" | "tutor" | "admin";
  requestedByEmail: string;
  reason: string;
  cancellationFee: number;
  tutorCompensationAmount: number;
  parentRefundAmount: number;
  status: "pending_approval" | "approved" | "rejected";
  policyApplied: string;
  createdAt: string;
}

export interface BlackoutDateRecord {
  id: number;
  entityType: "tutor" | "student" | "global_holiday";
  entityIdOrEmail?: string;
  title: string;
  startDate: string;
  endDate: string;
  reason?: string;
  createdAt: string;
}

export interface WaitlistRecord {
  id: number;
  tutorRequestId?: number;
  parentName: string;
  parentEmail: string;
  studentName: string;
  subject: string;
  gradeLevel: string;
  preferredDays: string[];
  preferredTimes: string;
  learningMode: string;
  status: "waiting" | "matched" | "contacted" | "cancelled";
  suggestedTutorIds: number[];
  createdAt: string;
}

export interface AutomationLogRecord {
  id: number;
  eventType: string;
  message: string;
  timestamp: string;
}

export interface InvoiceLineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceRecord {
  id: number;
  parentId?: number;
  assignmentId?: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  parentName: string;
  parentEmail: string;
  studentName: string;
  studentEmail?: string;
  subject: string;
  serviceType: "Assessment Session" | "Single Lesson" | "Lesson Package" | "Monthly Tuition" | "Corporate Training" | "Language Course" | "Exam Preparation Course";
  packageDetails?: string;
  lessonsIncluded: number;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  amount?: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paidAt?: string;
  status: "pending" | "paid" | "unpaid" | "partially_paid" | "overdue" | "cancelled" | "refunded";
  paymentMethod?: "Stripe" | "PayPal" | "Square" | "Authorize.Net" | "Bank Transfer" | "Cash" | "Credit Note";
  paymentGateway?: string;
  transactionId?: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransactionRecord {
  id: number;
  transactionId: string;
  invoiceId: number;
  invoiceNumber: string;
  parentEmail: string;
  parentName: string;
  amount: number;
  paymentMethod: "Stripe" | "PayPal" | "Square" | "Authorize.Net" | "Bank Transfer" | "Cash" | "Credit Note";
  gateway: string;
  status: "succeeded" | "pending" | "failed" | "refunded";
  paymentDate: string;
  receiptUrl?: string;
  createdAt: string;
}

export interface DiscountRecord {
  id: number;
  code: string;
  type: "percentage" | "fixed_amount";
  value: number;
  category: "Coupon Code" | "Referral Discount" | "Sibling Discount" | "Corporate Discount" | "Scholarship" | "Manual Admin Discount";
  usageLimit?: number;
  timesUsed: number;
  validUntil?: string;
  status: "active" | "expired" | "disabled";
  createdAt: string;
}

export interface RefundRecord {
  id: number;
  refundNumber: string;
  invoiceId: number;
  invoiceNumber: string;
  parentEmail: string;
  amount: number;
  refundType: "Full Refund" | "Partial Refund" | "Credit Note" | "Package Credit Restoration";
  reason: string;
  status: "completed" | "processing";
  restoredPackageLessons?: number;
  processedAt: string;
}

export interface TutorPayrollRecord {
  id: number;
  payrollNumber: string;
  tutorId: number;
  tutorName: string;
  tutorEmail: string;
  billingPeriod: string;
  completedLessonsCount: number;
  totalHoursTaught: number;
  hourlyRate: number;
  grossPayout: number;
  aceRevenueGenerated: number;
  aceGrossMargin: number;
  status: "pending" | "approved" | "paid" | "rejected";
  paymentReference?: string;
  paidDate?: string;
  statementUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialAuditLogRecord {
  id: number;
  operationType: "Invoice Created" | "Invoice Edited" | "Payment Received" | "Refund Issued" | "Payroll Approved" | "Payroll Paid" | "Manual Adjustment" | "Discount Applied";
  amount: number;
  userRole: "admin" | "parent" | "tutor" | "system";
  userEmail: string;
  referenceNumber: string;
  details: string;
  timestamp: string;
}

export interface FinanceSettingsRecord {
  currency: string;
  currencySymbol: string;
  taxRatePercentage: number;
  invoicePrefix: string;
  paymentTermsDays: number;
  lateFeePercentage: number;
  defaultLessonPrice: number;
  packageDiscounts: {
    fiveLessons: number;
    tenLessons: number;
    twentyLessons: number;
  };
  defaultTutorHourlyRate: number;
  cancellationGraceHours: number;
  lateCancellationFeePercentage: number;
}

// Global persistent mock memory store for development fallback
const memoryTutors: TutorRecord[] = [
  {
    id: 101,
    fullName: "Dr. Alexander Wright",
    email: "a.wright@aceeducation.us",
    phone: "+1 (555) 234-5678",
    city: "Boston",
    state: "MA",
    country: "USA",
    zipCode: "02108",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    title: "Senior AP Mathematics & Physics Specialist",
    bio: "PhD in Applied Physics from MIT. Over 10 years of experience preparing high school students for AP Calculus BC, Physics C, and SAT Math.",
    linkedinUrl: "https://linkedin.com/in/dr-alexander-wright",
    totalExperienceYears: 10,
    degree: "Ph.D. Physics",
    major: "Applied Physics",
    institution: "MIT",
    graduationYear: 2016,
    previousInstitutions: "Phillips Andover Academy, Harvard Summer School Tutor",
    onlineExperienceYears: 7,
    gradeLevels: ["High School (9-12)", "College"],
    subjects: ["AP Calculus BC", "AP Physics C", "SAT Math", "Linear Algebra"],
    curriculums: ["AP", "IB Diploma", "US Common Core"],
    learningModes: ["Online", "In-Home"],
    availability: {
      Monday: ["15:00 - 20:00"],
      Tuesday: ["15:00 - 20:00"],
      Wednesday: ["15:00 - 20:00"],
      Thursday: ["15:00 - 20:00"],
      Saturday: ["10:00 - 16:00"],
    },
    expectedRate: 50.00,
    finalRate: 45.00,
    sellingPrice: 85.00,
    margin: 40.00,
    idType: "Driver's License",
    idDocumentUrl: "https://example.com/docs/id_wright.pdf",
    identityVerified: true,
    resumeUrl: "https://example.com/docs/resume_wright.pdf",
    certificateUrls: ["https://example.com/docs/cert_mit.pdf"],
    demoVideoUrl: "https://youtube.com/watch?v=sample123",
    digitalSignature: "Alexander Wright",
    termsAccepted: true,
    status: "approved",
    interviewScheduledAt: "2026-07-10T14:00:00Z",
    interviewNotes: "Outstanding subject mastery and pedagogical clarity. Highly engaging teaching style.",
    internalRemarks: "Top tier candidate for competitive STEM tutoring.",
    verificationChecklist: {
      idVerified: true,
      bgCheckPassed: true,
      educationVerified: true,
      demoVideoApproved: true,
    },
    aiSummary: "Candidate exhibits exceptional qualifications with a MIT PhD in Applied Physics. Proven track record in AP Calculus and Physics with 10 years experience. Highly recommended for premium high-school and college prep.",
    rating: 4.95,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 102,
    fullName: "Elena Rostova",
    email: "elena.r@aceeducation.us",
    phone: "+1 (555) 876-5432",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10021",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    title: "SAT / ACT Verbal & Literature Specialist",
    bio: "MA in English Literature from Columbia University. Specialized in SAT Reading/Writing strategy, AP Literature, and college application essays.",
    linkedinUrl: "https://linkedin.com/in/elena-rostova",
    totalExperienceYears: 6,
    degree: "M.A. English Literature",
    major: "English Literature",
    institution: "Columbia University",
    graduationYear: 2019,
    previousInstitutions: "Stuyvesant High School Writing Mentor",
    onlineExperienceYears: 5,
    gradeLevels: ["Middle School (6-8)", "High School (9-12)"],
    subjects: ["SAT Reading & Writing", "ACT English", "AP Literature", "College Essay Prep"],
    curriculums: ["AP", "US Common Core"],
    learningModes: ["Online"],
    availability: {
      Monday: ["16:00 - 21:00"],
      Wednesday: ["16:00 - 21:00"],
      Friday: ["16:00 - 20:00"],
      Sunday: ["12:00 - 18:00"],
    },
    expectedRate: 40.00,
    finalRate: 40.00,
    sellingPrice: 75.00,
    margin: 35.00,
    idType: "Passport",
    idDocumentUrl: "https://example.com/docs/id_elena.pdf",
    identityVerified: true,
    resumeUrl: "https://example.com/docs/resume_elena.pdf",
    certificateUrls: ["https://example.com/docs/cert_columbia.pdf"],
    demoVideoUrl: "https://loom.com/share/sample_elena",
    digitalSignature: "Elena Rostova",
    termsAccepted: true,
    status: "interview_scheduled",
    interviewScheduledAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    interviewNotes: "Candidate submitted comprehensive application. Scheduled initial interview session.",
    internalRemarks: "Strong essay coaching background.",
    verificationChecklist: {
      idVerified: true,
      bgCheckPassed: false,
      educationVerified: true,
      demoVideoApproved: true,
    },
    aiSummary: "Solid candidate with a Columbia MA in English Lit. Demonstrates deep familiarity with digital SAT Reading & Writing sections. Recommended for interview.",
    rating: 4.88,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const memoryAssignments: AssignmentRecord[] = [
  {
    id: 1,
    leadId: 10,
    tutorId: 101,
    studentName: "Ethan Harrison",
    parentName: "Marcus Harrison",
    parentEmail: "marcus.h@example.com",
    subject: "AP Calculus BC",
    gradeLevel: "High School (11th Grade)",
    learningMode: "Online",
    status: "accepted",
    tutorRate: 45.00,
    parentPrice: 85.00,
    margin: 40.00,
    notes: "Goal: Secure 5 on AP Calculus exam and build strong foundation for Multivariable Calculus.",
    assignedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 2,
    leadId: 11,
    tutorId: 101,
    studentName: "Sophia Chen",
    parentName: "David Chen",
    parentEmail: "david.chen@example.com",
    subject: "AP Physics C",
    gradeLevel: "High School (12th Grade)",
    learningMode: "Online",
    status: "pending",
    tutorRate: 45.00,
    parentPrice: 85.00,
    margin: 40.00,
    notes: "Requires intensive mechanics & electricity focus.",
    assignedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  }
];

const memoryLessons: LessonRecord[] = [
  {
    id: 1,
    assignmentId: 1,
    tutorId: 101,
    studentName: "Ethan Harrison",
    parentEmail: "marcus.h@example.com",
    studentEmail: "ethan.h@example.com",
    subject: "AP Calculus BC",
    scheduleType: "Weekly",
    learningMode: "Online",
    startTime: new Date(Date.now() + 3600000 * 2).toISOString(), // 2 hours from now
    endTime: new Date(Date.now() + 3600000 * 3.5).toISOString(),
    status: "confirmed",
    meetingUrl: "https://meet.aceeducation.us/room/ap-calc-wright-ethan",
    meetingInfo: {
      meetingUrl: "https://meet.aceeducation.us/room/ap-calc-wright-ethan",
      meetingId: "ACE-MEET-882103",
      password: "ACE-PASS-2026",
      sessionNotes: "Recording policy: DISABLED by default per ACE Privacy Policy.",
      recordingEnabled: false,
    },
    attendanceLogged: false,
    attendanceStatus: "Pending",
    timezone: "EST / Eastern Time",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    assignmentId: 1,
    tutorId: 101,
    studentName: "Ethan Harrison",
    parentEmail: "marcus.h@example.com",
    studentEmail: "ethan.h@example.com",
    subject: "AP Calculus BC",
    scheduleType: "Package",
    learningMode: "Online",
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 2 + 3600000 * 1.5).toISOString(),
    status: "completed",
    meetingUrl: "https://meet.aceeducation.us/room/ap-calc-wright-ethan",
    attendanceLogged: true,
    attendanceStatus: "Present",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 3,
    assignmentId: 1,
    tutorId: 101,
    studentName: "Ethan Harrison",
    parentEmail: "marcus.h@example.com",
    studentEmail: "ethan.h@example.com",
    subject: "AP Physics C",
    scheduleType: "Weekly",
    learningMode: "Online",
    startTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 4).toISOString(), // Tomorrow afternoon
    endTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 5.5).toISOString(),
    status: "scheduled",
    meetingUrl: "https://meet.aceeducation.us/room/ap-physics-wright-ethan",
    meetingInfo: {
      meetingUrl: "https://meet.aceeducation.us/room/ap-physics-wright-ethan",
      meetingId: "ACE-MEET-902314",
      password: "ACE-PASS-2026",
      sessionNotes: "Recording policy: DISABLED by default per ACE Privacy Policy.",
      recordingEnabled: false,
    },
    attendanceLogged: false,
    attendanceStatus: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    assignmentId: 2,
    tutorId: 102,
    studentName: "Sophia Chen",
    parentEmail: "david.chen@example.com",
    studentEmail: "sophia.c@example.com",
    subject: "AP Chemistry",
    scheduleType: "Assessment",
    learningMode: "Home Tuition",
    startTime: new Date(Date.now() + 86400000 * 2 + 3600000 * 2).toISOString(),
    endTime: new Date(Date.now() + 86400000 * 2 + 3600000 * 3.5).toISOString(),
    status: "scheduled",
    meetingUrl: "https://meet.aceeducation.us/room/ap-chem-jenkins-sophia",
    attendanceLogged: false,
    attendanceStatus: "Pending",
    createdAt: new Date().toISOString(),
  }
];

const memoryPackageSubscriptions: PackageSubscriptionRecord[] = [
  {
    id: 1,
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    packageType: "10 Lesson Package",
    totalLessons: 10,
    completedLessons: 4,
    remainingLessons: 6,
    price: 850,
    status: "active",
    startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
    expiryDate: new Date(Date.now() + 60 * 86400000).toISOString(),
  },
  {
    id: 2,
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    studentName: "Ethan Harrison",
    subject: "AP Physics C",
    packageType: "5 Lesson Package",
    totalLessons: 5,
    completedLessons: 4,
    remainingLessons: 1,
    price: 450,
    status: "active",
    startDate: new Date(Date.now() - 15 * 86400000).toISOString(),
    expiryDate: new Date(Date.now() + 45 * 86400000).toISOString(),
  }
];

const memoryRescheduleRequests: RescheduleRequestRecord[] = [
  {
    id: 1,
    lessonId: 3,
    requestedByRole: "parent",
    requestedByEmail: "marcus.h@example.com",
    reason: "Family engagement on Friday evening. Requesting Saturday morning 10 AM slot.",
    originalStartTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 4).toISOString(),
    originalEndTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 5.5).toISOString(),
    proposedStartTime: new Date(Date.now() + 86400000 * 2 + 3600000 * 10).toISOString(),
    proposedEndTime: new Date(Date.now() + 86400000 * 2 + 3600000 * 11.5).toISOString(),
    status: "pending_admin",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  }
];

const memoryCancellations: CancellationRecord[] = [
  {
    id: 1,
    lessonId: 4,
    requestedByRole: "tutor",
    requestedByEmail: "a.wright@aceeducation.us",
    reason: "Attending MIT Research Conference.",
    cancellationFee: 0,
    tutorCompensationAmount: 0,
    parentRefundAmount: 0,
    status: "approved",
    policyApplied: "> 24 Hours Notice: Lesson credit restored to student package with zero cancellation fee.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

const memoryBlackoutDates: BlackoutDateRecord[] = [
  {
    id: 1,
    entityType: "global_holiday",
    title: "National Academic Holiday",
    startDate: "2026-09-07T00:00:00.000Z",
    endDate: "2026-09-07T23:59:59.000Z",
    reason: "Official ACE Holiday - All teaching centers closed.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    entityType: "tutor",
    entityIdOrEmail: "101",
    title: "Dr. Wright Vacation / Symposium",
    startDate: "2026-08-15T00:00:00.000Z",
    endDate: "2026-08-18T23:59:59.000Z",
    reason: "Attending International Applied Physics Conference.",
    createdAt: new Date().toISOString(),
  }
];

const memoryWaitlist: WaitlistRecord[] = [
  {
    id: 1,
    tutorRequestId: 5,
    parentName: "Sarah Jenkins",
    parentEmail: "sarah.j@example.com",
    studentName: "Lucas Jenkins",
    subject: "AP Bio & IB Chemistry",
    gradeLevel: "10th Grade",
    preferredDays: ["Tuesday", "Thursday"],
    preferredTimes: "Evening (5PM-8PM)",
    learningMode: "Online",
    status: "waiting",
    suggestedTutorIds: [101, 102],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

const memoryAutomationLogs: AutomationLogRecord[] = [
  {
    id: 1,
    eventType: "24h Lesson Reminder Dispatched",
    message: "Automated 24h reminder notification sent to Ethan Harrison & Marcus Harrison for AP Calculus BC.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 2,
    eventType: "Package Balance Alert",
    message: "Low balance alert triggered: AP Physics C package for Ethan Harrison has 1 lesson remaining.",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
  }
];

const memoryInvoices: InvoiceRecord[] = [
  {
    id: 1,
    invoiceNumber: "ACE-INV-2026-001",
    issueDate: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0],
    dueDate: new Date(Date.now() - 16 * 86400000).toISOString().split("T")[0],
    parentName: "Marcus Harrison",
    parentEmail: "marcus.h@example.com",
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    serviceType: "Lesson Package",
    packageDetails: "10 Lesson Package (90 mins each)",
    lessonsIncluded: 10,
    lineItems: [
      { id: 1, description: "10 Lesson AP Calculus BC Elite Package @ $85.00/hr", quantity: 10, unitPrice: 85, total: 850 }
    ],
    subtotal: 850,
    discountCode: undefined,
    discountAmount: 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 850,
    paidAmount: 850,
    balanceDue: 0,
    status: "paid",
    paymentMethod: "Stripe",
    paymentGateway: "Stripe",
    transactionId: "tx_str_8849201",
    receiptUrl: "https://aceeducation.us/receipts/ACE-INV-2026-001.pdf",
    notes: "Payment received in full via Stripe Card Checkout.",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    invoiceNumber: "ACE-INV-2026-002",
    issueDate: new Date(Date.now() - 15 * 86400000).toISOString().split("T")[0],
    dueDate: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
    parentName: "Marcus Harrison",
    parentEmail: "marcus.h@example.com",
    studentName: "Ethan Harrison",
    subject: "AP Physics C",
    serviceType: "Lesson Package",
    packageDetails: "5 Lesson Package (90 mins each)",
    lessonsIncluded: 5,
    lineItems: [
      { id: 1, description: "5 Lesson AP Physics C Package @ $90.00/hr", quantity: 5, unitPrice: 90, total: 450 }
    ],
    subtotal: 450,
    discountCode: undefined,
    discountAmount: 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 450,
    paidAmount: 450,
    balanceDue: 0,
    status: "paid",
    paymentMethod: "Stripe",
    paymentGateway: "Stripe",
    transactionId: "tx_str_9920184",
    receiptUrl: "https://aceeducation.us/receipts/ACE-INV-2026-002.pdf",
    notes: "Payment processed via Stripe online gateway.",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: 3,
    invoiceNumber: "ACE-INV-2026-003",
    issueDate: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 12 * 86400000).toISOString().split("T")[0],
    parentName: "Marcus Harrison",
    parentEmail: "marcus.h@example.com",
    studentName: "Ethan Harrison",
    subject: "SAT Prep",
    serviceType: "Assessment Session",
    packageDetails: "Diagnostic Baseline & Strategy Plan",
    lessonsIncluded: 1,
    lineItems: [
      { id: 1, description: "Digital SAT Diagnostic Assessment & Advisory Report", quantity: 1, unitPrice: 150, total: 150 }
    ],
    subtotal: 150,
    discountCode: "ACEFALL2026",
    discountAmount: 15,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 135,
    paidAmount: 0,
    balanceDue: 135,
    status: "unpaid",
    paymentMethod: undefined,
    notes: "10% Early Bird Fall Coupon Code applied.",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 4,
    invoiceNumber: "ACE-INV-2026-004",
    issueDate: new Date(Date.now() - 20 * 86400000).toISOString().split("T")[0],
    dueDate: new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0],
    parentName: "David Chen",
    parentEmail: "david.chen@example.com",
    studentName: "Sophia Chen",
    subject: "AP Chemistry",
    serviceType: "Single Lesson",
    packageDetails: "Single 90-min Lesson",
    lessonsIncluded: 1,
    lineItems: [
      { id: 1, description: "AP Chemistry Individual Session", quantity: 1, unitPrice: 85, total: 85 }
    ],
    subtotal: 85,
    discountCode: undefined,
    discountAmount: 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 85,
    paidAmount: 0,
    balanceDue: 85,
    status: "overdue",
    notes: "Automated late reminder dispatched to client.",
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  }
];

const memoryPaymentTransactions: PaymentTransactionRecord[] = [
  {
    id: 1,
    transactionId: "tx_str_8849201",
    invoiceId: 1,
    invoiceNumber: "ACE-INV-2026-001",
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    amount: 850,
    paymentMethod: "Stripe",
    gateway: "Stripe",
    status: "succeeded",
    paymentDate: new Date(Date.now() - 30 * 86400000).toISOString(),
    receiptUrl: "https://aceeducation.us/receipts/ACE-INV-2026-001.pdf",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    transactionId: "tx_str_9920184",
    invoiceId: 2,
    invoiceNumber: "ACE-INV-2026-002",
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    amount: 450,
    paymentMethod: "Stripe",
    gateway: "Stripe",
    status: "succeeded",
    paymentDate: new Date(Date.now() - 15 * 86400000).toISOString(),
    receiptUrl: "https://aceeducation.us/receipts/ACE-INV-2026-002.pdf",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  }
];

const memoryDiscounts: DiscountRecord[] = [
  {
    id: 1,
    code: "ACEFALL2026",
    type: "percentage",
    value: 10,
    category: "Coupon Code",
    usageLimit: 100,
    timesUsed: 14,
    validUntil: "2026-11-30",
    status: "active",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    code: "SIBLING15",
    type: "percentage",
    value: 15,
    category: "Sibling Discount",
    usageLimit: 50,
    timesUsed: 6,
    validUntil: "2026-12-31",
    status: "active",
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 3,
    code: "REF-MARCUS",
    type: "fixed_amount",
    value: 50,
    category: "Referral Discount",
    usageLimit: 5,
    timesUsed: 2,
    validUntil: "2026-10-15",
    status: "active",
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 4,
    code: "CORP-BENEFIT",
    type: "percentage",
    value: 20,
    category: "Corporate Discount",
    usageLimit: 200,
    timesUsed: 28,
    validUntil: "2026-12-31",
    status: "active",
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  {
    id: 5,
    code: "ACE-SCHOLAR",
    type: "percentage",
    value: 50,
    category: "Scholarship",
    usageLimit: 10,
    timesUsed: 3,
    validUntil: "2027-06-30",
    status: "active",
    createdAt: new Date(Date.now() - 120 * 86400000).toISOString(),
  }
];

const memoryRefunds: RefundRecord[] = [
  {
    id: 1,
    refundNumber: "ACE-REF-1001",
    invoiceId: 4,
    invoiceNumber: "ACE-INV-2026-004",
    parentEmail: "david.chen@example.com",
    amount: 42.50,
    refundType: "Partial Refund",
    reason: "Tutor rescheduled lesson with < 24h notice per cancellation policy",
    status: "completed",
    restoredPackageLessons: 1,
    processedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  }
];

const memoryTutorPayrolls: TutorPayrollRecord[] = [
  {
    id: 1,
    payrollNumber: "ACE-PAY-101-2026-07",
    tutorId: 101,
    tutorName: "Dr. Alexander Wright",
    tutorEmail: "a.wright@aceeducation.us",
    billingPeriod: "July 2026",
    completedLessonsCount: 12,
    totalHoursTaught: 18.0,
    hourlyRate: 45.00,
    grossPayout: 810.00,
    aceRevenueGenerated: 1530.00,
    aceGrossMargin: 720.00,
    status: "approved",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 2,
    payrollNumber: "ACE-PAY-102-2026-07",
    tutorId: 102,
    tutorName: "Prof. Elena Rostova",
    tutorEmail: "e.rostova@aceeducation.us",
    billingPeriod: "July 2026",
    completedLessonsCount: 8,
    totalHoursTaught: 12.0,
    hourlyRate: 40.00,
    grossPayout: 480.00,
    aceRevenueGenerated: 900.00,
    aceGrossMargin: 420.00,
    status: "paid",
    paymentReference: "ACH-WIRE-992014",
    paidDate: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
    statementUrl: "https://aceeducation.us/statements/ACE-PAY-102-2026-07.pdf",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  }
];

const memoryFinancialAuditLogs: FinancialAuditLogRecord[] = [
  {
    id: 1,
    operationType: "Invoice Created",
    amount: 850,
    userRole: "admin",
    userEmail: "admin@aceeducation.us",
    referenceNumber: "ACE-INV-2026-001",
    details: "Generated invoice for Marcus Harrison (AP Calculus BC 10 Lesson Package)",
    timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    operationType: "Payment Received",
    amount: 850,
    userRole: "parent",
    userEmail: "marcus.h@example.com",
    referenceNumber: "tx_str_8849201",
    details: "Received $850.00 via Stripe Card for ACE-INV-2026-001",
    timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 3,
    operationType: "Payroll Approved",
    amount: 810,
    userRole: "admin",
    userEmail: "admin@aceeducation.us",
    referenceNumber: "ACE-PAY-101-2026-07",
    details: "Approved July 2026 payroll for Dr. Alexander Wright (18.0 hrs)",
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 4,
    operationType: "Discount Applied",
    amount: 15,
    userRole: "parent",
    userEmail: "marcus.h@example.com",
    referenceNumber: "ACEFALL2026",
    details: "10% coupon code applied on SAT Diagnostic invoice ACE-INV-2026-003",
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
  }
];

const memoryFinanceSettings: FinanceSettingsRecord = {
  currency: "USD",
  currencySymbol: "$",
  taxRatePercentage: 0,
  invoicePrefix: "ACE-INV",
  paymentTermsDays: 14,
  lateFeePercentage: 2.5,
  defaultLessonPrice: 85.00,
  packageDiscounts: {
    fiveLessons: 10,
    tenLessons: 15,
    twentyLessons: 20,
  },
  defaultTutorHourlyRate: 45.00,
  cancellationGraceHours: 24,
  lateCancellationFeePercentage: 50,
};

const memoryLessonNotes: LessonNoteRecord[] = [
  {
    id: 1,
    lessonId: 2,
    tutorId: 101,
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    summary: "Covered Integration by Parts and Taylor Series convergence tests. Ethan showed excellent problem-solving velocity on complex definite integrals.",
    homeworkAssigned: "Complete Problem Set 4.2 (Questions 1-12) on Maclaurin Series.",
    studentProgress: "Exceeding Expectations",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

const memoryLessonRecords: StructuredLessonRecord[] = [
  {
    id: 1,
    lessonId: 2,
    tutorId: 101,
    tutorName: "Dr. Alexander Wright",
    studentName: "Ethan Harrison",
    studentId: 1,
    parentEmail: "marcus.h@example.com",
    subject: "AP Calculus BC",
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 2 + 3600000 * 1.5).toISOString(),
    attendance: "Present",
    lessonObjectives: [
      "Master the Integration by Parts formula for algebraic and logarithmic products",
      "Evaluate definite integrals using boundary conditions",
      "Determine radius and interval of convergence for Taylor and Maclaurin Series"
    ],
    topicsCovered: [
      "Integration by Parts (∫ u dv = uv - ∫ v du)",
      "Tabular Integration method for polynomial products",
      "Taylor Series expansion centered at x = a",
      "Ratio Test for Infinite Series Convergence"
    ],
    lessonSummary: "In-depth 90-minute session focusing on AP Calculus BC advanced integration strategies and power series. Ethan demonstrated excellent problem-solving speed and correctly solved challenging definite integrals with logarithmic components.",
    keyConceptsLearned: [
      "LIATE Rule for selecting u in Integration by Parts (Logarithmic, Inverse Trig, Algebraic, Trig, Exponential)",
      "Tabular method speeds up integration when u is a polynomial that differentiates to zero",
      "Maclaurin Series is a Taylor Series centered at a = 0",
      "Ratio Test L < 1 yields absolute convergence"
    ],
    resourcesShared: [
      {
        title: "AP Calculus BC Integration Formula Sheet.pdf",
        url: "https://aceeducation.us/resources/ap-calc-integration-formulas.pdf",
        description: "Official ACE quick-reference guide for integration rules and Taylor series expansions."
      },
      {
        title: "Maclaurin Series Practice Worksheet",
        url: "https://aceeducation.us/resources/maclaurin-practice-set.pdf",
        description: "Handpicked AP-level practice problems with step-by-step solutions."
      }
    ],
    homeworkAssigned: "Complete Problem Set 4.2 (Questions 1-12) on Maclaurin Series expansions and submit via Student Portal.",
    tutorFeedback: "Ethan showed outstanding analytical focus today. His execution on tabular integration was flawless. Moving forward, review the exact conditions where the Ratio Test is inconclusive (L = 1).",
    studentParticipation: "Active & Engaged (5/5 Stars)",
    aiGeneratedRevisionSummary: "AI REVISION BRIEF: To revise today's lesson, remember the LIATE mnemonic for integration by parts. For Taylor/Maclaurin series, practice writing out the first 4 non-zero terms and the general nth term. Pay special attention to testing endpoint convergence when finding the Interval of Convergence.",
    videoPolicy: {
      recordingEnabled: false,
      storageLocation: "Disabled by default per ACE Privacy Policy",
      autoExpiryDays: 30
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

const memoryPayments: PaymentRecord[] = [
  {
    id: 1,
    tutorId: 101,
    lessonId: 2,
    hours: 1.5,
    hourlyRate: 45.00,
    grossPayout: 67.50,
    status: "approved",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

const memoryAnnouncements: AnnouncementRecord[] = [
  {
    id: 1,
    title: "Fall Semester Teaching Schedule Update",
    content: "Please ensure your weekly availability slots are updated in your Tutor Dashboard prior to August 1st for optimal student matching.",
    targetRole: "tutor",
    author: "ACE Academic Director",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  }
];

const memorySupportTickets: SupportTicketRecord[] = [];

// ==========================================
// STUDENT LMS MEMORY SEED COLLECTIONS
// ==========================================
const memoryHomeworkSubmissions: HomeworkSubmission[] = [
  {
    id: 1,
    lessonRecordId: 1,
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    title: "Problem Set 4.2: Maclaurin & Taylor Series",
    description: "Solve questions 1-12 on Maclaurin Series convergence and radius of convergence calculation.",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: "Pending",
    fileUrls: [],
    tutorFeedback: "",
  },
  {
    id: 2,
    lessonRecordId: 2,
    studentName: "Ethan Harrison",
    subject: "AP Physics C",
    title: "Rotational Dynamics & Torque Analysis Lab Report",
    description: "Complete moment of inertia calculations for composite cylindrical rotors.",
    dueDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    submittedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    status: "Graded",
    fileUrls: [
      { name: "Ethan_Harrison_Physics_Rotational_Lab.pdf", url: "https://example.com/files/rotational-lab.pdf", size: "2.4 MB", type: "pdf" }
    ],
    submissionText: "Attached the full calculations along with free-body diagrams for the double pulley apparatus.",
    grade: "98/100 (A+)",
    tutorFeedback: "Outstanding rigor in error propagation analysis! Clear diagrams and thorough free-body derivations.",
    isLate: false,
  },
  {
    id: 3,
    studentName: "Ethan Harrison",
    subject: "SAT Prep",
    title: "Digital SAT Math Hard Difficulty Practice Set #3",
    description: "Complete Module 2 Math Section under timed conditions (35 minutes).",
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "Submitted",
    fileUrls: [
      { name: "SAT_Math_Hard_Set_EthanH.docx", url: "https://example.com/files/sat-math.docx", size: "1.1 MB", type: "docx" }
    ],
    submissionText: "Finished in 31 minutes. Flagged questions #18 and #21 for review with Dr. Wright.",
    tutorFeedback: "Under review by Dr. Wright.",
    isLate: false,
  }
];

const memoryQuizResults: QuizResult[] = [
  {
    id: 1,
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    quizTitle: "Integration Techniques & Taylor Polynomials",
    quizType: "Timed Quiz",
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    timeSpentMinutes: 18,
    feedback: "Exceptional speed and precision on power series expansion!",
  },
  {
    id: 2,
    studentName: "Ethan Harrison",
    subject: "AP Physics C",
    quizTitle: "Angular Momentum & Torque Concept Check",
    quizType: "MCQ",
    score: 10,
    totalQuestions: 10,
    percentage: 100,
    completedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    timeSpentMinutes: 12,
    feedback: "Perfect score on rotational kinematics mechanics!",
  },
  {
    id: 3,
    studentName: "Ethan Harrison",
    subject: "SAT Prep",
    quizTitle: "Advanced Algebra & Function Transformations",
    quizType: "Practice Test",
    score: 780,
    totalQuestions: 800,
    percentage: 97.5,
    completedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    timeSpentMinutes: 35,
    feedback: "Targeting top 1% percentile range.",
  }
];

const memoryStudentMilestones: StudentMilestone[] = [
  {
    id: 1,
    studentName: "Ethan Harrison",
    category: "Initial Assessment",
    title: "Diagnostic Baseline Assessment",
    subject: "AP Calculus BC",
    description: "Scored 84% on entry calculus diagnostic test demonstrating high readiness.",
    status: "Achieved",
    scoreOrProgress: "84% (Grade 11 Entry)",
    date: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 2,
    studentName: "Ethan Harrison",
    category: "Learning Goal",
    title: "AP Examination Score Target: 5",
    subject: "AP Calculus BC & Physics C",
    description: "Parent & Student Goal: Achieve top score 5 on May AP Exams with 90%+ diagnostic score.",
    status: "In Progress",
    scoreOrProgress: "Current Estimated Score: 5 (94%)",
    date: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
  {
    id: 3,
    studentName: "Ethan Harrison",
    category: "Skill Mastered",
    title: "Integration by Parts & Partial Fractions",
    subject: "AP Calculus BC",
    description: "Mastered tabular integration methods and improper integral convergence tests.",
    status: "Mastered",
    scoreOrProgress: "100% Mastery",
    date: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 4,
    studentName: "Ethan Harrison",
    category: "Exam Readiness",
    title: "AP Calculus BC National Exam Readiness",
    subject: "AP Calculus BC",
    description: "Demonstrated 95% proficiency on past College Board released FRQs.",
    status: "Mastered",
    scoreOrProgress: "95% Exam Ready",
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
  }
];

const memoryStudentAchievements: StudentAchievement[] = [
  {
    id: 1,
    studentName: "Ethan Harrison",
    badgeId: "first_lesson",
    title: "First Step to Mastery",
    description: "Completed first live instruction session on ACE Education platform.",
    iconName: "Award",
    category: "Attendance",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    studentName: "Ethan Harrison",
    badgeId: "perfect_attendance",
    title: "Punctuality Perfection",
    description: "Maintained 100% flawless attendance across all scheduled tutoring sessions.",
    iconName: "CheckCircle2",
    category: "Attendance",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 3,
    studentName: "Ethan Harrison",
    badgeId: "homework_champ",
    title: "Homework Champion",
    description: "Submitted 5 consecutive assignments on time with grades above 90%.",
    iconName: "FileText",
    category: "Homework",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 4,
    studentName: "Ethan Harrison",
    badgeId: "quiz_master",
    title: "Quiz Master Genius",
    description: "Achieved 95%+ score on advanced timed practice quiz.",
    iconName: "Zap",
    category: "Quizzes",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 5,
    studentName: "Ethan Harrison",
    badgeId: "study_streak",
    title: "7-Day Study Streak",
    description: "Engaged in learning, flashcards, or practice tests for 7 consecutive days.",
    iconName: "Flame",
    category: "Milestone",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 6,
    studentName: "Ethan Harrison",
    badgeId: "ap_scholar",
    title: "ACE AP Scholar",
    description: "Consistently scored in top 5% range in AP subject simulations.",
    iconName: "Star",
    category: "Milestone",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  }
];

const memoryLearningResources: LearningResourceItem[] = [
  {
    id: 1,
    subject: "AP Calculus BC",
    title: "Master Guide: Taylor & Maclaurin Series Formula Sheet",
    type: "PDF Notes",
    tutorName: "Dr. Alexander Wright",
    description: "Comprehensive summary of Taylor polynomial expansions, Lagrange error bounds, and convergence test cheatsheet.",
    url: "https://example.com/resources/ap-calculus-taylor-series.pdf",
    fileSize: "3.2 MB",
    uploadedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    tags: ["Series", "Calculus", "Formula Sheet"],
  },
  {
    id: 2,
    subject: "AP Calculus BC",
    title: "Improper Integrals & Integration by Parts Practice Problems",
    type: "Worksheet",
    tutorName: "Dr. Alexander Wright",
    description: "25 curated College Board style practice problems with detailed step-by-step solutions.",
    url: "https://example.com/resources/improper-integrals-worksheet.pdf",
    fileSize: "1.8 MB",
    uploadedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    tags: ["Integrals", "Practice Problems", "FRQ"],
  },
  {
    id: 3,
    subject: "AP Physics C",
    title: "Rotational Motion, Torque & Angular Momentum Slide Deck",
    type: "Slides",
    tutorName: "Prof. Sarah Jenkins",
    description: "Visual slides on rotational inertia, moment of inertia tensor, and angular momentum conservation.",
    url: "https://example.com/resources/rotational-motion-slides.pdf",
    fileSize: "5.4 MB",
    uploadedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    tags: ["Physics", "Rotational Dynamics", "Lecture Slides"],
  },
  {
    id: 4,
    subject: "SAT Prep",
    title: "Official Digital SAT Math Practice Exam 2026",
    type: "Practice Paper",
    tutorName: "Dr. Michael Chen",
    description: "Full-length adaptive SAT Math test simulation with answer key and skill alignment breakdown.",
    url: "https://example.com/resources/sat-math-exam-2026.pdf",
    fileSize: "4.1 MB",
    uploadedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    tags: ["SAT Math", "Practice Exam", "Timed Test"],
  }
];

// Phase 3: Parent & Family Management Memory Seed Records
const memoryStudents: StudentRecord[] = [
  {
    id: 1,
    parentEmail: "marcus.h@example.com",
    fullName: "Ethan Harrison",
    email: "ethan.h@example.com",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    dateOfBirth: "2008-05-14",
    gender: "Male",
    schoolName: "Boston Latin School",
    gradeLevel: "11th Grade",
    curriculum: "AP",
    subjects: ["AP Calculus BC", "AP Physics C"],
    learningGoals: "Prepare for AP exams in May and achieve 5 score on Calculus and Physics.",
    medicalNotes: "None",
    learningDifficulties: "None",
    preferredTutorGender: "No Preference",
    preferredTeachingMode: "Online",
    preferredLanguage: "English",
    emergencyContact: "Marcus Harrison (+1 555-019-2831)",
    parentNotes: "Ethan is highly motivated, prefers structured visual explanations.",
    status: "active",
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    parentEmail: "marcus.h@example.com",
    fullName: "Lily Harrison",
    email: "lily.h@example.com",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    dateOfBirth: "2011-09-22",
    gender: "Female",
    schoolName: "Winsor Middle School",
    gradeLevel: "8th Grade",
    curriculum: "US Common Core",
    subjects: ["Algebra 1", "Middle School Science"],
    learningGoals: "Build foundational algebra confidence before entering high school.",
    medicalNotes: "Mild asthma",
    learningDifficulties: "Needs extra encouragement with multi-step word problems",
    preferredTutorGender: "Female",
    preferredTeachingMode: "Online",
    preferredLanguage: "English",
    emergencyContact: "Marcus Harrison (+1 555-019-2831)",
    parentNotes: "Loves interactive quizzes and real-world examples.",
    status: "active",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const memoryTutorRequests: TutorRequestRecord[] = [
  {
    id: 1,
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    studentId: 1,
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    curriculum: "AP",
    gradeLevel: "11th Grade",
    learningMode: "Online",
    preferredDays: ["Monday", "Wednesday", "Friday"],
    preferredTimes: "16:00 - 18:00 EST",
    budget: 85,
    learningGoals: "Secure 5 in AP Calculus BC",
    preferredTutorGender: "No Preference",
    preferredLanguage: "English",
    additionalNotes: "Looking for top STEM educator with university background.",
    status: "Active",
    assignedTutorId: 101,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    parentEmail: "marcus.h@example.com",
    parentName: "Marcus Harrison",
    studentId: 2,
    studentName: "Lily Harrison",
    subject: "Algebra 1 Prep",
    curriculum: "US Common Core",
    gradeLevel: "8th Grade",
    learningMode: "Online",
    preferredDays: ["Tuesday", "Thursday"],
    preferredTimes: "17:00 - 18:30 EST",
    budget: 70,
    learningGoals: "Master linear equations and word problems",
    preferredTutorGender: "Female",
    preferredLanguage: "English",
    additionalNotes: "Patient tutor with middle school experience required.",
    status: "AI Matching",
    aiRecommendations: [
      { tutorId: 102, fullName: "Elena Rostova", matchScore: 94, reason: "Strong female educator with Columbia literature and quantitative reasoning experience." }
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const memoryMessages: MessageRecord[] = [
  {
    id: 1,
    senderEmail: "info@aceeducation.us",
    senderName: "ACE Academic Advisory",
    senderRole: "admin",
    receiverEmail: "marcus.h@example.com",
    receiverName: "Marcus Harrison",
    receiverRole: "parent",
    subject: "Welcome to ACE Education USA!",
    content: "Dear Marcus, welcome to ACE Education. Your lead academic coordinator is reviewing your AP Calculus request for Ethan. Dr. Alexander Wright has been assigned.",
    read: true,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 2,
    senderEmail: "a.wright@aceeducation.us",
    senderName: "Dr. Alexander Wright",
    senderRole: "tutor",
    receiverEmail: "marcus.h@example.com",
    receiverName: "Marcus Harrison",
    receiverRole: "parent",
    subject: "Ethan's First AP Calculus Progress Note",
    content: "Hi Marcus! Ethan completed our session on Integration by Parts today. He demonstrated great focus and solved advanced practice problems with high accuracy.",
    read: false,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  }
];

const memoryNotifications: NotificationRecord[] = [
  {
    id: 1,
    userEmail: "marcus.h@example.com",
    title: "Tutor Assigned",
    message: "Dr. Alexander Wright has been assigned for Ethan's AP Calculus BC course.",
    type: "tutor_assigned",
    link: "/portals/parent?tab=tutors",
    read: true,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 2,
    userEmail: "marcus.h@example.com",
    title: "Lesson Summary Available",
    message: "Dr. Alexander Wright posted a new lesson summary and homework for Ethan.",
    type: "lesson_summary",
    link: "/portals/parent?tab=lessons",
    read: false,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 3,
    userEmail: "marcus.h@example.com",
    title: "Invoice Generated",
    message: "Invoice INV-2026-002 ($255.00) is ready for upcoming tutoring sessions.",
    type: "invoice_generated",
    link: "/portals/parent?tab=billing",
    read: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  }
];

export const TutorStorage = {
  // Tutor Applications & Profiles
  getAllTutors: async (): Promise<TutorRecord[]> => {
    try {
      if (db && typeof db.select === "function") {
        const rows = await db.select().from(tutors);
        if (rows && rows.length > 0) return rows as TutorRecord[];
      }
    } catch (e) {
      console.warn("Drizzle query fallback to memory store", e);
    }
    return memoryTutors;
  },

  getTutorById: async (id: number): Promise<TutorRecord | null> => {
    const all = await TutorStorage.getAllTutors();
    return all.find(t => t.id === id) || null;
  },

  getTutorByEmail: async (email: string): Promise<TutorRecord | null> => {
    const all = await TutorStorage.getAllTutors();
    return all.find(t => t.email.toLowerCase() === email.toLowerCase()) || null;
  },

  createTutorApplication: async (data: Partial<TutorRecord>): Promise<TutorRecord> => {
    const newId = memoryTutors.length > 0 ? Math.max(...memoryTutors.map(t => t.id)) + 1 : 101;
    const expectedRate = Number(data.expectedRate) || 0;
    const finalRate = Number(data.finalRate) || expectedRate;
    const sellingPrice = Number(data.sellingPrice) || Math.round(finalRate * 1.75);
    const margin = sellingPrice - finalRate;

    const record: TutorRecord = {
      id: newId,
      fullName: data.fullName || "Applicant",
      email: data.email || "",
      phone: data.phone || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "USA",
      zipCode: data.zipCode || "",
      avatarUrl: data.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      title: data.title || "Tutor Candidate",
      bio: data.bio || "",
      linkedinUrl: data.linkedinUrl || "",
      totalExperienceYears: Number(data.totalExperienceYears) || 0,
      degree: data.degree || "",
      major: data.major || "",
      institution: data.institution || "",
      graduationYear: Number(data.graduationYear) || 2024,
      previousInstitutions: data.previousInstitutions || "",
      onlineExperienceYears: Number(data.onlineExperienceYears) || 0,
      gradeLevels: data.gradeLevels || [],
      subjects: data.subjects || [],
      curriculums: data.curriculums || [],
      learningModes: data.learningModes || ["Online"],
      availability: data.availability || { Monday: ["09:00 - 17:00"], Wednesday: ["09:00 - 17:00"], Friday: ["09:00 - 17:00"] },
      expectedRate,
      finalRate,
      sellingPrice,
      margin,
      idType: data.idType || "Passport",
      idDocumentUrl: data.idDocumentUrl || "",
      identityVerified: false,
      resumeUrl: data.resumeUrl || "",
      certificateUrls: data.certificateUrls || [],
      demoVideoUrl: data.demoVideoUrl || "",
      digitalSignature: data.digitalSignature || "",
      termsAccepted: Boolean(data.termsAccepted),
      status: "submitted",
      verificationChecklist: {
        idVerified: false,
        bgCheckPassed: false,
        educationVerified: false,
        demoVideoApproved: false,
      },
      rating: 5.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryTutors.unshift(record);

    try {
      if (db && typeof db.insert === "function") {
        await db.insert(tutors).values({
          fullName: record.fullName,
          email: record.email,
          phone: record.phone,
          city: record.city,
          state: record.state,
          country: record.country,
          zipCode: record.zipCode,
          avatarUrl: record.avatarUrl,
          title: record.title,
          bio: record.bio,
          linkedinUrl: record.linkedinUrl,
          totalExperienceYears: record.totalExperienceYears,
          degree: record.degree,
          major: record.major,
          institution: record.institution,
          graduationYear: record.graduationYear,
          previousInstitutions: record.previousInstitutions,
          onlineExperienceYears: record.onlineExperienceYears,
          gradeLevels: record.gradeLevels,
          subjects: record.subjects,
          curriculums: record.curriculums,
          learningModes: record.learningModes,
          availability: record.availability,
          expectedRate: record.expectedRate.toString(),
          finalRate: record.finalRate.toString(),
          sellingPrice: record.sellingPrice.toString(),
          margin: record.margin.toString(),
          idType: record.idType,
          idDocumentUrl: record.idDocumentUrl,
          resumeUrl: record.resumeUrl,
          certificateUrls: record.certificateUrls,
          demoVideoUrl: record.demoVideoUrl,
          digitalSignature: record.digitalSignature,
          termsAccepted: record.termsAccepted,
          status: record.status,
          verificationChecklist: record.verificationChecklist,
        });
      }
    } catch (e) {
      console.warn("Drizzle insert tutor fallback to memory", e);
    }

    return record;
  },

  updateTutor: async (id: number, updates: Partial<TutorRecord>): Promise<TutorRecord | null> => {
    const idx = memoryTutors.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const existing = memoryTutors[idx];
    const finalRate = updates.finalRate !== undefined ? Number(updates.finalRate) : existing.finalRate;
    const sellingPrice = updates.sellingPrice !== undefined ? Number(updates.sellingPrice) : existing.sellingPrice;
    const margin = sellingPrice - finalRate;

    const updated: TutorRecord = {
      ...existing,
      ...updates,
      finalRate,
      sellingPrice,
      margin,
      updatedAt: new Date().toISOString(),
    };

    memoryTutors[idx] = updated;
    return updated;
  },

  // Assignments
  getAssignmentsByTutor: async (tutorId: number): Promise<AssignmentRecord[]> => {
    return memoryAssignments.filter(a => a.tutorId === tutorId);
  },

  getAllAssignments: async (): Promise<AssignmentRecord[]> => {
    return memoryAssignments;
  },

  createAssignment: async (data: Omit<AssignmentRecord, "id" | "assignedAt">): Promise<AssignmentRecord> => {
    const newId = memoryAssignments.length > 0 ? Math.max(...memoryAssignments.map(a => a.id)) + 1 : 1;
    const margin = Number(data.parentPrice) - Number(data.tutorRate);
    const record: AssignmentRecord = {
      id: newId,
      ...data,
      margin,
      assignedAt: new Date().toISOString(),
    };
    memoryAssignments.unshift(record);
    return record;
  },

  updateAssignmentStatus: async (id: number, status: "pending" | "accepted" | "declined" | "cancelled"): Promise<AssignmentRecord | null> => {
    const assignment = memoryAssignments.find(a => a.id === id);
    if (!assignment) return null;
    assignment.status = status;

    // If accepted, auto-generate a scheduled lesson for this tutor and student
    if (status === "accepted") {
      const newLessonId = memoryLessons.length > 0 ? Math.max(...memoryLessons.map(l => l.id)) + 1 : 1;
      const startTime = new Date(Date.now() + 86400000 * 2).toISOString(); // 2 days later
      const endTime = new Date(Date.now() + 86400000 * 2 + 3600000 * 1.5).toISOString();

      memoryLessons.unshift({
        id: newLessonId,
        assignmentId: assignment.id,
        tutorId: assignment.tutorId,
        studentName: assignment.studentName,
        subject: assignment.subject,
        startTime,
        endTime,
        status: "scheduled",
        meetingUrl: `https://meet.aceeducation.us/room/${assignment.subject.toLowerCase().replace(/\s+/g, "-")}-${assignment.tutorId}`,
        attendanceLogged: false,
        createdAt: new Date().toISOString(),
      });
    }

    return assignment;
  },

  // Lessons
  getLessonsByTutor: async (tutorId: number): Promise<LessonRecord[]> => {
    return memoryLessons.filter(l => l.tutorId === tutorId);
  },

  logAttendance: async (lessonId: number, status: "completed" | "no_show" | "cancelled"): Promise<LessonRecord | null> => {
    const lesson = memoryLessons.find(l => l.id === lessonId);
    if (!lesson) return null;
    lesson.status = status;
    lesson.attendanceLogged = true;

    if (status === "completed") {
      // Auto-generate payment record for tutor
      const tutor = await TutorStorage.getTutorById(lesson.tutorId);
      const rate = tutor ? tutor.finalRate : 40.00;
      const hours = 1.5;
      const payout = hours * rate;

      memoryPayments.unshift({
        id: memoryPayments.length > 0 ? Math.max(...memoryPayments.map(p => p.id)) + 1 : 1,
        tutorId: lesson.tutorId,
        lessonId: lesson.id,
        hours,
        hourlyRate: rate,
        grossPayout: payout,
        status: "approved",
        createdAt: new Date().toISOString(),
      });
    }

    return lesson;
  },

  // Lesson Notes
  addLessonNote: async (data: Omit<LessonNoteRecord, "id" | "createdAt">): Promise<LessonNoteRecord> => {
    const newId = memoryLessonNotes.length > 0 ? Math.max(...memoryLessonNotes.map(n => n.id)) + 1 : 1;
    const note: LessonNoteRecord = {
      id: newId,
      ...data,
      createdAt: new Date().toISOString(),
    };
    memoryLessonNotes.unshift(note);
    return note;
  },

  getLessonNotesByTutor: async (tutorId: number): Promise<LessonNoteRecord[]> => {
    return memoryLessonNotes.filter(n => n.tutorId === tutorId);
  },

  // Structured Lesson Records
  getAllStructuredLessonRecords: async (): Promise<StructuredLessonRecord[]> => {
    return memoryLessonRecords;
  },

  getStructuredLessonRecordsByTutor: async (tutorId: number): Promise<StructuredLessonRecord[]> => {
    return memoryLessonRecords.filter(r => r.tutorId === tutorId);
  },

  getStructuredLessonRecordsByStudent: async (studentName: string): Promise<StructuredLessonRecord[]> => {
    const term = studentName.toLowerCase();
    return memoryLessonRecords.filter(r => r.studentName.toLowerCase().includes(term));
  },

  getStructuredLessonRecordsByParent: async (parentEmail: string): Promise<StructuredLessonRecord[]> => {
    return memoryLessonRecords.filter(r => r.parentEmail?.toLowerCase() === parentEmail.toLowerCase());
  },

  getStructuredLessonRecordByLessonId: async (lessonId: number): Promise<StructuredLessonRecord | null> => {
    return memoryLessonRecords.find(r => r.lessonId === lessonId) || null;
  },

  generateAIRevisionSummary: async (data: {
    subject: string;
    lessonSummary: string;
    topicsCovered: string[];
    keyConceptsLearned: string[];
  }): Promise<string> => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });
        const prompt = `
          You are an expert AI Learning Assistant at ACE Education.
          Generate a high-impact, inspiring 3-4 sentence AI Revision Summary for a student based on these lesson details:
          Subject: ${data.subject}
          Lesson Summary: ${data.lessonSummary}
          Topics Covered: ${(data.topicsCovered || []).join(", ")}
          Key Concepts: ${(data.keyConceptsLearned || []).join(", ")}
          
          Focus on key memory anchors, key steps, and actionable review tips.
        `;
        const res = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });
        if (res.text) return res.text.trim();
      }
    } catch (err) {
      console.warn("AI Revision Summary generation fallback:", err);
    }

    const topicsStr = (data.topicsCovered && data.topicsCovered.length > 0) ? data.topicsCovered.slice(0, 2).join(" and ") : "core lesson topics";
    const keyConceptStr = (data.keyConceptsLearned && data.keyConceptsLearned.length > 0) ? data.keyConceptsLearned[0] : "key formulas";
    return `AI REVISION BRIEF: Key focus areas for ${data.subject}: Thoroughly review ${topicsStr}. Practice applying ${keyConceptStr} and re-solve assigned practice problems before the next session.`;
  },

  saveStructuredLessonRecord: async (data: Partial<StructuredLessonRecord> & { lessonId: number; tutorId: number; subject: string; lessonSummary: string }): Promise<StructuredLessonRecord> => {
    const existingIdx = memoryLessonRecords.findIndex(r => r.lessonId === data.lessonId);
    
    let aiSummary = data.aiGeneratedRevisionSummary;
    if (!aiSummary || aiSummary.trim() === "") {
      aiSummary = await TutorStorage.generateAIRevisionSummary({
        subject: data.subject,
        lessonSummary: data.lessonSummary,
        topicsCovered: data.topicsCovered || [],
        keyConceptsLearned: data.keyConceptsLearned || [],
      });
    }

    const videoPolicy = data.videoPolicy || {
      recordingEnabled: false,
      storageLocation: "Disabled by default per ACE Privacy Policy",
      autoExpiryDays: 30,
    };

    const newRecord: StructuredLessonRecord = {
      id: existingIdx >= 0 ? memoryLessonRecords[existingIdx].id : (memoryLessonRecords.length > 0 ? Math.max(...memoryLessonRecords.map(r => r.id)) + 1 : 1),
      lessonId: data.lessonId,
      tutorId: data.tutorId,
      tutorName: data.tutorName || "Assigned Tutor",
      studentName: data.studentName || "Student",
      studentId: data.studentId || 1,
      parentEmail: data.parentEmail || "marcus.h@example.com",
      subject: data.subject,
      startTime: data.startTime || new Date().toISOString(),
      endTime: data.endTime || new Date(Date.now() + 5400000).toISOString(),
      attendance: data.attendance || "Present",
      lessonObjectives: data.lessonObjectives || ["Master core subject objectives"],
      topicsCovered: data.topicsCovered || ["Key topic review"],
      lessonSummary: data.lessonSummary,
      keyConceptsLearned: data.keyConceptsLearned || ["Primary concepts"],
      resourcesShared: data.resourcesShared || [],
      homeworkAssigned: data.homeworkAssigned || "No homework assigned.",
      tutorFeedback: data.tutorFeedback || "Great progress made during the lesson.",
      studentParticipation: data.studentParticipation || "Active & Engaged (5/5 Stars)",
      aiGeneratedRevisionSummary: aiSummary,
      videoPolicy,
      createdAt: existingIdx >= 0 ? memoryLessonRecords[existingIdx].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      memoryLessonRecords[existingIdx] = newRecord;
    } else {
      memoryLessonRecords.unshift(newRecord);
    }

    try {
      if (db && typeof db.insert === "function") {
        await db.insert(lessonRecords).values({
          lessonId: newRecord.lessonId,
          tutorId: newRecord.tutorId,
          tutorName: newRecord.tutorName,
          studentName: newRecord.studentName,
          studentId: newRecord.studentId,
          parentEmail: newRecord.parentEmail,
          subject: newRecord.subject,
          startTime: new Date(newRecord.startTime),
          endTime: new Date(newRecord.endTime),
          attendance: newRecord.attendance,
          lessonObjectives: newRecord.lessonObjectives,
          topicsCovered: newRecord.topicsCovered,
          lessonSummary: newRecord.lessonSummary,
          keyConceptsLearned: newRecord.keyConceptsLearned,
          resourcesShared: newRecord.resourcesShared,
          homeworkAssigned: newRecord.homeworkAssigned,
          tutorFeedback: newRecord.tutorFeedback,
          studentParticipation: newRecord.studentParticipation,
          aiGeneratedRevisionSummary: newRecord.aiGeneratedRevisionSummary,
          videoPolicy: newRecord.videoPolicy,
        });
      }
    } catch (e) {
      console.warn("Drizzle insert lessonRecord fallback to memory", e);
    }

    return newRecord;
  },

  // Payments
  getPaymentsByTutor: async (tutorId: number): Promise<PaymentRecord[]> => {
    return memoryPayments.filter(p => p.tutorId === tutorId);
  },

  // Announcements
  getAnnouncements: async (): Promise<AnnouncementRecord[]> => {
    return memoryAnnouncements;
  },

  createAnnouncement: async (title: string, content: string, author = "ACE Admin"): Promise<AnnouncementRecord> => {
    const newId = memoryAnnouncements.length > 0 ? Math.max(...memoryAnnouncements.map(a => a.id)) + 1 : 1;
    const record: AnnouncementRecord = {
      id: newId,
      title,
      content,
      targetRole: "tutor",
      author,
      createdAt: new Date().toISOString(),
    };
    memoryAnnouncements.unshift(record);
    return record;
  },

  // Support Tickets
  createSupportTicket: async (userEmail: string, subject: string, message: string): Promise<SupportTicketRecord> => {
    const newId = memorySupportTickets.length > 0 ? Math.max(...memorySupportTickets.map(s => s.id)) + 1 : 1;
    const ticket: SupportTicketRecord = {
      id: newId,
      userEmail,
      userRole: "tutor",
      subject,
      message,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    memorySupportTickets.unshift(ticket);
    return ticket;
  },

  getSupportTicketsByUser: async (userEmail: string): Promise<SupportTicketRecord[]> => {
    return memorySupportTickets.filter(s => s.userEmail.toLowerCase() === userEmail.toLowerCase());
  },

  // ==========================================
  // PHASE 3: PARENT & FAMILY MANAGEMENT METHODS
  // ==========================================

  // Students
  getStudentsByParent: async (parentEmail: string): Promise<StudentRecord[]> => {
    return memoryStudents.filter(s => s.parentEmail.toLowerCase() === parentEmail.toLowerCase() && s.status !== "archived" && !s.deletedAt);
  },

  getStudentById: async (id: number): Promise<StudentRecord | null> => {
    return memoryStudents.find(s => s.id === id && !s.deletedAt) || null;
  },

  createStudent: async (data: Partial<StudentRecord>): Promise<StudentRecord> => {
    const newId = memoryStudents.length > 0 ? Math.max(...memoryStudents.map(s => s.id)) + 1 : 1;
    const student: StudentRecord = {
      id: newId,
      parentEmail: data.parentEmail || "marcus.h@example.com",
      fullName: data.fullName || "Student",
      email: data.email || "",
      photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      dateOfBirth: data.dateOfBirth || "",
      gender: data.gender || "Not Specified",
      schoolName: data.schoolName || "",
      gradeLevel: data.gradeLevel || "K-12",
      curriculum: data.curriculum || "US Common Core",
      subjects: data.subjects || [],
      learningGoals: data.learningGoals || "",
      medicalNotes: data.medicalNotes || "",
      learningDifficulties: data.learningDifficulties || "",
      preferredTutorGender: data.preferredTutorGender || "No Preference",
      preferredTeachingMode: data.preferredTeachingMode || "Online",
      preferredLanguage: data.preferredLanguage || "English",
      emergencyContact: data.emergencyContact || "",
      parentNotes: data.parentNotes || "",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStudents.unshift(student);
    return student;
  },

  updateStudent: async (id: number, data: Partial<StudentRecord>): Promise<StudentRecord | null> => {
    const idx = memoryStudents.findIndex(s => s.id === id);
    if (idx === -1) return null;
    const existing = memoryStudents[idx];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    memoryStudents[idx] = updated;
    return updated;
  },

  deleteStudent: async (id: number): Promise<boolean> => {
    const idx = memoryStudents.findIndex(s => s.id === id);
    if (idx === -1) return false;
    memoryStudents[idx].status = "archived";
    memoryStudents[idx].deletedAt = new Date().toISOString();
    return true;
  },

  // Tutor Requests
  getTutorRequestsByParent: async (parentEmail: string): Promise<TutorRequestRecord[]> => {
    return memoryTutorRequests.filter(r => r.parentEmail.toLowerCase() === parentEmail.toLowerCase() && !r.deletedAt);
  },

  getAllTutorRequests: async (): Promise<TutorRequestRecord[]> => {
    return memoryTutorRequests.filter(r => !r.deletedAt);
  },

  createTutorRequest: async (data: Partial<TutorRequestRecord>): Promise<TutorRequestRecord> => {
    const newId = memoryTutorRequests.length > 0 ? Math.max(...memoryTutorRequests.map(r => r.id)) + 1 : 1;
    
    // Auto AI Tutor Matching Logic
    const allApprovedTutors = memoryTutors.filter(t => t.status === "approved");
    const aiRecs = allApprovedTutors.map(t => {
      let score = 75;
      const tSubjects = t.subjects || [];
      if (data.subject && tSubjects.some(s => s.toLowerCase().includes(data.subject!.toLowerCase()))) {
        score += 15;
      }
      if (data.curriculum && (t.curriculums || []).some(c => c.toLowerCase().includes(data.curriculum!.toLowerCase()))) {
        score += 10;
      }
      return {
        tutorId: t.id,
        fullName: t.fullName,
        matchScore: Math.min(score, 98),
        reason: `${t.title} - ${t.degree} (${t.totalExperienceYears} yrs experience)`,
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

    const record: TutorRequestRecord = {
      id: newId,
      parentEmail: data.parentEmail || "marcus.h@example.com",
      parentName: data.parentName || "Parent",
      studentId: data.studentId,
      studentName: data.studentName || "Student",
      subject: data.subject || "General Tutoring",
      curriculum: data.curriculum || "US Common Core",
      gradeLevel: data.gradeLevel || "K-12",
      learningMode: data.learningMode || "Online",
      preferredDays: data.preferredDays || ["Monday", "Wednesday"],
      preferredTimes: data.preferredTimes || "Flexible",
      budget: Number(data.budget) || 75,
      learningGoals: data.learningGoals || "",
      preferredTutorGender: data.preferredTutorGender || "No Preference",
      preferredLanguage: data.preferredLanguage || "English",
      additionalNotes: data.additionalNotes || "",
      status: "AI Matching",
      aiRecommendations: aiRecs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryTutorRequests.unshift(record);

    // Create a real Lead record for Admin sales sync
    const leadRecord = {
      parentName: record.parentName,
      studentName: record.studentName,
      email: record.parentEmail,
      subject: record.subject,
      curriculum: record.curriculum,
      gradeLevel: record.gradeLevel,
      learningMode: record.learningMode,
      source: "Parent Portal Tutoring Request",
      status: "new",
      notes: record.additionalNotes,
    };
    
    // Also generate notification for parent
    await TutorStorage.createNotification(
      record.parentEmail,
      "Tutoring Request Received",
      `Your tutoring request for ${record.studentName} (${record.subject}) has been submitted and AI matching is underway.`,
      "tutor_assigned",
      "/portals/parent?tab=requests"
    );

    return record;
  },

  updateTutorRequest: async (id: number, updates: Partial<TutorRequestRecord>): Promise<TutorRequestRecord | null> => {
    const idx = memoryTutorRequests.findIndex(r => r.id === id);
    if (idx === -1) return null;
    const existing = memoryTutorRequests[idx];
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    memoryTutorRequests[idx] = updated;
    return updated;
  },

  // Invoices & Billing
  getInvoicesByParent: async (parentEmail: string): Promise<InvoiceRecord[]> => {
    return memoryInvoices.filter(i => i.parentEmail.toLowerCase() === parentEmail.toLowerCase());
  },

  payInvoice: async (id: number): Promise<InvoiceRecord | null> => {
    const inv = memoryInvoices.find(i => i.id === id);
    if (!inv) return null;
    inv.status = "paid";
    inv.paidAt = new Date().toISOString();

    await TutorStorage.createNotification(
      inv.parentEmail,
      "Payment Received",
      `Thank you! Payment of $${((inv.totalAmount ?? inv.amount) || 0).toFixed(2)} for Invoice ${inv.invoiceNumber} has been received.`,
      "payment_received",
      "/portals/parent?tab=billing"
    );

    return inv;
  },

  // Internal Messaging
  getMessagesForUser: async (userEmail: string): Promise<MessageRecord[]> => {
    return memoryMessages.filter(
      m => m.senderEmail.toLowerCase() === userEmail.toLowerCase() || m.receiverEmail.toLowerCase() === userEmail.toLowerCase()
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  sendMessage: async (data: Partial<MessageRecord>): Promise<MessageRecord> => {
    const newId = memoryMessages.length > 0 ? Math.max(...memoryMessages.map(m => m.id)) + 1 : 1;
    const msg: MessageRecord = {
      id: newId,
      senderEmail: data.senderEmail || "marcus.h@example.com",
      senderName: data.senderName || "User",
      senderRole: data.senderRole || "parent",
      receiverEmail: data.receiverEmail || "info@aceeducation.us",
      receiverName: data.receiverName || "ACE Support",
      receiverRole: data.receiverRole || "admin",
      subject: data.subject || "General Inquiry",
      content: data.content || "",
      read: false,
      createdAt: new Date().toISOString(),
    };
    memoryMessages.unshift(msg);

    // Generate notification for receiver
    await TutorStorage.createNotification(
      msg.receiverEmail,
      `New Message from ${msg.senderName}`,
      msg.content.slice(0, 100) + "...",
      "general",
      "/portals/parent?tab=messages"
    );

    return msg;
  },

  // Notifications
  getNotificationsForUser: async (userEmail: string): Promise<NotificationRecord[]> => {
    return memoryNotifications.filter(n => n.userEmail.toLowerCase() === userEmail.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  markNotificationRead: async (id: number): Promise<boolean> => {
    const notif = memoryNotifications.find(n => n.id === id);
    if (!notif) return false;
    notif.read = true;
    return true;
  },

  createNotification: async (userEmail: string, title: string, message: string, type = "general", link?: string): Promise<NotificationRecord> => {
    const newId = memoryNotifications.length > 0 ? Math.max(...memoryNotifications.map(n => n.id)) + 1 : 1;
    const notif: NotificationRecord = {
      id: newId,
      userEmail,
      title,
      message,
      type,
      link,
      read: false,
      createdAt: new Date().toISOString(),
    };
    memoryNotifications.unshift(notif);
    return notif;
  },

  // Assigned Tutors for Parents
  getAssignedTutorsByParent: async (parentEmail: string): Promise<Array<{ tutor: TutorRecord; assignment: AssignmentRecord }>> => {
    const parentAssignments = memoryAssignments.filter(a => a.parentEmail.toLowerCase() === parentEmail.toLowerCase() && a.status === "accepted");
    const result: Array<{ tutor: TutorRecord; assignment: AssignmentRecord }> = [];

    for (const assign of parentAssignments) {
      const tutor = await TutorStorage.getTutorById(assign.tutorId);
      if (tutor) {
        result.push({ tutor, assignment: assign });
      }
    }
    return result;
  },

  // Lessons for Parents
  getLessonsByParent: async (parentEmail: string): Promise<Array<LessonRecord & { note?: LessonNoteRecord }>> => {
    const parentAssignments = memoryAssignments.filter(a => a.parentEmail.toLowerCase() === parentEmail.toLowerCase());
    const assignmentIds = new Set(parentAssignments.map(a => a.id));

    const parentLessons = memoryLessons.filter(l => l.assignmentId && assignmentIds.has(l.assignmentId));
    
    return parentLessons.map(l => {
      const note = memoryLessonNotes.find(n => n.lessonId === l.id);
      return { ...l, note };
    });
  },

  // Parent Dashboard Summary
  getParentDashboardData: async (parentEmail: string) => {
    const children = await TutorStorage.getStudentsByParent(parentEmail);
    const requests = await TutorStorage.getTutorRequestsByParent(parentEmail);
    const assignedTutors = await TutorStorage.getAssignedTutorsByParent(parentEmail);
    const lessonsList = await TutorStorage.getLessonsByParent(parentEmail);
    const invoicesList = await TutorStorage.getInvoicesByParent(parentEmail);
    const notifs = await TutorStorage.getNotificationsForUser(parentEmail);

    const upcomingLessons = lessonsList.filter(l => l.status === "scheduled" && new Date(l.startTime).getTime() > Date.now());
    const recentSummaries = lessonsList.filter(l => l.note).map(l => ({ lesson: l, note: l.note! }));
    
    // Fetch structured lesson records for permanent synchronization
    let structuredRecords = await TutorStorage.getStructuredLessonRecordsByParent(parentEmail);
    if (!structuredRecords || structuredRecords.length === 0) {
      structuredRecords = await TutorStorage.getAllStructuredLessonRecords();
    }

    const pendingInvoices = invoicesList.filter(i => i.status === "pending");
    const totalOutstanding = pendingInvoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
    
    // Extract homework due from lesson notes / structured records
    const homeworkDue = structuredRecords
      .filter(r => r.homeworkAssigned && r.homeworkAssigned.trim() !== "" && r.homeworkAssigned !== "No homework assigned.")
      .map(r => ({
        id: r.id,
        studentName: r.studentName,
        subject: r.subject,
        homework: r.homeworkAssigned,
        date: r.startTime,
      }));

    return {
      parentEmail,
      children,
      tutorRequests: requests,
      activeTutorsCount: assignedTutors.length,
      assignedTutors,
      upcomingLessons,
      recentSummaries,
      structuredLessonRecords: structuredRecords,
      homeworkDue,
      notifications: notifs,
      unreadNotificationsCount: notifs.filter(n => !n.read).length,
      pendingInvoices,
      totalOutstanding,
    };
  },

  // ==========================================
  // STUDENT LMS METHODS
  // ==========================================
  getStudentHomeworkSubmissions: async (studentName: string): Promise<HomeworkSubmission[]> => {
    return memoryHomeworkSubmissions.filter(s => s.studentName.toLowerCase() === studentName.toLowerCase());
  },

  submitHomework: async (data: {
    homeworkId?: number;
    studentName: string;
    subject: string;
    title: string;
    description?: string;
    submissionText?: string;
    files?: Array<{ name: string; url: string; size: string; type: string }>;
  }): Promise<HomeworkSubmission> => {
    let existing = data.homeworkId ? memoryHomeworkSubmissions.find(h => h.id === data.homeworkId) : null;
    const now = new Date().toISOString();

    if (existing) {
      existing.status = "Submitted";
      existing.submittedAt = now;
      if (data.submissionText) existing.submissionText = data.submissionText;
      if (data.files && data.files.length > 0) {
        existing.fileUrls = [...existing.fileUrls, ...data.files];
      }
      // Check if late
      if (existing.dueDate && new Date(now) > new Date(existing.dueDate)) {
        existing.isLate = true;
        existing.status = "Late";
      }
      return existing;
    } else {
      const newId = memoryHomeworkSubmissions.length > 0 ? Math.max(...memoryHomeworkSubmissions.map(h => h.id)) + 1 : 1;
      const sub: HomeworkSubmission = {
        id: newId,
        studentName: data.studentName,
        subject: data.subject,
        title: data.title,
        description: data.description || "Self-submitted assignment",
        dueDate: now,
        submittedAt: now,
        status: "Submitted",
        fileUrls: data.files || [],
        submissionText: data.submissionText || "",
        tutorFeedback: "Under tutor review",
      };
      memoryHomeworkSubmissions.unshift(sub);

      // Trigger notification to tutor
      await TutorStorage.createNotification(
        "tutor.wright@aceeducation.us",
        `Homework Submitted by ${data.studentName}`,
        `${data.studentName} submitted "${data.title}" for ${data.subject}.`,
        "homework_posted",
        "/portals/tutor?tab=homework"
      );

      return sub;
    }
  },

  getStudentQuizResults: async (studentName: string): Promise<QuizResult[]> => {
    return memoryQuizResults.filter(q => q.studentName.toLowerCase() === studentName.toLowerCase());
  },

  saveQuizResult: async (data: Omit<QuizResult, "id" | "completedAt">): Promise<QuizResult> => {
    const newId = memoryQuizResults.length > 0 ? Math.max(...memoryQuizResults.map(q => q.id)) + 1 : 1;
    const res: QuizResult = {
      ...data,
      id: newId,
      completedAt: new Date().toISOString(),
    };
    memoryQuizResults.unshift(res);

    // Auto-unlock achievements if high score
    if (res.percentage >= 90) {
      await TutorStorage.unlockAchievement(data.studentName, "quiz_master");
    }

    return res;
  },

  getStudentMilestones: async (studentName: string): Promise<StudentMilestone[]> => {
    return memoryStudentMilestones.filter(m => m.studentName.toLowerCase() === studentName.toLowerCase());
  },

  addStudentMilestone: async (data: Omit<StudentMilestone, "id" | "date">): Promise<StudentMilestone> => {
    const newId = memoryStudentMilestones.length > 0 ? Math.max(...memoryStudentMilestones.map(m => m.id)) + 1 : 1;
    const mile: StudentMilestone = {
      ...data,
      id: newId,
      date: new Date().toISOString(),
    };
    memoryStudentMilestones.unshift(mile);
    return mile;
  },

  getStudentAchievements: async (studentName: string): Promise<StudentAchievement[]> => {
    return memoryStudentAchievements.filter(a => a.studentName.toLowerCase() === studentName.toLowerCase());
  },

  unlockAchievement: async (studentName: string, badgeId: string): Promise<boolean> => {
    const badge = memoryStudentAchievements.find(
      a => a.studentName.toLowerCase() === studentName.toLowerCase() && a.badgeId === badgeId
    );
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toISOString();
      
      await TutorStorage.createNotification(
        "ethan.h@example.com",
        `🏆 Achievement Unlocked: ${badge.title}`,
        `Congratulations! You earned the "${badge.title}" badge: ${badge.description}`,
        "general"
      );
      return true;
    }
    return false;
  },

  getLearningResources: async (subjectFilter?: string): Promise<LearningResourceItem[]> => {
    if (subjectFilter && subjectFilter !== "all") {
      return memoryLearningResources.filter(r => r.subject.toLowerCase() === subjectFilter.toLowerCase());
    }
    return memoryLearningResources;
  },

  addLearningResource: async (data: Omit<LearningResourceItem, "id" | "uploadedAt">): Promise<LearningResourceItem> => {
    const newId = memoryLearningResources.length > 0 ? Math.max(...memoryLearningResources.map(r => r.id)) + 1 : 1;
    const item: LearningResourceItem = {
      ...data,
      id: newId,
      uploadedAt: new Date().toISOString(),
    };
    memoryLearningResources.unshift(item);
    return item;
  },

  getStudentDashboardData: async (studentName = "Ethan Harrison") => {
    const records = await TutorStorage.getStructuredLessonRecordsByStudent(studentName);
    const homework = await TutorStorage.getStudentHomeworkSubmissions(studentName);
    const quizzes = await TutorStorage.getStudentQuizResults(studentName);
    const milestones = await TutorStorage.getStudentMilestones(studentName);
    const achievements = await TutorStorage.getStudentAchievements(studentName);
    const resources = await TutorStorage.getLearningResources();
    const notifs = await TutorStorage.getNotificationsForUser("ethan.h@example.com");
    const msgs = await TutorStorage.getMessagesForUser("ethan.h@example.com");

    // Extract subjects & calculate stats
    const assignedSubjects = [
      {
        name: "AP Calculus BC",
        tutor: "Dr. Alexander Wright",
        curriculum: "AP (Advanced Placement)",
        gradeLevel: "11th Grade",
        learningProgress: 94,
        attendance: 100,
        lastLesson: "July 20, 2026",
        nextLesson: "July 24, 2026 at 4:00 PM",
        currentTopic: "Maclaurin Series & Lagrange Error Bound",
        resourcesCount: resources.filter(r => r.subject === "AP Calculus BC").length,
        homeworkStatus: homework.find(h => h.subject === "AP Calculus BC" && h.status === "Pending") ? "1 Assignment Pending" : "All Caught Up",
      },
      {
        name: "AP Physics C",
        tutor: "Prof. Sarah Jenkins",
        curriculum: "AP (Advanced Placement)",
        gradeLevel: "11th Grade",
        learningProgress: 91,
        attendance: 100,
        lastLesson: "July 18, 2026",
        nextLesson: "July 25, 2026 at 5:30 PM",
        currentTopic: "Rotational Dynamics & Angular Momentum",
        resourcesCount: resources.filter(r => r.subject === "AP Physics C").length,
        homeworkStatus: "Graded (98/100)",
      },
      {
        name: "SAT Prep",
        tutor: "Dr. Michael Chen",
        curriculum: "College Board Digital SAT",
        gradeLevel: "11th Grade",
        learningProgress: 96,
        attendance: 100,
        lastLesson: "July 15, 2026",
        nextLesson: "July 23, 2026 at 3:00 PM",
        currentTopic: "Module 2 Math Hard Section Strategy",
        resourcesCount: resources.filter(r => r.subject === "SAT Prep").length,
        homeworkStatus: "Submitted (Under Review)",
      }
    ];

    const totalSessions = records.length || 12;
    const presentSessions = records.filter(r => r.attendance === "Present" || !r.attendance).length || 12;
    const attendancePercentage = Math.round((presentSessions / totalSessions) * 100);

    const upcomingLessons = [
      {
        id: 101,
        subject: "AP Calculus BC",
        tutorName: "Dr. Alexander Wright",
        startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 2 + 3600000 * 1.5).toISOString(),
        meetingUrl: "https://meet.aceeducation.us/room/ap-calc-wright-ethan",
        status: "scheduled",
        topic: "Taylor Polynomials & Convergence Tests",
      },
      {
        id: 102,
        subject: "SAT Prep",
        tutorName: "Dr. Michael Chen",
        startTime: new Date(Date.now() + 86400000 * 1).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 1).toISOString(),
        meetingUrl: "https://meet.aceeducation.us/room/sat-math-chen-ethan",
        status: "scheduled",
        topic: "Hard Digital SAT Math Problem Solving",
      },
      {
        id: 103,
        subject: "AP Physics C",
        tutorName: "Prof. Sarah Jenkins",
        startTime: new Date(Date.now() + 86400000 * 3).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 3 + 3600000 * 1.5).toISOString(),
        meetingUrl: "https://meet.aceeducation.us/room/ap-physics-jenkins-ethan",
        status: "scheduled",
        topic: "Torque & Conservation of Angular Momentum",
      }
    ];

    const announcementsList = [
      {
        id: 1,
        title: "Upcoming AP Diagnostics & Mock Exam Week",
        content: "Full-length AP Calculus BC & Physics C mock exams scheduled for August 5th. Review formulas in the Learning Resources center.",
        author: "ACE Academic Director",
        date: "2026-07-21",
      },
      {
        id: 2,
        title: "Digital SAT August Exam Strategy Session",
        content: "Dr. Chen will host an exclusive live strategy webinar on adaptive section pacing this Thursday at 6 PM EST.",
        author: "Dr. Michael Chen",
        date: "2026-07-19",
      }
    ];

    return {
      studentName,
      profile: {
        id: "STU-2026-084",
        grade: "11th Grade",
        school: "Boston Latin School",
        curriculum: "AP / SAT Prep",
        academicStatus: "AP Scholar with Distinction",
        parentEmail: "marcus.h@example.com",
        learningGoals: "Achieve 5 on AP Calculus BC & AP Physics C exams and 1550+ on Digital SAT.",
      },
      tutors: [
        { id: 101, name: "Dr. Alexander Wright", subject: "AP Calculus BC", email: "tutor.wright@aceeducation.us", rating: 5.0, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
        { id: 102, name: "Prof. Sarah Jenkins", subject: "AP Physics C", email: "tutor.jenkins@aceeducation.us", rating: 4.95, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
        { id: 103, name: "Dr. Michael Chen", subject: "SAT Prep", email: "tutor.chen@aceeducation.us", rating: 5.0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
      ],
      assignedSubjects,
      upcomingLessons,
      records,
      homework,
      quizzes,
      milestones,
      achievements,
      resources,
      notifications: notifs,
      unreadNotificationsCount: notifs.filter(n => !n.read).length,
      messages: msgs,
      announcements: announcementsList,
      attendanceStats: {
        totalSessions,
        presentSessions,
        lateSessions: 0,
        absentSessions: 0,
        attendanceRate: `${attendancePercentage}%`,
      },
      academicProgress: {
        homeworkRate: "96%",
        quizAverage: "96.5%",
        attendanceRate: `${attendancePercentage}%`,
        overallAchievement: "94% (Distinction)",
        strengths: ["Series Expansions", "Rotational Dynamics", "Algebra Transformations"],
        areasForImprovement: ["Lagrange Error Bound Rigor", "Composite Moment of Inertia Diagrams"],
      }
    };
  },

  // ==========================================
  // SCHEDULING & OPERATIONS AUTOMATION ENGINE
  // ==========================================

  // Packages & Subscriptions
  getPackagesByParent: async (parentEmail: string): Promise<PackageSubscriptionRecord[]> => {
    return memoryPackageSubscriptions.filter(p => p.parentEmail.toLowerCase() === parentEmail.toLowerCase());
  },

  getAllPackages: async (): Promise<PackageSubscriptionRecord[]> => {
    return memoryPackageSubscriptions;
  },

  createPackageSubscription: async (data: Omit<PackageSubscriptionRecord, "id" | "completedLessons" | "remainingLessons" | "status">): Promise<PackageSubscriptionRecord> => {
    const newId = memoryPackageSubscriptions.length > 0 ? Math.max(...memoryPackageSubscriptions.map(p => p.id)) + 1 : 1;
    const pkg: PackageSubscriptionRecord = {
      ...data,
      id: newId,
      completedLessons: 0,
      remainingLessons: data.totalLessons,
      status: "active",
    };
    memoryPackageSubscriptions.unshift(pkg);

    await TutorStorage.createNotification(
      data.parentEmail,
      "📦 Package Subscribed",
      `Your ${data.packageType} for ${data.subject} (${data.totalLessons} Lessons) is now active.`,
      "financial"
    );

    return pkg;
  },

  // Rescheduling Workflow
  getRescheduleRequests: async (): Promise<RescheduleRequestRecord[]> => {
    return memoryRescheduleRequests;
  },

  requestReschedule: async (data: Omit<RescheduleRequestRecord, "id" | "status" | "createdAt" | "updatedAt">): Promise<RescheduleRequestRecord> => {
    const newId = memoryRescheduleRequests.length > 0 ? Math.max(...memoryRescheduleRequests.map(r => r.id)) + 1 : 1;
    const req: RescheduleRequestRecord = {
      ...data,
      id: newId,
      status: "pending_admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryRescheduleRequests.unshift(req);

    // Update lesson status
    const lesson = memoryLessons.find(l => l.id === data.lessonId);
    if (lesson) {
      lesson.status = "pending_reschedule";
    }

    // Notify admin & counterparty
    await TutorStorage.createNotification(
      "admin@aceeducation.us",
      "⚠️ Reschedule Request Pending",
      `Reschedule requested for Lesson #${data.lessonId}. Reason: ${data.reason}`,
      "operational"
    );

    return req;
  },

  approveReschedule: async (requestId: number, adminNotes?: string): Promise<RescheduleRequestRecord | null> => {
    const req = memoryRescheduleRequests.find(r => r.id === requestId);
    if (!req) return null;

    req.status = "approved";
    req.adminNotes = adminNotes || "Approved by Academic Operations Director";
    req.updatedAt = new Date().toISOString();

    const lesson = memoryLessons.find(l => l.id === req.lessonId);
    if (lesson) {
      lesson.startTime = req.proposedStartTime;
      lesson.endTime = req.proposedEndTime;
      lesson.status = "confirmed";

      // Dispatch notifications
      if (lesson.parentEmail) {
        await TutorStorage.createNotification(
          lesson.parentEmail,
          "📅 Reschedule Approved",
          `Lesson #${lesson.id} for ${lesson.subject} has been rescheduled to ${new Date(req.proposedStartTime).toLocaleString()}.`,
          "operational"
        );
      }
      if (lesson.studentEmail) {
        await TutorStorage.createNotification(
          lesson.studentEmail,
          "📅 Schedule Updated",
          `Your ${lesson.subject} lesson is now scheduled for ${new Date(req.proposedStartTime).toLocaleString()}.`,
          "operational"
        );
      }
    }

    return req;
  },

  // Cancellations Workflow
  getCancellations: async (): Promise<CancellationRecord[]> => {
    return memoryCancellations;
  },

  requestCancellation: async (data: {
    lessonId: number;
    requestedByRole: "parent" | "tutor" | "admin";
    requestedByEmail: string;
    reason: string;
  }): Promise<CancellationRecord> => {
    const lesson = memoryLessons.find(l => l.id === data.lessonId);
    if (!lesson) throw new Error("Lesson not found");

    const newId = memoryCancellations.length > 0 ? Math.max(...memoryCancellations.map(c => c.id)) + 1 : 1;
    const hoursNotice = (new Date(lesson.startTime).getTime() - Date.now()) / (3600 * 1000);

    let fee = 0;
    let tutorComp = 0;
    let parentRefund = 0;
    let policyText = "";

    if (hoursNotice >= 24) {
      policyText = "> 24 Hours Notice: Full lesson credit restored to package. Zero cancellation fee.";
      parentRefund = 85.00;
    } else {
      policyText = "< 24 Hours Late Cancellation: 50% tutor compensation fee applies ($22.50). Partial credit refunded.";
      fee = 22.50;
      tutorComp = 22.50;
      parentRefund = 42.50;
    }

    const cancelRecord: CancellationRecord = {
      id: newId,
      lessonId: data.lessonId,
      requestedByRole: data.requestedByRole,
      requestedByEmail: data.requestedByEmail,
      reason: data.reason,
      cancellationFee: fee,
      tutorCompensationAmount: tutorComp,
      parentRefundAmount: parentRefund,
      status: "pending_approval",
      policyApplied: policyText,
      createdAt: new Date().toISOString(),
    };

    memoryCancellations.unshift(cancelRecord);

    await TutorStorage.createNotification(
      "admin@aceeducation.us",
      "❌ Cancellation Request Submitted",
      `Cancellation requested for Lesson #${data.lessonId}. Notice: ${Math.round(hoursNotice)} hours. Policy: ${policyText}`,
      "operational"
    );

    return cancelRecord;
  },

  approveCancellation: async (cancellationId: number): Promise<CancellationRecord | null> => {
    const cancel = memoryCancellations.find(c => c.id === cancellationId);
    if (!cancel) return null;

    cancel.status = "approved";

    const lesson = memoryLessons.find(l => l.id === cancel.lessonId);
    if (lesson) {
      lesson.status = "cancelled";
      lesson.cancellationReason = cancel.reason;

      // Restore package credit if applicable
      if (lesson.parentEmail) {
        const pkg = memoryPackageSubscriptions.find(p => p.parentEmail === lesson.parentEmail && p.subject === lesson.subject && p.status === "active");
        if (pkg && cancel.cancellationFee === 0) {
          pkg.remainingLessons += 1;
          pkg.completedLessons = Math.max(0, pkg.completedLessons - 1);
        }

        await TutorStorage.createNotification(
          lesson.parentEmail,
          "❌ Cancellation Processed",
          `Lesson #${lesson.id} cancellation approved. ${cancel.policyApplied}`,
          "operational"
        );
      }
    }

    return cancel;
  },

  // Blackout Dates & Vacations
  getBlackoutDates: async (): Promise<BlackoutDateRecord[]> => {
    return memoryBlackoutDates;
  },

  addBlackoutDate: async (data: Omit<BlackoutDateRecord, "id" | "createdAt">): Promise<BlackoutDateRecord> => {
    const newId = memoryBlackoutDates.length > 0 ? Math.max(...memoryBlackoutDates.map(b => b.id)) + 1 : 1;
    const record: BlackoutDateRecord = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    memoryBlackoutDates.unshift(record);
    return record;
  },

  // Waitlist Queue
  getWaitlist: async (): Promise<WaitlistRecord[]> => {
    return memoryWaitlist;
  },

  addToWaitlist: async (data: Omit<WaitlistRecord, "id" | "status" | "suggestedTutorIds" | "createdAt">): Promise<WaitlistRecord> => {
    const newId = memoryWaitlist.length > 0 ? Math.max(...memoryWaitlist.map(w => w.id)) + 1 : 1;
    
    // Auto find matching tutors
    const matchingTutors = memoryTutors.filter(t => 
      t.status === "approved" &&
      t.subjects.some(s => s.toLowerCase().includes(data.subject.toLowerCase()))
    );

    const record: WaitlistRecord = {
      ...data,
      id: newId,
      status: "waiting",
      suggestedTutorIds: matchingTutors.map(t => t.id),
      createdAt: new Date().toISOString(),
    };
    memoryWaitlist.unshift(record);

    await TutorStorage.createNotification(
      data.parentEmail,
      "📋 Added to Tutor Waitlist",
      `Your request for ${data.subject} has been placed in our priority waitlist. We will notify you as soon as a specialist tutor opens up.`,
      "operational"
    );

    return record;
  },

  // Availability & Conflict Engine
  checkAvailabilityAndConflicts: async (params: {
    tutorId: number;
    studentName: string;
    startTime: string;
    endTime: string;
    learningMode: string;
  }) => {
    const start = new Date(params.startTime).getTime();
    const end = new Date(params.endTime).getTime();

    const conflicts: string[] = [];

    // 1. Check Tutor Vacations & Blackout Dates
    const tutorBlackout = memoryBlackoutDates.find(b => {
      if (b.entityType === "global_holiday") return true;
      if (b.entityType === "tutor" && String(b.entityIdOrEmail) === String(params.tutorId)) return true;
      return false;
    });

    if (tutorBlackout) {
      const bStart = new Date(tutorBlackout.startDate).getTime();
      const bEnd = new Date(tutorBlackout.endDate).getTime();
      if ((start >= bStart && start <= bEnd) || (end >= bStart && end <= bEnd)) {
        conflicts.push(`Conflict: Blackout date / Vacation active (${tutorBlackout.title})`);
      }
    }

    // 2. Check Existing Lesson Bookings for Tutor
    const existingBooking = memoryLessons.find(l => {
      if (l.tutorId !== params.tutorId || l.status === "cancelled") return false;
      const lStart = new Date(l.startTime).getTime();
      const lEnd = new Date(l.endTime).getTime();
      // Overlap check
      return (start < lEnd && end > lStart);
    });

    if (existingBooking) {
      conflicts.push(`Conflict: Tutor already has a booked lesson (${existingBooking.subject} with ${existingBooking.studentName})`);
    }

    // 3. Check Travel Time Buffer if Home Tuition
    if (params.learningMode === "Home Tuition") {
      const adjacentBooking = memoryLessons.find(l => {
        if (l.tutorId !== params.tutorId || l.status === "cancelled") return false;
        const lStart = new Date(l.startTime).getTime();
        const lEnd = new Date(l.endTime).getTime();
        // Check if within 30 minutes travel buffer
        const bufferStart = lStart - 1800000;
        const bufferEnd = lEnd + 1800000;
        return (start < bufferEnd && end > bufferStart);
      });
      if (adjacentBooking) {
        conflicts.push(`Warning: Requires 30-minute travel time buffer for Home Tuition.`);
      }
    }

    return {
      available: conflicts.length === 0,
      conflicts,
      suggestedSlots: [
        new Date(start + 86400000).toISOString(),
        new Date(start + 86400000 * 2).toISOString(),
      ]
    };
  },

  // Automated Reminders Engine
  triggerAutomatedReminders: async (): Promise<AutomationLogRecord[]> => {
    const now = Date.now();
    const newLogs: AutomationLogRecord[] = [];

    // Scan lessons starting in next 24 hours
    for (const lesson of memoryLessons) {
      if (lesson.status === "scheduled" || lesson.status === "confirmed") {
        const lessonTime = new Date(lesson.startTime).getTime();
        const diffMs = lessonTime - now;
        const diffHours = diffMs / (3600 * 1000);

        if (diffHours > 0 && diffHours <= 24) {
          const logMsg = `24h Reminder sent for Lesson #${lesson.id} (${lesson.subject} - ${lesson.studentName})`;
          newLogs.push({
            id: memoryAutomationLogs.length + newLogs.length + 1,
            eventType: "24h Lesson Reminder",
            message: logMsg,
            timestamp: new Date().toISOString(),
          });

          if (lesson.parentEmail) {
            await TutorStorage.createNotification(
              lesson.parentEmail,
              "⏰ Lesson Reminder (In 24 Hours)",
              `Upcoming lesson: ${lesson.subject} with ${lesson.studentName} scheduled for ${new Date(lesson.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
              "reminder"
            );
          }
        }
      }
    }

    // Low package balance checks
    for (const pkg of memoryPackageSubscriptions) {
      if (pkg.status === "active" && pkg.remainingLessons <= 1) {
        const logMsg = `Low Package Credit Alert: ${pkg.studentName} has ${pkg.remainingLessons} lesson remaining for ${pkg.subject}`;
        newLogs.push({
          id: memoryAutomationLogs.length + newLogs.length + 1,
          eventType: "Package Balance Warning",
          message: logMsg,
          timestamp: new Date().toISOString(),
        });

        await TutorStorage.createNotification(
          pkg.parentEmail,
          "⚠️ Package Balance Running Low",
          `Your package for ${pkg.subject} (${pkg.studentName}) has ${pkg.remainingLessons} lesson remaining. Renew today to maintain uninterrupted learning.`,
          "financial"
        );
      }
    }

    memoryAutomationLogs.unshift(...newLogs);
    return memoryAutomationLogs;
  },

  // Master Unified Calendar
  getUnifiedMasterCalendar: async (filter?: {
    role?: string;
    email?: string;
    tutorId?: number;
    studentName?: string;
  }) => {
    let filteredLessons = [...memoryLessons];

    if (filter?.tutorId) {
      filteredLessons = filteredLessons.filter(l => l.tutorId === filter.tutorId);
    }
    if (filter?.studentName) {
      filteredLessons = filteredLessons.filter(l => l.studentName.toLowerCase().includes(filter.studentName!.toLowerCase()));
    }
    if (filter?.email) {
      filteredLessons = filteredLessons.filter(l => l.parentEmail === filter.email || l.studentEmail === filter.email);
    }

    const calendarEvents = filteredLessons.map(l => ({
      id: `lesson-${l.id}`,
      lessonId: l.id,
      title: `${l.subject} - ${l.studentName}`,
      subject: l.subject,
      studentName: l.studentName,
      tutorId: l.tutorId,
      start: l.startTime,
      end: l.endTime,
      status: l.status,
      meetingUrl: l.meetingUrl,
      meetingInfo: l.meetingInfo,
      learningMode: l.learningMode || "Online",
      scheduleType: l.scheduleType || "Weekly",
      attendanceStatus: l.attendanceStatus || "Pending",
      type: "lesson",
    }));

    // Add global holidays & tutor vacations
    const blackoutEvents = memoryBlackoutDates.map(b => ({
      id: `blackout-${b.id}`,
      title: b.title,
      start: b.startDate,
      end: b.endDate,
      status: "blackout",
      type: "blackout",
      reason: b.reason,
    }));

    return [...calendarEvents, ...blackoutEvents];
  },

  // End-to-End Lesson Completion Lifecycle Engine
  completeLessonLifecycle: async (data: {
    lessonId: number;
    tutorId: number;
    tutorName: string;
    studentName: string;
    studentId?: number;
    parentEmail?: string;
    subject: string;
    lessonSummary: string;
    topicsCovered: string[];
    keyConceptsLearned: string[];
    homeworkAssigned: string;
    homeworkDueDate?: string;
    tutorFeedback: string;
    studentParticipation: string;
    attendance: "Present" | "Late" | "Absent";
  }) => {
    // 1. Mark lesson as completed
    const lesson = memoryLessons.find(l => l.id === data.lessonId);
    if (lesson) {
      lesson.status = "completed";
      lesson.attendanceLogged = true;
      lesson.attendanceStatus = data.attendance;
    }

    // 2. Generate AI Revision Summary using Gemini
    const aiSummary = await TutorStorage.generateAIRevisionSummary({
      subject: data.subject,
      lessonSummary: data.lessonSummary,
      topicsCovered: data.topicsCovered,
      keyConceptsLearned: data.keyConceptsLearned,
    });

    // 3. Save Structured Lesson Record
    const record = await TutorStorage.saveStructuredLessonRecord({
      lessonId: data.lessonId,
      tutorId: data.tutorId,
      tutorName: data.tutorName,
      studentName: data.studentName,
      studentId: data.studentId || 1,
      parentEmail: data.parentEmail || "marcus.h@example.com",
      subject: data.subject,
      attendance: data.attendance,
      topicsCovered: data.topicsCovered,
      lessonSummary: data.lessonSummary,
      keyConceptsLearned: data.keyConceptsLearned,
      homeworkAssigned: data.homeworkAssigned,
      tutorFeedback: data.tutorFeedback,
      studentParticipation: data.studentParticipation,
      aiGeneratedRevisionSummary: aiSummary,
      videoPolicy: {
        recordingEnabled: false,
        storageLocation: "Disabled by default per ACE Privacy Guidelines",
        autoExpiryDays: 30,
      }
    });

    // 4. Create Homework Assignment in LMS queue if assigned
    if (data.homeworkAssigned && data.homeworkAssigned.trim() !== "" && data.homeworkAssigned !== "No homework assigned.") {
      const hwId = memoryHomeworkSubmissions.length > 0 ? Math.max(...memoryHomeworkSubmissions.map(h => h.id)) + 1 : 1;
      memoryHomeworkSubmissions.unshift({
        id: hwId,
        lessonRecordId: record.id,
        studentName: data.studentName,
        subject: data.subject,
        title: `Homework: ${data.subject} - ${new Date().toLocaleDateString()}`,
        description: data.homeworkAssigned,
        dueDate: data.homeworkDueDate || new Date(Date.now() + 86400000 * 3).toISOString(),
        status: "Pending",
        fileUrls: [],
      });
    }

    // 5. Update Package Deduction
    const parentEmail = data.parentEmail || "marcus.h@example.com";
    const pkg = memoryPackageSubscriptions.find(p => p.parentEmail === parentEmail && p.subject === data.subject && p.status === "active");
    if (pkg) {
      pkg.completedLessons += 1;
      pkg.remainingLessons = Math.max(0, pkg.totalLessons - pkg.completedLessons);
      if (pkg.remainingLessons === 0) {
        pkg.status = "depleted";
      }
    }

    // 6. Generate Tutor Payroll/Payment Record
    const tutor = await TutorStorage.getTutorById(data.tutorId);
    const rate = tutor ? tutor.finalRate : 45.00;
    const hours = 1.5;
    const grossPayout = rate * hours;

    memoryPayments.unshift({
      id: memoryPayments.length > 0 ? Math.max(...memoryPayments.map(p => p.id)) + 1 : 1,
      tutorId: data.tutorId,
      lessonId: data.lessonId,
      hours,
      hourlyRate: rate,
      grossPayout,
      status: "approved",
      createdAt: new Date().toISOString(),
    });

    // 7. Auto-dispatch Notifications to Parent & Student
    await TutorStorage.createNotification(
      parentEmail,
      `📝 Lesson Completed: ${data.subject}`,
      `Lesson report & AI Revision Brief for ${data.studentName} is ready. Homework: ${data.homeworkAssigned}`,
      "academic"
    );

    await TutorStorage.createNotification(
      "ethan.h@example.com",
      `⚡ AI Revision Brief Ready: ${data.subject}`,
      `Your AI Revision Summary and new homework assignment are now available in your Student Portal.`,
      "academic"
    );

    return {
      lesson,
      record,
      aiSummary,
      pkg,
      payout: grossPayout,
    };
  },

  // Admin Operations Dashboard Metrics
  getOperationsDashboardData: async () => {
    const todayStr = new Date().toISOString().split("T")[0];

    const todayLessons = memoryLessons.filter(l => {
      const lDate = new Date(l.startTime).toISOString().split("T")[0];
      return lDate === todayStr;
    });

    const tomorrowLessons = memoryLessons.filter(l => {
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      const lDate = new Date(l.startTime).toISOString().split("T")[0];
      return lDate === tomorrow;
    });

    const pendingReschedules = memoryRescheduleRequests.filter(r => r.status === "pending_admin");
    const pendingCancellations = memoryCancellations.filter(c => c.status === "pending_approval");
    const waitlistItems = memoryWaitlist.filter(w => w.status === "waiting");
    const activePackages = memoryPackageSubscriptions;

    return {
      todayLessons,
      tomorrowLessons,
      allLessons: memoryLessons,
      pendingReschedules,
      pendingCancellations,
      waitlistItems,
      activePackages,
      blackoutDates: memoryBlackoutDates,
      automationLogs: memoryAutomationLogs,
      metrics: {
        totalLessonsToday: todayLessons.length || 3,
        completedToday: todayLessons.filter(l => l.status === "completed").length,
        pendingReschedulesCount: pendingReschedules.length,
        waitlistCount: waitlistItems.length,
        activePackagesCount: activePackages.length,
        lowBalancePackagesCount: activePackages.filter(p => p.remainingLessons <= 1).length,
      }
    };
  },

  // ==========================================
  // FINANCIAL & BILLING ENGINE METHODS
  // ==========================================

  getInvoices: async (parentEmail?: string) => {
    if (parentEmail) {
      return memoryInvoices.filter(i => i.parentEmail.toLowerCase() === parentEmail.toLowerCase());
    }
    return memoryInvoices;
  },

  getInvoiceById: async (id: number) => {
    return memoryInvoices.find(i => i.id === id);
  },

  createInvoice: async (data: Partial<InvoiceRecord>) => {
    const id = memoryInvoices.length > 0 ? Math.max(...memoryInvoices.map(i => i.id)) + 1 : 1;
    const invNum = `ACE-INV-${new Date().getFullYear()}-${String(id).padStart(3, "0")}`;
    const subtotal = data.subtotal || (data.lineItems ? data.lineItems.reduce((acc, item) => acc + item.total, 0) : 0);
    const discountAmount = data.discountAmount || 0;
    const taxAmount = (subtotal - discountAmount) * ((data.taxRate || 0) / 100);
    const totalAmount = subtotal - discountAmount + taxAmount;

    const newInv: InvoiceRecord = {
      id,
      invoiceNumber: invNum,
      issueDate: data.issueDate || new Date().toISOString().split("T")[0],
      dueDate: data.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      parentName: data.parentName || "Valued Client",
      parentEmail: data.parentEmail || "client@example.com",
      studentName: data.studentName || "Student",
      studentEmail: data.studentEmail,
      subject: data.subject || "General Tutoring",
      serviceType: data.serviceType || "Single Lesson",
      packageDetails: data.packageDetails,
      lessonsIncluded: data.lessonsIncluded || 1,
      lineItems: data.lineItems || [{ id: 1, description: data.subject || "Academic Tutoring Session", quantity: 1, unitPrice: subtotal, total: subtotal }],
      subtotal,
      discountCode: data.discountCode,
      discountAmount,
      taxRate: data.taxRate || 0,
      taxAmount,
      totalAmount,
      paidAmount: 0,
      balanceDue: totalAmount,
      status: "unpaid",
      notes: data.notes || "Thank you for choosing ACE Education USA.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryInvoices.unshift(newInv);

    // Audit Log
    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Invoice Created",
      amount: totalAmount,
      userRole: "admin",
      userEmail: data.parentEmail || "admin@aceeducation.us",
      referenceNumber: invNum,
      details: `Generated invoice ${invNum} for ${newInv.parentName} (${newInv.serviceType})`,
      timestamp: new Date().toISOString(),
    });

    // Notification
    await TutorStorage.createNotification(
      newInv.parentEmail,
      `💳 New Invoice Available: ${invNum}`,
      `An invoice for $${totalAmount.toFixed(2)} (${newInv.serviceType} - ${newInv.subject}) has been generated. Due date: ${newInv.dueDate}`,
      "billing"
    );

    return newInv;
  },

  processPayment: async (paymentData: {
    invoiceId: number;
    amount: number;
    paymentMethod: "Stripe" | "PayPal" | "Square" | "Authorize.Net" | "Bank Transfer" | "Cash" | "Credit Note";
    gateway?: string;
    parentEmail: string;
    parentName?: string;
    couponCode?: string;
  }) => {
    const inv = memoryInvoices.find(i => i.id === paymentData.invoiceId);
    if (!inv) throw new Error("Invoice not found.");

    let discountApplied = 0;
    if (paymentData.couponCode) {
      const discRes = await TutorStorage.applyDiscount(paymentData.couponCode, inv.subtotal);
      if (discRes.valid) {
        discountApplied = discRes.discountAmount;
        inv.discountCode = paymentData.couponCode;
        inv.discountAmount = discountApplied;
        inv.totalAmount = Math.max(0, inv.subtotal - discountApplied + inv.taxAmount);
        inv.balanceDue = Math.max(0, inv.totalAmount - inv.paidAmount);
      }
    }

    const payAmount = Math.min(paymentData.amount, inv.balanceDue > 0 ? inv.balanceDue : inv.totalAmount);
    inv.paidAmount += payAmount;
    inv.balanceDue = Math.max(0, inv.totalAmount - inv.paidAmount);

    if (inv.balanceDue === 0) {
      inv.status = "paid";
    } else if (inv.paidAmount > 0) {
      inv.status = "partially_paid";
    }

    inv.paymentMethod = paymentData.paymentMethod;
    inv.paymentGateway = paymentData.gateway || paymentData.paymentMethod;
    const txId = `tx_${paymentData.paymentMethod.toLowerCase()}_${Date.now().toString().slice(-7)}`;
    inv.transactionId = txId;
    inv.receiptUrl = `https://aceeducation.us/receipts/${inv.invoiceNumber}.pdf`;
    inv.updatedAt = new Date().toISOString();

    // Create Payment Transaction Record
    const txRecord: PaymentTransactionRecord = {
      id: memoryPaymentTransactions.length + 1,
      transactionId: txId,
      invoiceId: inv.id,
      invoiceNumber: inv.invoiceNumber,
      parentEmail: paymentData.parentEmail,
      parentName: paymentData.parentName || inv.parentName,
      amount: payAmount,
      paymentMethod: paymentData.paymentMethod,
      gateway: paymentData.gateway || paymentData.paymentMethod,
      status: "succeeded",
      paymentDate: new Date().toISOString(),
      receiptUrl: inv.receiptUrl,
      createdAt: new Date().toISOString(),
    };
    memoryPaymentTransactions.unshift(txRecord);

    // If invoice is for a Package, update or activate Package Subscription
    if (inv.serviceType === "Lesson Package") {
      const existingPkg = memoryPackageSubscriptions.find(
        p => p.parentEmail.toLowerCase() === paymentData.parentEmail.toLowerCase() && p.subject === inv.subject
      );
      if (existingPkg) {
        existingPkg.totalLessons += inv.lessonsIncluded;
        existingPkg.remainingLessons += inv.lessonsIncluded;
        existingPkg.status = "active";
      } else {
        memoryPackageSubscriptions.push({
          id: memoryPackageSubscriptions.length + 1,
          parentEmail: paymentData.parentEmail,
          parentName: paymentData.parentName || inv.parentName,
          studentName: inv.studentName,
          subject: inv.subject,
          packageType: inv.packageDetails as any || "10 Lesson Package",
          totalLessons: inv.lessonsIncluded || 10,
          completedLessons: 0,
          remainingLessons: inv.lessonsIncluded || 10,
          price: inv.totalAmount,
          status: "active",
          startDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 90 * 86400000).toISOString(),
        });
      }
    }

    // Audit Logging
    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Payment Received",
      amount: payAmount,
      userRole: "parent",
      userEmail: paymentData.parentEmail,
      referenceNumber: txId,
      details: `Payment of $${payAmount.toFixed(2)} received via ${paymentData.paymentMethod} for ${inv.invoiceNumber}`,
      timestamp: new Date().toISOString(),
    });

    // Send Notification
    await TutorStorage.createNotification(
      paymentData.parentEmail,
      `✅ Payment Successful: ${inv.invoiceNumber}`,
      `Your payment of $${payAmount.toFixed(2)} via ${paymentData.paymentMethod} was successfully processed. Receipt #${txId} is saved in your portal.`,
      "billing"
    );

    return { invoice: inv, transaction: txRecord };
  },

  getPaymentTransactions: async (parentEmail?: string) => {
    if (parentEmail) {
      return memoryPaymentTransactions.filter(t => t.parentEmail.toLowerCase() === parentEmail.toLowerCase());
    }
    return memoryPaymentTransactions;
  },

  getDiscounts: async () => {
    return memoryDiscounts;
  },

  createDiscount: async (data: Partial<DiscountRecord>) => {
    const newDisc: DiscountRecord = {
      id: memoryDiscounts.length + 1,
      code: (data.code || "ACE" + Math.floor(1000 + Math.random() * 9000)).toUpperCase(),
      type: data.type || "percentage",
      value: data.value || 10,
      category: data.category || "Coupon Code",
      usageLimit: data.usageLimit || 100,
      timesUsed: 0,
      validUntil: data.validUntil || "2026-12-31",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    memoryDiscounts.unshift(newDisc);

    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Discount Applied",
      amount: newDisc.value,
      userRole: "admin",
      userEmail: "admin@aceeducation.us",
      referenceNumber: newDisc.code,
      details: `Created new discount coupon ${newDisc.code} (${newDisc.value}${newDisc.type === "percentage" ? "%" : "$"} off)`,
      timestamp: new Date().toISOString(),
    });

    return newDisc;
  },

  applyDiscount: async (code: string, subtotal: number) => {
    const disc = memoryDiscounts.find(d => d.code.toUpperCase() === code.trim().toUpperCase() && d.status === "active");
    if (!disc) {
      return { valid: false, message: "Invalid or expired coupon code.", discountAmount: 0 };
    }

    let discountAmount = 0;
    if (disc.type === "percentage") {
      discountAmount = subtotal * (disc.value / 100);
    } else {
      discountAmount = Math.min(disc.value, subtotal);
    }

    disc.timesUsed += 1;
    return { valid: true, code: disc.code, discountAmount, category: disc.category, message: `Coupon ${disc.code} applied successfully!` };
  },

  processRefund: async (data: {
    invoiceId: number;
    amount: number;
    refundType: "Full Refund" | "Partial Refund" | "Credit Note" | "Package Credit Restoration";
    reason: string;
    restorePackageLessons?: number;
    parentEmail: string;
  }) => {
    const inv = memoryInvoices.find(i => i.id === data.invoiceId);
    if (!inv) throw new Error("Invoice not found");

    const refId = memoryRefunds.length + 1;
    const refNum = `ACE-REF-${1000 + refId}`;

    const refundRec: RefundRecord = {
      id: refId,
      refundNumber: refNum,
      invoiceId: inv.id,
      invoiceNumber: inv.invoiceNumber,
      parentEmail: data.parentEmail,
      amount: data.amount,
      refundType: data.refundType,
      reason: data.reason,
      status: "completed",
      restoredPackageLessons: data.restorePackageLessons || 0,
      processedAt: new Date().toISOString(),
    };

    memoryRefunds.unshift(refundRec);
    inv.status = "refunded";
    inv.notes = `[Refund ${refNum} Issued]: $${data.amount.toFixed(2)} (${data.refundType}) - ${data.reason}`;

    if (data.restorePackageLessons && data.restorePackageLessons > 0) {
      const pkg = memoryPackageSubscriptions.find(p => p.parentEmail.toLowerCase() === data.parentEmail.toLowerCase() && p.subject === inv.subject);
      if (pkg) {
        pkg.remainingLessons += data.restorePackageLessons;
        pkg.status = "active";
      }
    }

    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Refund Issued",
      amount: data.amount,
      userRole: "admin",
      userEmail: "admin@aceeducation.us",
      referenceNumber: refNum,
      details: `Issued ${data.refundType} of $${data.amount.toFixed(2)} for invoice ${inv.invoiceNumber}. Reason: ${data.reason}`,
      timestamp: new Date().toISOString(),
    });

    await TutorStorage.createNotification(
      data.parentEmail,
      `💸 Refund Processed: ${refNum}`,
      `A ${data.refundType} of $${data.amount.toFixed(2)} for Invoice ${inv.invoiceNumber} has been processed.`,
      "billing"
    );

    return refundRec;
  },

  getRefunds: async () => {
    return memoryRefunds;
  },

  getTutorPayrolls: async (tutorId?: number) => {
    if (tutorId) {
      return memoryTutorPayrolls.filter(p => p.tutorId === tutorId);
    }
    return memoryTutorPayrolls;
  },

  approvePayroll: async (payrollId: number) => {
    const pr = memoryTutorPayrolls.find(p => p.id === payrollId);
    if (!pr) throw new Error("Payroll record not found");

    pr.status = "approved";
    pr.updatedAt = new Date().toISOString();

    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Payroll Approved",
      amount: pr.grossPayout,
      userRole: "admin",
      userEmail: "admin@aceeducation.us",
      referenceNumber: pr.payrollNumber,
      details: `Approved payroll ${pr.payrollNumber} for ${pr.tutorName} ($${pr.grossPayout.toFixed(2)})`,
      timestamp: new Date().toISOString(),
    });

    await TutorStorage.createNotification(
      pr.tutorEmail,
      `💰 Payroll Approved: ${pr.billingPeriod}`,
      `Your teaching earnings of $${pr.grossPayout.toFixed(2)} (${pr.totalHoursTaught} hrs) for ${pr.billingPeriod} have been approved. Payout pending bank transfer.`,
      "payroll"
    );

    return pr;
  },

  markPayrollPaid: async (payrollId: number, reference: string) => {
    const pr = memoryTutorPayrolls.find(p => p.id === payrollId);
    if (!pr) throw new Error("Payroll record not found");

    pr.status = "paid";
    pr.paymentReference = reference || `WIRE-${Date.now().toString().slice(-6)}`;
    pr.paidDate = new Date().toISOString().split("T")[0];
    pr.statementUrl = `https://aceeducation.us/statements/${pr.payrollNumber}.pdf`;
    pr.updatedAt = new Date().toISOString();

    memoryFinancialAuditLogs.unshift({
      id: memoryFinancialAuditLogs.length + 1,
      operationType: "Payroll Paid",
      amount: pr.grossPayout,
      userRole: "admin",
      userEmail: "admin@aceeducation.us",
      referenceNumber: pr.payrollNumber,
      details: `Paid payroll ${pr.payrollNumber} to ${pr.tutorName} ($${pr.grossPayout.toFixed(2)} via Ref: ${pr.paymentReference})`,
      timestamp: new Date().toISOString(),
    });

    await TutorStorage.createNotification(
      pr.tutorEmail,
      `🎉 Payroll Dispatched: ${pr.billingPeriod}`,
      `Payment of $${pr.grossPayout.toFixed(2)} has been transferred to your registered bank account. Payment Ref: ${pr.paymentReference}`,
      "payroll"
    );

    return pr;
  },

  getFinanceDashboardKPIs: async () => {
    const totalRevenue = memoryPaymentTransactions.reduce((acc, t) => acc + t.amount, 0);
    const todayStr = new Date().toISOString().split("T")[0];
    const todayRevenue = memoryPaymentTransactions
      .filter(t => t.paymentDate.split("T")[0] === todayStr)
      .reduce((acc, t) => acc + t.amount, 0);

    const outstandingReceivables = memoryInvoices
      .filter(i => i.status === "unpaid" || i.status === "overdue" || i.status === "partially_paid")
      .reduce((acc, i) => acc + i.balanceDue, 0);

    const pendingPayroll = memoryTutorPayrolls
      .filter(p => p.status === "pending" || p.status === "approved")
      .reduce((acc, p) => acc + p.grossPayout, 0);

    const totalTutorCosts = memoryTutorPayrolls.reduce((acc, p) => acc + p.grossPayout, 0);
    const totalGrossProfit = totalRevenue > 0 ? totalRevenue - totalTutorCosts : 0;
    const grossMarginPercent = totalRevenue > 0 ? Math.round((totalGrossProfit / totalRevenue) * 100) : 48;

    const totalInvoicesCount = memoryInvoices.length;
    const paidInvoicesCount = memoryInvoices.filter(i => i.status === "paid").length;
    const collectionRate = totalInvoicesCount > 0 ? Math.round((paidInvoicesCount / totalInvoicesCount) * 100) : 100;

    const totalRefunds = memoryRefunds.reduce((acc, r) => acc + r.amount, 0);
    const refundRate = totalRevenue > 0 ? Number(((totalRefunds / totalRevenue) * 100).toFixed(1)) : 0;

    return {
      monthlyRevenue: totalRevenue || 18450.00,
      todayRevenue: todayRevenue || 1300.00,
      outstandingReceivables: outstandingReceivables || 220.00,
      pendingTutorPayroll: pendingPayroll || 810.00,
      totalTutorCosts: totalTutorCosts || 1290.00,
      grossProfit: totalGrossProfit || 17160.00,
      grossMarginPercent: grossMarginPercent || 48,
      collectionRate: collectionRate || 85,
      refundRate: refundRate || 1.2,
      monthlyGrowthPercent: 18.4,
      topSubjects: [
        { subject: "AP Calculus BC", revenue: 8500, marginPercent: 47 },
        { subject: "AP Physics C", revenue: 4500, marginPercent: 50 },
        { subject: "IB Chemistry", revenue: 3200, marginPercent: 45 },
        { subject: "SAT Digital Prep", revenue: 2250, marginPercent: 55 },
      ],
      topTutors: [
        { name: "Dr. Alexander Wright", hours: 18.0, revenueGenerated: 1530.00, tutorPayout: 810.00, aceMargin: 720.00 },
        { name: "Prof. Elena Rostova", hours: 12.0, revenueGenerated: 900.00, tutorPayout: 480.00, aceMargin: 420.00 },
      ],
      mostProfitableServices: [
        { service: "20 Lesson Package", avgMargin: "$800 / pkg", percentage: "50% Margin" },
        { service: "10 Lesson Package", avgMargin: "$400 / pkg", percentage: "47% Margin" },
        { service: "Assessment Session", avgMargin: "$75 / session", percentage: "55% Margin" },
      ]
    };
  },

  getFinancialReports: async (reportType: string) => {
    return {
      reportType,
      generatedAt: new Date().toISOString(),
      summary: {
        totalRevenue: memoryPaymentTransactions.reduce((a, t) => a + t.amount, 0) || 18450,
        totalPayroll: memoryTutorPayrolls.reduce((a, p) => a + p.grossPayout, 0) || 1290,
        netProfit: 17160,
        marginPercent: 48,
      },
      invoices: memoryInvoices,
      transactions: memoryPaymentTransactions,
      payrolls: memoryTutorPayrolls,
      refunds: memoryRefunds,
      discounts: memoryDiscounts,
    };
  },

  getFinancialAuditLogs: async () => {
    return memoryFinancialAuditLogs;
  },

  getStudents: async () => {
    return memoryStudents;
  },

  getTutors: async () => {
    return memoryTutors;
  },

  getLessons: async () => {
    return memoryLessons;
  },

  getHomeworks: async () => {
    return memoryHomeworkSubmissions;
  },

  getLeads: async () => {
    return memoryTutorRequests;
  },

  getFinanceSettings: async () => {
    return memoryFinanceSettings;
  },

  updateFinanceSettings: async (data: Partial<FinanceSettingsRecord>) => {
    Object.assign(memoryFinanceSettings, data);
    return memoryFinanceSettings;
  },

  getExecutiveAnalytics: async (filters?: {
    dateRange?: string;
    subject?: string;
    curriculum?: string;
    grade?: string;
    state?: string;
    tutorId?: string;
    parentEmail?: string;
    studentId?: string;
    teachingMode?: string;
    serviceType?: string;
  }) => {
    // 1. Core Revenue & Payment Calculations
    const totalTransactions = memoryPaymentTransactions;
    const paidInvoices = memoryInvoices.filter(i => i.status === "paid");
    const totalRev = totalTransactions.reduce((acc, t) => acc + (t.amount || 0), 0) || 18450;

    const todayStr = new Date().toISOString().split("T")[0];
    const todayRev = totalTransactions
      .filter(t => t.paymentDate && t.paymentDate.startsWith(todayStr))
      .reduce((acc, t) => acc + (t.amount || 0), 0) || 1250;

    const monthlyRev = totalRev;
    const annualRev = totalRev * 11.2;

    const totalPayroll = memoryTutorPayrolls.reduce((acc, p) => acc + (p.grossPayout || 0), 0) || 1290;
    const grossProfit = totalRev - totalPayroll;
    const grossMarginPercent = totalRev > 0 ? Math.round((grossProfit / totalRev) * 100) : 48;

    const outstandingInvCount = memoryInvoices.filter(i => i.status === "unpaid" || i.status === "overdue" || i.status === "partially_paid").length;
    const outstandingInvAmount = memoryInvoices
      .filter(i => i.status === "unpaid" || i.status === "overdue" || i.status === "partially_paid")
      .reduce((acc, i) => acc + (i.balanceDue || i.totalAmount || 0), 0) || 220;

    const collectionRate = memoryInvoices.length > 0
      ? Math.round((paidInvoices.length / memoryInvoices.length) * 100)
      : 92;

    const totalRefundsAmount = memoryRefunds.reduce((a, r) => a + (r.amount || 0), 0);
    const refundRate = totalRev > 0 ? Number(((totalRefundsAmount / totalRev) * 100).toFixed(1)) : 0.8;

    // 2. Active Operational Entities
    const activeStudents = memoryStudents.filter(s => s.status === "active").length || 24;
    const activeParentsSet = new Set(memoryStudents.map(s => s.parentEmail));
    const activeParents = activeParentsSet.size || 18;
    const activeTutors = memoryTutors.filter(t => t.status === "approved").length || 8;

    const activeLessons = memoryLessons.filter(l => l.status === "confirmed" || l.status === "scheduled").length || 14;
    const completedLessons = memoryLessons.filter(l => l.status === "completed").length || 142;
    const scheduledLessons = memoryLessons.filter(l => l.status === "scheduled").length || 18;
    const cancelledLessons = memoryLessons.filter(l => l.status === "cancelled").length || 4;
    const totalLessonsCount = activeLessons + completedLessons + cancelledLessons;
    const cancellationRate = totalLessonsCount > 0 ? Number(((cancelledLessons / totalLessonsCount) * 100).toFixed(1)) : 2.5;

    const tutorUtilization = 84; // % capacity utilized
    const studentAttendance = 96.2; // %
    const homeworkCompletion = 91.5; // %
    const parentSatisfaction = 4.92; // out of 5
    const tutorSatisfaction = 4.88; // out of 5
    const studentRetention = 94.5; // %
    const parentRetention = 95.8; // %
    const leadConversionRate = 34.2; // %
    const averageLessonRating = 4.95; // out of 5

    const averageRevenuePerStudent = activeStudents > 0 ? Math.round(totalRev / activeStudents) : 768;
    const lifetimeCustomerValue = averageRevenuePerStudent * 18; // 18 month average tenure

    // 3. Command Center Scores (0 - 100)
    const scores = {
      businessHealthScore: 94,
      financialHealthScore: 92,
      academicPerformanceScore: 96,
      customerSatisfactionScore: 98,
      operationalEfficiencyScore: 91,
      growthScore: 89,
      recommendations: [
        { category: "Financial", title: "Automate Overdue Invoice Reminders", impact: "+$1,400 monthly cash flow", scoreKey: "financialHealthScore" },
        { category: "Academic", title: "Expand AP Physics C & SAT Math Bootcamps", impact: "+28% student enrollment demand", scoreKey: "academicPerformanceScore" },
        { category: "Operations", title: "Recruit 2 AP Computer Science Tutors in CA/NY", impact: "Fulfill 100% of pending waitlist leads", scoreKey: "operationalEfficiencyScore" },
        { category: "Growth", title: "Launch Parent Referral Reward Program", impact: "Reduce customer acquisition cost by 35%", scoreKey: "growthScore" },
      ]
    };

    // 4. Sales CRM Pipeline Analytics
    const salesPipeline = {
      funnel: [
        { stage: "New Leads", count: 85, conversionPercent: 100, avgDays: 1.2 },
        { stage: "Assessment Scheduled", count: 68, conversionPercent: 80, avgDays: 2.1 },
        { stage: "Assessment Completed", count: 58, conversionPercent: 85, avgDays: 1.5 },
        { stage: "Tutor Shortlisted", count: 52, conversionPercent: 90, avgDays: 1.0 },
        { stage: "Parent Reviewing", count: 46, conversionPercent: 88, avgDays: 2.4 },
        { stage: "Proposal Sent", count: 42, conversionPercent: 91, avgDays: 1.8 },
        { stage: "Enrolled", count: 36, conversionPercent: 86, avgDays: 1.1 },
        { stage: "Active", count: 34, conversionPercent: 94, avgDays: 365 },
        { stage: "Inactive", count: 6, conversionPercent: 0, avgDays: 120 },
        { stage: "Lost", count: 12, conversionPercent: 0, avgDays: 4.5 },
      ],
      lostReasons: [
        { reason: "Budget / Price Sensitivity", percentage: 42 },
        { reason: "Schedule Incompatibility", percentage: 28 },
        { reason: "Found Local Alternative", percentage: 18 },
        { reason: "Postponed Prep to Next Semester", percentage: 12 },
      ]
    };

    // 5. Student Analytics
    const studentAnalytics = {
      attendanceTrends: [
        { month: "Jan", presentRate: 94, lateRate: 4, absentRate: 2 },
        { month: "Feb", presentRate: 96, lateRate: 3, absentRate: 1 },
        { month: "Mar", presentRate: 95, lateRate: 3, absentRate: 2 },
        { month: "Apr", presentRate: 97, lateRate: 2, absentRate: 1 },
        { month: "May", presentRate: 98, lateRate: 1, absentRate: 1 },
        { month: "Jun", presentRate: 96, lateRate: 3, absentRate: 1 },
      ],
      homeworkCompletionRate: 91.5,
      avgAssessmentScore: 88.4,
      avgQuizScore: 91.2,
      learningVelocity: "High (+1.4x grade progression speed)",
      aiReadinessScore: 94,
      riskLevelDistribution: { lowRisk: 88, mediumRisk: 9, highRiskAtRisk: 3 },
      academicTimeline: [
        { date: "2026-06-15", student: "Ethan Harrison", milestone: "Scored 1540 on SAT Practice Exam", subject: "SAT Prep", status: "Achieved" },
        { date: "2026-06-20", student: "Lily Harrison", milestone: "Mastered Quadratic Functions", subject: "Algebra 1", status: "Mastered" },
        { date: "2026-07-02", student: "Sophia Chen", milestone: "Completed IB Chemistry Internal Assessment", subject: "IB Chemistry", status: "Achieved" },
      ]
    };

    // 6. Parent Analytics
    const parentAnalytics = {
      totalParents: activeParents,
      avgChildrenPerParent: 1.33,
      avgMonthlySpendPerParent: 980,
      retentionProbabilityAverage: 96.4,
      supportTickets: { open: 1, resolved: 24, avgResolutionHours: 3.2 },
      parentsList: [
        { name: "Marcus Harrison", email: "marcus.h@example.com", children: ["Ethan Harrison", "Lily Harrison"], activePackage: "20 Lesson Package", totalSpent: 4250, retentionProb: 98, portalActivity: "Daily" },
        { name: "Sarah Jenkins", email: "sarah.j@example.com", children: ["Noah Jenkins"], activePackage: "10 Lesson Package", totalSpent: 1850, retentionProb: 94, portalActivity: "Weekly" },
        { name: "David Chen", email: "david.c@example.com", children: ["Sophia Chen"], activePackage: "20 Lesson Package", totalSpent: 3600, retentionProb: 97, portalActivity: "Bi-weekly" },
      ]
    };

    // 7. Tutor Analytics
    const tutorAnalytics = memoryTutors.map(t => {
      const tutorPayrollRecords = memoryTutorPayrolls.filter(p => p.tutorId === t.id);
      const totalHours = tutorPayrollRecords.reduce((a, p) => a + p.totalHoursTaught, 0) || 28;
      const totalEarnings = tutorPayrollRecords.reduce((a, p) => a + p.grossPayout, 0) || 1260;
      const revGen = Math.round(totalEarnings * 1.85);
      const profitContrib = revGen - totalEarnings;

      return {
        id: t.id,
        name: t.fullName,
        email: t.email,
        subjects: t.subjects,
        teachingHours: totalHours,
        completedLessons: Math.round(totalHours / 1.5),
        cancellationRate: 1.2,
        rating: t.rating || 4.9,
        avgResponseTimeMinutes: 14,
        studentRetentionRate: 96.5,
        homeworkCompletionRate: 94.0,
        lessonQualityScore: 98,
        payrollHistory: totalEarnings,
        revenueGenerated: revGen,
        profitContribution: profitContrib,
      };
    });

    // 8. Academic Analytics
    const academicAnalytics = {
      mostPopularSubjects: [
        { subject: "AP Calculus BC", studentsCount: 12, growthPercent: 24 },
        { subject: "SAT Digital Prep", studentsCount: 10, growthPercent: 32 },
        { subject: "AP Physics C", studentsCount: 8, growthPercent: 18 },
        { subject: "IB Chemistry HL", studentsCount: 7, growthPercent: 15 },
        { subject: "IGCSE Mathematics", studentsCount: 6, growthPercent: 20 },
      ],
      curriculumDistribution: [
        { curriculum: "AP (Advanced Placement)", percentage: 38 },
        { curriculum: "SAT / ACT Test Prep", percentage: 26 },
        { curriculum: "IB (International Baccalaureate)", percentage: 18 },
        { curriculum: "IGCSE / A-Levels", percentage: 10 },
        { curriculum: "K-12 US Common Core", percentage: 8 },
      ],
      averageImprovement: [
        { test: "SAT Score Improvement", avgGain: "+185 Points" },
        { test: "ACT Score Improvement", avgGain: "+4.2 Points" },
        { test: "AP Exam Score Yield", avgGain: "88% Scored 5" },
        { test: "GPA Increase", avgGain: "+0.85 Grade Points" },
      ]
    };

    // 9. Financial Analytics & Monthly Revenue Trends
    const financialAnalytics = {
      revenueByMonth: [
        { month: "Jan 2026", revenue: 14200, payroll: 6800, profit: 7400 },
        { month: "Feb 2026", revenue: 15800, payroll: 7400, profit: 8400 },
        { month: "Mar 2026", revenue: 16900, payroll: 7900, profit: 9000 },
        { month: "Apr 2026", revenue: 17500, payroll: 8200, profit: 9300 },
        { month: "May 2026", revenue: 18100, payroll: 8500, profit: 9600 },
        { month: "Jun 2026", revenue: 18450, payroll: 8650, profit: 9800 },
      ],
      revenueBySubject: [
        { subject: "AP Calculus BC", amount: 6800 },
        { subject: "SAT Digital Prep", amount: 4800 },
        { subject: "AP Physics C", amount: 3500 },
        { subject: "IB Chemistry", amount: 2200 },
        { subject: "Other STEM & Languages", amount: 1150 },
      ],
      revenueByState: [
        { state: "California", revenue: 6200, growth: "+28%" },
        { state: "New York", revenue: 4800, growth: "+22%" },
        { state: "Texas", revenue: 3400, growth: "+19%" },
        { state: "Florida", revenue: 2450, growth: "+15%" },
        { state: "International / Others", revenue: 1600, growth: "+12%" },
      ],
      outstandingReceivables: outstandingInvAmount,
      totalTutorPayroll: totalPayroll,
      profitTrend: "+18.4% QoQ Profit Growth"
    };

    // 10. Forecasting Engine
    const forecasting = {
      nextMonthRevenueForecast: Math.round(totalRev * 1.14),
      nextMonthPayrollForecast: Math.round(totalPayroll * 1.10),
      expectedCashFlow: Math.round(totalRev * 1.14 - totalPayroll * 1.10),
      tutorDemandSurge: "+22% demand in AP STEM and SAT Digital",
      hiringNeeds: [
        { role: "AP Computer Science Tutor", urgency: "High", estimatedHours: "15 hrs/wk" },
        { role: "IB Physics HL Specialist", urgency: "Medium", estimatedHours: "10 hrs/wk" },
      ],
      packageRenewalsDueNext30Days: 8,
      expectedRenewalRevenue: 6800,
    };

    // 11. Automated System Alerts
    const alerts = [
      { id: 1, type: "revenue_milestone", title: "🎉 Revenue Milestone Reached", message: "Monthly revenue exceeded $18,000 threshold with 48% net margin yield.", severity: "success", timestamp: new Date().toISOString() },
      { id: 2, type: "tutor_capacity", title: "⚠️ High Tutor Capacity Utilization", message: "Dr. Alexander Wright and Elena Rostova are at 92% active capacity.", severity: "warning", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 3, type: "package_renewals", title: "🔔 8 Package Renewals Approaching", message: "8 student lesson packages are at 2 or fewer remaining lessons.", severity: "info", timestamp: new Date(Date.now() - 7200000).toISOString() },
    ];

    return {
      timestamp: new Date().toISOString(),
      kpis: {
        todayRevenue: todayRev,
        monthlyRevenue: monthlyRev,
        annualRevenue: annualRev,
        grossProfit,
        grossMarginPercent,
        outstandingInvoices: { count: outstandingInvCount, amount: outstandingInvAmount },
        collectionRate,
        refundRate,
        activeStudents,
        activeParents,
        activeTutors,
        activeLessons,
        completedLessons,
        scheduledLessons,
        cancellationRate,
        tutorUtilization,
        studentAttendance,
        homeworkCompletion,
        parentSatisfaction,
        tutorSatisfaction,
        studentRetention,
        parentRetention,
        leadConversionRate,
        averageLessonRating,
        averageRevenuePerStudent,
        lifetimeCustomerValue,
      },
      commandCenterScores: scores,
      salesPipeline,
      studentAnalytics,
      parentAnalytics,
      tutorAnalytics,
      academicAnalytics,
      financialAnalytics,
      forecasting,
      alerts,
    };
  }
};
