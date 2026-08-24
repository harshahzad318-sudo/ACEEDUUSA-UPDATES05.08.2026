import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  jsonb,
  decimal,
  index,
} from "drizzle-orm/pg-core";

// ==========================================
// 1. LEADS & INQUIRIES
// ==========================================
export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    parentName: varchar("parent_name", { length: 255 }),
    studentName: varchar("student_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    gradeLevel: varchar("grade_level", { length: 100 }),
    curriculum: varchar("curriculum", { length: 100 }),
    subject: varchar("subject", { length: 100 }),
    learningMode: varchar("learning_mode", { length: 50 }),
    schedule: varchar("schedule", { length: 255 }),
    state: varchar("state", { length: 100 }),
    city: varchar("city", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    source: varchar("source", { length: 100 }).default("website"),
    status: varchar("status", { length: 50 }).default("new"), // new, contacted, assessment_scheduled, converted, archived
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdBy: varchar("created_by", { length: 255 }),
    updatedBy: varchar("updated_by", { length: 255 }),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("leads_email_idx").on(table.email),
    index("leads_status_idx").on(table.status),
    index("leads_created_at_idx").on(table.createdAt),
  ]
);

// ==========================================
// 2. BLOG & CONTENT MANAGEMENT
// ==========================================
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content"),
    category: varchar("category", { length: 100 }),
    author: varchar("author", { length: 255 }),
    imageUrl: text("image_url"),
    published: boolean("published").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdBy: varchar("created_by", { length: 255 }),
    updatedBy: varchar("updated_by", { length: 255 }),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_published_idx").on(table.published),
  ]
);

export const testimonials = pgTable(
  "testimonials",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 100 }),
    content: text("content").notNull(),
    rating: integer("rating").default(5),
    imageUrl: text("image_url"),
    state: varchar("state", { length: 100 }),
    published: boolean("published").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  }
);

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("chat_messages_session_idx").on(table.sessionId),
  ]
);

// ==========================================
// 3. AUTH, USERS & AUDIT LOGS
// ==========================================
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    uid: text("uid").notNull().unique(), // Firebase Auth UID
    email: text("email").notNull(),
    role: varchar("role", { length: 50 }).default("student"), // student, parent, tutor, admin
    fullName: varchar("full_name", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    status: varchar("status", { length: 50 }).default("active"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("users_uid_idx").on(table.uid),
    index("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
  ]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    userEmail: varchar("user_email", { length: 255 }),
    action: varchar("action", { length: 100 }).notNull(),
    resource: varchar("resource", { length: 100 }).notNull(),
    resourceId: varchar("resource_id", { length: 100 }),
    details: jsonb("details"),
    ipAddress: varchar("ip_address", { length: 45 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("audit_logs_user_email_idx").on(table.userEmail),
    index("audit_logs_action_idx").on(table.action),
    index("audit_logs_created_at_idx").on(table.createdAt),
  ]
);

// ==========================================
// 4. TUTOR ENTITY & RECRUITMENT
// ==========================================
export const tutors = pgTable(
  "tutors",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 50 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    avatarUrl: text("avatar_url"),

    title: varchar("title", { length: 255 }),
    bio: text("bio"),
    linkedinUrl: text("linkedin_url"),
    totalExperienceYears: integer("total_experience_years").default(0),

    degree: varchar("degree", { length: 255 }),
    major: varchar("major", { length: 255 }),
    institution: varchar("institution", { length: 255 }),
    graduationYear: integer("graduation_year"),

    previousInstitutions: text("previous_institutions"),
    onlineExperienceYears: integer("online_experience_years").default(0),
    gradeLevels: jsonb("grade_levels"), // Array of grade levels

    subjects: jsonb("subjects"), // Array of subjects taught
    curriculums: jsonb("curriculums"), // Array of curriculums taught
    learningModes: jsonb("learning_modes"), // Array e.g., ["Online", "In-Home"]
    availability: jsonb("availability"), // Weekly calendar JSON

    expectedRate: decimal("expected_rate", { precision: 10, scale: 2 }),
    finalRate: decimal("final_rate", { precision: 10, scale: 2 }),
    sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),
    margin: decimal("margin", { precision: 10, scale: 2 }),

    idType: varchar("id_type", { length: 100 }),
    idDocumentUrl: text("id_document_url"),
    identityVerified: boolean("identity_verified").default(false),

    resumeUrl: text("resume_url"),
    certificateUrls: jsonb("certificate_urls"), // Array of URLs
    demoVideoUrl: text("demo_video_url"),

    digitalSignature: text("digital_signature"),
    termsAccepted: boolean("terms_accepted").default(false),

    status: varchar("status", { length: 50 }).default("submitted"),
    // draft, submitted, under_review, interview_scheduled, interview_completed, verification_pending, approved, rejected, suspended, inactive

    interviewScheduledAt: timestamp("interview_scheduled_at"),
    interviewNotes: text("interview_notes"),
    internalRemarks: text("internal_remarks"),
    verificationChecklist: jsonb("verification_checklist"),
    aiSummary: text("ai_summary"),
    rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdBy: varchar("created_by", { length: 255 }),
    updatedBy: varchar("updated_by", { length: 255 }),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("tutors_email_idx").on(table.email),
    index("tutors_status_idx").on(table.status),
    index("tutors_rating_idx").on(table.rating),
    index("tutors_created_at_idx").on(table.createdAt),
  ]
);

// ==========================================
// 5. NORMALIZED PARENT & STUDENT DOMAINS
// ==========================================
export const parents = pgTable(
  "parents",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"), // Firebase Auth UID link if logged in
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 50 }),
    state: varchar("state", { length: 100 }),
    city: varchar("city", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    status: varchar("status", { length: 50 }).default("active"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("parents_email_idx").on(table.email),
    index("parents_status_idx").on(table.status),
  ]
);

export const students = pgTable(
  "students",
  {
    id: serial("id").primaryKey(),
    parentId: integer("parent_id").references(() => parents.id, { onDelete: "cascade" }),
    parentEmail: varchar("parent_email", { length: 255 }),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    photoUrl: text("photo_url"),
    dateOfBirth: varchar("date_of_birth", { length: 50 }),
    gender: varchar("gender", { length: 50 }),
    schoolName: varchar("school_name", { length: 255 }),
    gradeLevel: varchar("grade_level", { length: 100 }),
    curriculum: varchar("curriculum", { length: 100 }),
    subjects: jsonb("subjects"), // Array of subjects requiring support
    learningGoals: text("learning_goals"),
    medicalNotes: text("medical_notes"),
    learningDifficulties: text("learning_difficulties"),
    preferredTutorGender: varchar("preferred_tutor_gender", { length: 50 }),
    preferredTeachingMode: varchar("preferred_teaching_mode", { length: 50 }),
    preferredLanguage: varchar("preferred_language", { length: 100 }),
    emergencyContact: varchar("emergency_contact", { length: 255 }),
    parentNotes: text("parent_notes"),
    status: varchar("status", { length: 50 }).default("active"), // active, archived
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("students_parent_id_idx").on(table.parentId),
    index("students_parent_email_idx").on(table.parentEmail),
    index("students_status_idx").on(table.status),
  ]
);

export const tutorRequests = pgTable(
  "tutor_requests",
  {
    id: serial("id").primaryKey(),
    parentId: integer("parent_id").references(() => parents.id, { onDelete: "cascade" }),
    parentEmail: varchar("parent_email", { length: 255 }).notNull(),
    parentName: varchar("parent_name", { length: 255 }),
    studentId: integer("student_id").references(() => students.id, { onDelete: "set null" }),
    studentName: varchar("student_name", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 100 }).notNull(),
    curriculum: varchar("curriculum", { length: 100 }),
    gradeLevel: varchar("grade_level", { length: 100 }),
    learningMode: varchar("learning_mode", { length: 50 }).default("Online"), // Online, In-Person
    preferredDays: jsonb("preferred_days"), // Array e.g., ["Mon", "Wed", "Fri"]
    preferredTimes: varchar("preferred_times", { length: 255 }),
    budget: decimal("budget", { precision: 10, scale: 2 }),
    learningGoals: text("learning_goals"),
    preferredTutorGender: varchar("preferred_tutor_gender", { length: 50 }),
    preferredLanguage: varchar("preferred_language", { length: 100 }),
    additionalNotes: text("additional_notes"),
    status: varchar("status", { length: 50 }).default("New"), 
    // New, AI Matching, Admin Review, Tutor Contacted, Tutor Confirmed, Parent Confirmation, Scheduled, Active, Completed, Cancelled
    aiRecommendations: jsonb("ai_recommendations"), // Array of top matched tutor objects with scores
    assignedTutorId: integer("assigned_tutor_id").references(() => tutors.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("tutor_requests_parent_email_idx").on(table.parentEmail),
    index("tutor_requests_status_idx").on(table.status),
    index("tutor_requests_created_at_idx").on(table.createdAt),
  ]
);

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    senderEmail: varchar("sender_email", { length: 255 }).notNull(),
    senderName: varchar("sender_name", { length: 255 }),
    senderRole: varchar("sender_role", { length: 50 }).notNull(), // parent, tutor, admin
    receiverEmail: varchar("receiver_email", { length: 255 }).notNull(),
    receiverName: varchar("receiver_name", { length: 255 }),
    receiverRole: varchar("receiver_role", { length: 50 }).notNull(),
    subject: varchar("subject", { length: 255 }),
    content: text("content").notNull(),
    read: boolean("read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("messages_sender_idx").on(table.senderEmail),
    index("messages_receiver_idx").on(table.receiverEmail),
  ]
);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    type: varchar("type", { length: 50 }).default("general"),
    // tutor_assigned, lesson_reminder, homework_posted, lesson_summary, invoice_generated, payment_received, announcement
    link: text("link"),
    read: boolean("read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("notifications_user_email_idx").on(table.userEmail),
    index("notifications_read_idx").on(table.read),
  ]
);

// ==========================================
// 6. ASSIGNMENTS & MATCHING
// ==========================================
export const assignments = pgTable(
  "assignments",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id").references(() => leads.id, { onDelete: "set null" }),
    tutorId: integer("tutor_id").references(() => tutors.id, { onDelete: "cascade" }).notNull(),
    studentName: varchar("student_name", { length: 255 }),
    parentName: varchar("parent_name", { length: 255 }),
    parentEmail: varchar("parent_email", { length: 255 }),
    subject: varchar("subject", { length: 100 }).notNull(),
    gradeLevel: varchar("grade_level", { length: 100 }),
    learningMode: varchar("learning_mode", { length: 50 }),
    status: varchar("status", { length: 50 }).default("pending"), // pending, accepted, declined, cancelled
    tutorRate: decimal("tutor_rate", { precision: 10, scale: 2 }),
    parentPrice: decimal("parent_price", { precision: 10, scale: 2 }),
    margin: decimal("margin", { precision: 10, scale: 2 }),
    notes: text("notes"),
    assignedAt: timestamp("assigned_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("assignments_tutor_id_idx").on(table.tutorId),
    index("assignments_parent_email_idx").on(table.parentEmail),
    index("assignments_status_idx").on(table.status),
  ]
);

// ==========================================
// 7. LESSON SCHEDULING & ATTENDANCE
// ==========================================
export const lessons = pgTable(
  "lessons",
  {
    id: serial("id").primaryKey(),
    assignmentId: integer("assignment_id").references(() => assignments.id, { onDelete: "set null" }),
    tutorId: integer("tutor_id").references(() => tutors.id, { onDelete: "cascade" }).notNull(),
    studentName: varchar("student_name", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 100 }).notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    status: varchar("status", { length: 50 }).default("scheduled"), // scheduled, completed, cancelled, no_show
    meetingUrl: text("meeting_url"),
    attendanceLogged: boolean("attendance_logged").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("lessons_assignment_id_idx").on(table.assignmentId),
    index("lessons_tutor_id_idx").on(table.tutorId),
    index("lessons_status_idx").on(table.status),
    index("lessons_start_time_idx").on(table.startTime),
  ]
);

export const lessonNotes = pgTable(
  "lesson_notes",
  {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    tutorId: integer("tutor_id").references(() => tutors.id, { onDelete: "cascade" }).notNull(),
    studentName: varchar("student_name", { length: 255 }),
    subject: varchar("subject", { length: 100 }),
    summary: text("summary").notNull(),
    homeworkAssigned: text("homework_assigned"),
    studentProgress: varchar("student_progress", { length: 50 }).default("On Track"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("lesson_notes_lesson_id_idx").on(table.lessonId),
    index("lesson_notes_tutor_id_idx").on(table.tutorId),
  ]
);

export const lessonRecords = pgTable(
  "lesson_records",
  {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    tutorId: integer("tutor_id").references(() => tutors.id, { onDelete: "cascade" }).notNull(),
    tutorName: varchar("tutor_name", { length: 255 }).notNull(),
    studentName: varchar("student_name", { length: 255 }).notNull(),
    studentId: integer("student_id").references(() => students.id, { onDelete: "set null" }),
    parentEmail: varchar("parent_email", { length: 255 }),
    subject: varchar("subject", { length: 100 }).notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    attendance: varchar("attendance", { length: 50 }).default("Present"), // Present, Late, Absent, Excused
    lessonObjectives: jsonb("lesson_objectives"), // Array of strings
    topicsCovered: jsonb("topics_covered"), // Array of strings
    lessonSummary: text("lesson_summary").notNull(),
    keyConceptsLearned: jsonb("key_concepts_learned"), // Array of strings
    resourcesShared: jsonb("resources_shared"), // Array of { title: string, url: string, description?: string }
    homeworkAssigned: text("homework_assigned"),
    tutorFeedback: text("tutor_feedback"),
    studentParticipation: varchar("student_participation", { length: 100 }).default("Active & Engaged"),
    aiGeneratedRevisionSummary: text("ai_generated_revision_summary"),
    videoPolicy: jsonb("video_policy"), // { recordingEnabled: false, storageLocation: "external", autoExpiryDays: 30 }
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("lesson_records_lesson_id_idx").on(table.lessonId),
    index("lesson_records_tutor_id_idx").on(table.tutorId),
    index("lesson_records_student_name_idx").on(table.studentName),
    index("lesson_records_parent_email_idx").on(table.parentEmail),
  ]
);

// ==========================================
// 8. PAYMENTS, BILLING & FINANCIAL TRANSACTIONS
// ==========================================
export const tutorPayments = pgTable(
  "tutor_payments",
  {
    id: serial("id").primaryKey(),
    tutorId: integer("tutor_id").references(() => tutors.id, { onDelete: "cascade" }).notNull(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "set null" }),
    hours: decimal("hours", { precision: 5, scale: 2 }).default("1.00"),
    hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
    grossPayout: decimal("gross_payout", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 50 }).default("pending"), // pending, approved, paid
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("tutor_payments_tutor_id_idx").on(table.tutorId),
    index("tutor_payments_status_idx").on(table.status),
  ]
);

export const invoices = pgTable(
  "invoices",
  {
    id: serial("id").primaryKey(),
    parentId: integer("parent_id").references(() => parents.id, { onDelete: "set null" }),
    assignmentId: integer("assignment_id").references(() => assignments.id, { onDelete: "set null" }),
    invoiceNumber: varchar("invoice_number", { length: 100 }).notNull().unique(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 50 }).default("pending"), // pending, paid, overdue, cancelled
    dueDate: timestamp("due_date"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("invoices_parent_id_idx").on(table.parentId),
    index("invoices_status_idx").on(table.status),
  ]
);

// ==========================================
// 9. ANNOUNCEMENTS & SUPPORT TICKETS
// ==========================================
export const announcements = pgTable(
  "announcements",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    targetRole: varchar("target_role", { length: 50 }).default("tutor"),
    author: varchar("author", { length: 100 }).default("ACE Admin"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  }
);

export const supportTickets = pgTable(
  "support_tickets",
  {
    id: serial("id").primaryKey(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    userRole: varchar("user_role", { length: 50 }).default("tutor"),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 50 }).default("open"), // open, in_progress, resolved, closed
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("support_tickets_email_idx").on(table.userEmail),
    index("support_tickets_status_idx").on(table.status),
  ]
);
