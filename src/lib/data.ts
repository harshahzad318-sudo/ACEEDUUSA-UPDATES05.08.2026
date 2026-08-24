import { SEO_BLOG_POSTS } from "@/data/blogPostsCMS";

export const SUBJECTS = [
  { name: "Math", slug: "math", icon: "📐", description: "From arithmetic to calculus, our expert math tutors help students build confidence and master every concept.", color: "#3B82F6" },
  { name: "English", slug: "english", icon: "📝", description: "Comprehensive English tutoring covering grammar, composition, literature analysis, and communication skills.", color: "#8B5CF6" },
  { name: "Reading", slug: "reading", icon: "📚", description: "Develop strong reading comprehension, fluency, and critical analysis skills with personalized instruction.", color: "#EC4899" },
  { name: "Writing", slug: "writing", icon: "✍️", description: "From creative writing to academic essays, learn to express ideas clearly and persuasively.", color: "#F59E0B" },
  { name: "Science", slug: "science", icon: "🔬", description: "Explore the natural world through engaging, hands-on science tutoring tailored to your curriculum.", color: "#10B981" },
  { name: "Biology", slug: "biology", icon: "🧬", description: "Master biology concepts from cell biology to ecology with our experienced science tutors.", color: "#22C55E" },
  { name: "Chemistry", slug: "chemistry", icon: "⚗️", description: "Understand chemical reactions, molecular structures, and lab techniques with expert guidance.", color: "#06B6D4" },
  { name: "Physics", slug: "physics", icon: "⚡", description: "From mechanics to quantum physics, build strong foundations with patient, knowledgeable tutors.", color: "#6366F1" },
  { name: "Business", slug: "business", icon: "💼", description: "Master fundamental business concepts, organization, strategy, and operations.", color: "#F97316" },
  { name: "Accounting", slug: "accounting", icon: "📊", description: "Learn bookkeeping, auditing, corporate finance, and balance sheets clearly.", color: "#14B8A6" },
  { name: "Economics", slug: "economics", icon: "📈", description: "Gain a deep understanding of micro/macroeconomics, market dynamics, and global trade.", color: "#0EA5E9" },
  { name: "Sociology", slug: "sociology", icon: "👥", description: "Study human social behavior, communities, structural systems, and cultural relations.", color: "#A855F7" },
  { name: "History", slug: "history", icon: "🏛️", description: "Journey through world history, ancient civilizations, and major global events.", color: "#E11D48" },
  { name: "Geography", slug: "geography", icon: "🌍", description: "Analyze physical environments, map skills, human populations, and earth systems.", color: "#10B981" },
  { name: "Psychology", slug: "psychology", icon: "🧠", description: "Understand human cognition, mental processes, theories of mind, and behavior patterns.", color: "#D946EF" },
  { name: "Law", slug: "law", icon: "⚖️", description: "Explore constitutional, civil, criminal, and international legal frameworks.", color: "#6366F1" },
  { name: "ICT", slug: "ict", icon: "💻", description: "Build modern digital literacy, media skills, spreadsheet models, and information management.", color: "#0EA5E9" },
  { name: "Computer Science", slug: "computer-science", icon: "🖥️", description: "Master programming fundamentals, logic, data structures, algorithms, and software development.", color: "#3B82F6" },
  { name: "French", slug: "french", icon: "🇫🇷", description: "Speak, read, and write French fluently with conversation practice and grammar modules.", color: "#EF4444" },
  { name: "Spanish", slug: "spanish", icon: "🇪🇸", description: "Develop fluent Spanish pronunciation, vocabulary, sentence structures, and literacy.", color: "#F59E0B" },
  { name: "Chinese", slug: "chinese", icon: "🇨🇳", description: "Learn Chinese Mandarin pronunciation, characters, conversation, and reading comprehension.", color: "#DC2626" },
  { name: "Homework Help", slug: "homework-help", icon: "📋", description: "Daily homework support across all subjects to keep students on track and reduce family stress.", color: "#F97316" },
  { name: "Study Skills", slug: "study-skills", icon: "🎯", description: "Learn effective study strategies, time management, and organizational skills for academic success.", color: "#14B8A6" },
];

export const EXAMS = [
  { name: "SAT", slug: "sat", description: "Comprehensive SAT preparation with practice tests, strategy sessions, and score improvement guarantees.", icon: "📊", fullName: "Scholastic Assessment Test" },
  { name: "ACT", slug: "act", description: "Expert ACT tutoring covering all four sections with personalized study plans and practice materials.", icon: "📈", fullName: "American College Testing" },
  { name: "GED", slug: "ged", description: "Structured GED preparation to help adult learners earn their high school equivalency diploma.", icon: "🎓", fullName: "General Educational Development" },
  { name: "AP", slug: "ap", description: "Advanced Placement exam preparation across all AP subjects with college-level rigor.", icon: "🏆", fullName: "Advanced Placement" },
  { name: "IELTS", slug: "ielts", description: "International English Language Testing System preparation for academic and immigration purposes.", icon: "🌍", fullName: "International English Language Testing System" },
  { name: "TOEFL", slug: "toefl", description: "Test of English as a Foreign Language preparation for university admissions worldwide.", icon: "🗣️", fullName: "Test of English as a Foreign Language" },
];

export const LEARNING_SUPPORT = [
  { name: "ADHD Support", slug: "adhd", description: "Specialized tutoring strategies for students with ADHD, focusing on engagement, structure, and positive reinforcement.", icon: "🧠" },
  { name: "Dyslexia Support", slug: "dyslexia", description: "Evidence-based reading interventions and multisensory learning approaches for students with dyslexia.", icon: "📖" },
  { name: "Study Skills", slug: "study-skills-support", description: "Build executive functioning skills including organization, time management, and study strategies.", icon: "📅" },
  { name: "Homework Help", slug: "homework-support", description: "Daily structured homework support to build independence and reduce academic stress.", icon: "✅" },
];

export const STATES = [
  { name: "Alabama", slug: "alabama", abbr: "AL" },
  { name: "Alaska", slug: "alaska", abbr: "AK" },
  { name: "Arizona", slug: "arizona", abbr: "AZ" },
  { name: "Arkansas", slug: "arkansas", abbr: "AR" },
  { name: "California", slug: "california", abbr: "CA" },
  { name: "Colorado", slug: "colorado", abbr: "CO" },
  { name: "Connecticut", slug: "connecticut", abbr: "CT" },
  { name: "Delaware", slug: "delaware", abbr: "DE" },
  { name: "Florida", slug: "florida", abbr: "FL" },
  { name: "Georgia", slug: "georgia", abbr: "GA" },
  { name: "Hawaii", slug: "hawaii", abbr: "HI" },
  { name: "Idaho", slug: "idaho", abbr: "ID" },
  { name: "Illinois", slug: "illinois", abbr: "IL" },
  { name: "Indiana", slug: "indiana", abbr: "IN" },
  { name: "Iowa", slug: "iowa", abbr: "IA" },
  { name: "Kansas", slug: "kansas", abbr: "KS" },
  { name: "Kentucky", slug: "kentucky", abbr: "KY" },
  { name: "Louisiana", slug: "louisiana", abbr: "LA" },
  { name: "Maine", slug: "maine", abbr: "ME" },
  { name: "Maryland", slug: "maryland", abbr: "MD" },
  { name: "Massachusetts", slug: "massachusetts", abbr: "MA" },
  { name: "Michigan", slug: "michigan", abbr: "MI" },
  { name: "Minnesota", slug: "minnesota", abbr: "MN" },
  { name: "Mississippi", slug: "mississippi", abbr: "MS" },
  { name: "Missouri", slug: "missouri", abbr: "MO" },
  { name: "Montana", slug: "montana", abbr: "MT" },
  { name: "Nebraska", slug: "nebraska", abbr: "NE" },
  { name: "Nevada", slug: "nevada", abbr: "NV" },
  { name: "New Hampshire", slug: "new-hampshire", abbr: "NH" },
  { name: "New Jersey", slug: "new-jersey", abbr: "NJ" },
  { name: "New Mexico", slug: "new-mexico", abbr: "NM" },
  { name: "New York", slug: "new-york", abbr: "NY" },
  { name: "North Carolina", slug: "north-carolina", abbr: "NC" },
  { name: "North Dakota", slug: "north-dakota", abbr: "ND" },
  { name: "Ohio", slug: "ohio", abbr: "OH" },
  { name: "Oklahoma", slug: "oklahoma", abbr: "OK" },
  { name: "Oregon", slug: "oregon", abbr: "OR" },
  { name: "Pennsylvania", slug: "pennsylvania", abbr: "PA" },
  { name: "Rhode Island", slug: "rhode-island", abbr: "RI" },
  { name: "South Carolina", slug: "south-carolina", abbr: "SC" },
  { name: "South Dakota", slug: "south-dakota", abbr: "SD" },
  { name: "Tennessee", slug: "tennessee", abbr: "TN" },
  { name: "Texas", slug: "texas", abbr: "TX" },
  { name: "Utah", slug: "utah", abbr: "UT" },
  { name: "Vermont", slug: "vermont", abbr: "VT" },
  { name: "Virginia", slug: "virginia", abbr: "VA" },
  { name: "Washington", slug: "washington", abbr: "WA" },
  { name: "Washington DC", slug: "washington-dc", abbr: "DC" },
  { name: "West Virginia", slug: "west-virginia", abbr: "WV" },
  { name: "Wisconsin", slug: "wisconsin", abbr: "WI" },
  { name: "Wyoming", slug: "wyoming", abbr: "WY" },
];

export const CURRICULA = [
  { name: "Common Core", slug: "common-core" },
  { name: "AP", slug: "ap" },
  { name: "IB", slug: "ib" },
  { name: "IGCSE", slug: "igcse" },
  { name: "A Levels", slug: "a-levels" },
  { name: "SAT", slug: "sat" },
  { name: "ACT", slug: "act" },
  { name: "GED", slug: "ged" },
  { name: "IELTS", slug: "ielts" },
  { name: "TOEFL", slug: "toefl" },
];

export const PRICING = {
  online: {
    private: { price: 45, unit: "per hour" },
    group: { price: 25, unit: "per hour" },
    monthly10: { price: 382.5, unit: "10 hours/month", save: "15%" },
    monthly20: { price: 765, unit: "20 hours/month", save: "15%" },
  },
  inHome: {
    private: { price: 65, unit: "per hour" },
    group: { price: 40, unit: "per hour" },
    monthly10: { price: 552.5, unit: "10 hours/month", save: "15%" },
    monthly20: { price: 1105, unit: "20 hours/month", save: "15%" },
  },
  family: { discount: "15% off for 2+ siblings" },
};

export const TUTORS = [
  { name: "Dr. Sarah Mitchell", subject: "Mathematics", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80", rating: 4.9, students: 120, experience: "12 years", education: "Ph.D. Mathematics, MIT", bio: "Passionate about making math accessible and enjoyable for every student." },
  { name: "James Thompson", subject: "English & Writing", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80", rating: 4.8, students: 95, experience: "8 years", education: "M.A. English Literature, Columbia", bio: "Helping students find their voice through reading and writing." },
  { name: "Dr. Emily Chen", subject: "Science & Physics", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80", rating: 5.0, students: 85, experience: "10 years", education: "Ph.D. Physics, Stanford", bio: "Making complex scientific concepts intuitive and fascinating." },
  { name: "Michael Rodriguez", subject: "SAT & ACT Prep", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80", rating: 4.9, students: 200, experience: "15 years", education: "M.Ed. Education, Harvard", bio: "Proven strategies that have helped students increase scores by 200+ points." },
  { name: "Dr. Amanda Foster", subject: "Biology & Chemistry", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80", rating: 4.7, students: 110, experience: "9 years", education: "Ph.D. Biochemistry, UCLA", bio: "Bringing real-world science applications into every lesson." },
  { name: "Prof. David Kim", subject: "Learning Support", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80", rating: 4.9, students: 75, experience: "14 years", education: "M.S. Special Education, NYU", bio: "Specialized in ADHD and dyslexia support with evidence-based methods." },
];

export const TESTIMONIALS = [
  // ─── MATHEMATICS (Calculus, Algebra, Geometry, Elementary Math) ───
  { name: "Jennifer M.", role: "Parent, California", content: "ACE Education transformed my daughter's relationship with math. She went from struggling in standard Algebra 1 to earning straight A's and actually enjoying geometry.", rating: 5 },
  { name: "Marcus V.", role: "High School Student, Texas", content: "My calculus tutor made limits, derivatives, and integrals make perfect sense. Before joining ACE, I was failing. Now, I have a 95% in AP Calculus BC!", rating: 5 },
  { name: "Siddharth K.", role: "Parent, Illinois", content: "The level of instruction in math has been superb. My son was bored with school-level math. The tutor introduced him to advanced algebraic logic and competition-level mathematics.", rating: 5 },
  { name: "Audrey P.", role: "Parent, Georgia", content: "We started math tutoring for our 4th grader because she had huge learning gaps in fractions and division. Within two months, her math fluency and confidence skyrocketed.", rating: 5 },
  { name: "David S.", role: "Parent, Washington", content: "In-home geometry lessons were exactly what our son needed. The tactile visual aids and patient, step-by-step guidance turned homework time from a nightmare into a productive, positive routine.", rating: 5 },
  { name: "Brian O.", role: "College Student, Boston", content: "The college statistics tutor was incredible. I was struggling with probability models and linear regression, but she explained the formulas so intuitively.", rating: 5 },
  { name: "Gillian T.", role: "Parent, North Carolina", content: "Our tutor has been a lifesaver for middle school Pre-Algebra. She doesn't just give the answers; she teaches the underlying mathematical concepts and habits.", rating: 5 },
  { name: "Kyle B.", role: "High School Student, Oregon", content: "I was super stressed about high school trigonometry, but the visual diagrams and practice sets on the whiteboard helped me get an A on my midterm.", rating: 5 },
  { name: "Aria L.", role: "Parent, Colorado", content: "My daughter loves her elementary math lessons. The games, interactive tools, and colorful whiteboard worksheets make learning arithmetic fun and memorable.", rating: 5 },

  // ─── EXAM PREP (SAT, ACT, AP, IELTS, TOEFL) ───
  { name: "Robert K.", role: "Parent, New York", content: "The SAT prep program was exceptional. My son's score improved by an incredible 320 points, and he has now been accepted into his dream Ivy League school.", rating: 5 },
  { name: "Clara J.", role: "SAT Student, New Jersey", content: "The Digital SAT math tricks and grammar shortcuts I learned here were mind-blowing. My SAT score jumped from an 1180 diagnostic to a 1490 official score!", rating: 5 },
  { name: "Zackary E.", role: "Parent, Florida", content: "We did an intensive 40-hour SAT course over the summer. The improvement in my daughter's reading and writing score was outstanding. Best academic investment we've ever made.", rating: 5 },
  { name: "Chloe W.", role: "ACT Student, Ohio", content: "I went from a 24 on my diagnostic ACT to a 31 on my final exam! The science section prep and time-management strategies were particularly helpful.", rating: 5 },
  { name: "Derek F.", role: "Parent, Michigan", content: "The AP Physics and AP Calculus exam review sessions prepared my son perfectly. The tutor analyzed old free-response questions and guided him on how to secure full points.", rating: 5 },
  { name: "Yasmin A.", role: "IELTS Student, California", content: "I needed a band score of 7.5 for my university admission. Thanks to the speaking feedback, essay grading, and mock tests, I achieved a band score of 8.0!", rating: 5 },
  { name: "Lucas M.", role: "Parent, Massachusetts", content: "We hired an SAT specialist for our twins. Both of them achieved scores in the top 2% nationally. The diagnostic updates and progress logs kept us fully informed.", rating: 5 },
  { name: "Meera R.", role: "TOEFL Student, Arizona", content: "The speaking and listening exercises prepared me so well for the actual TOEFL exam. I got a 112 score on my first try! Thank you so much, ACE!", rating: 5 },
  { name: "Julian G.", role: "Parent, Maryland", content: "Highly recommend their SAT math tutoring! My daughter went from a 580 to a 740 in the math section alone. Outstanding strategies and certified instructors.", rating: 5 },

  // ─── SPECIAL NEEDS & LEARNING SUPPORT (ADHD, Dyslexia, Orton-Gillingham) ───
  { name: "Sarah L.", role: "Parent, Texas", content: "As a parent of a child with ADHD, finding the right tutor was critical. ACE's learning support team has been incredible—teaching executive functioning, planner management, and active focus skills.", rating: 5 },
  { name: "Ethan H.", role: "Parent, Minnesota", content: "My 3rd-grade son has severe dyslexia and was falling behind in reading. The Orton-Gillingham certified specialist from ACE has been patient, engaging, and absolutely brilliant.", rating: 5 },
  { name: "Patricia N.", role: "Parent, Arizona", content: "The executive functioning support has changed our lives. Our daughter learned how to break large school assignments down, organize her notes, and overcome homework procrastination.", rating: 5 },
  { name: "Regina S.", role: "Parent, Pennsylvania", content: "My son with ADHD is highly energetic and struggled with traditional tutoring. His ACE tutor uses active, multi-sensory math games that keep him 100% engaged and learning.", rating: 5 },
  { name: "Owen D.", role: "Parent, Connecticut", content: "Excellent dyslexia support! Our daughter's phonics, spelling, and reading comprehension have improved dramatically. She actually looks forward to her lessons now.", rating: 5 },
  { name: "Sophia K.", role: "Parent, Indiana", content: "The patience and care shown by our learning support specialist are unmatched. They coordinate directly with our child's IEP school team to ensure seamless curriculum alignment.", rating: 5 },
  { name: "Mateo R.", role: "Parent, Nevada", content: "Our child has auditory processing challenges. The tutor's clear, multi-sensory visual representations and calm demeanor have made mathematics feel safe and exciting.", rating: 5 },

  // ─── GED & ADULT LEARNERS ───
  { name: "Thomas H.", role: "Adult Learner, Virginia", content: "The GED preparation program helped me achieve my high school equivalency credentials in record time. Professional, patient, and incredibly effective tutors.", rating: 5 },
  { name: "Vanessa D.", role: "Adult Learner, Kentucky", content: "I was out of school for 15 years and terrified of the GED math exam. My tutor broke the algebra down into simple, logical pieces. I passed on my first attempt!", rating: 5 },
  { name: "Andre J.", role: "Adult Learner, Georgia", content: "Superb GED science and essay writing coaching. The lessons were flexible and fit perfectly into my busy evening work schedule.", rating: 5 },
  { name: "Melissa S.", role: "Adult Learner, Wisconsin", content: "Highly structured GED course! I went from failing my diagnostic practice test to easily scoring in the 'college-ready' range on all four subjects.", rating: 5 },

  // ─── SCIENCES (Physics, Chemistry, Biology) ───
  { name: "Dr. Emily Chen", role: "Parent, California", content: "My son was struggling with physics kinematics and forces. The 1-on-1 physics specialist from ACE explained the vector math and formulas so clearly that physics is now his favorite subject.", rating: 5 },
  { name: "Austin Y.", role: "High School Student, Utah", content: "AP Chemistry was a nightmare until I started working with my ACE tutor. He made thermodynamics, chemical equilibrium, and acid-base reactions feel like a fun puzzle.", rating: 5 },
  { name: "Teresa L.", role: "Parent, Virginia", content: "Excellent honors biology prep! My daughter went from a C- to an A in high school biology. She learned how to study active recall and diagram cell division.", rating: 5 },
  { name: "Justin M.", role: "High School Student, Missouri", content: "My physics tutor helped me ace my mechanics and electromagnetism tests. The online whiteboard recordings are awesome for revising before finals.", rating: 5 },
  { name: "Gabriella V.", role: "Parent, Tennessee", content: "The high school organic chemistry lessons were highly professional. The tutor's deep biochemistry knowledge and clear analogies saved our daughter's GPA.", rating: 5 },

  // ─── ENGLISH & WRITING ───
  { name: "Helena P.", role: "Parent, Washington DC", content: "Our English tutor helped our middle-schooler with essay writing, thesis development, and advanced grammar. His school essays are now organized, persuasive, and beautifully written.", rating: 5 },
  { name: "Jason L.", role: "High School Student, Illinois", content: "The college application essay coaching was elite. The tutor helped me find my voice, structure my personal statement, and polish my writing to perfection.", rating: 5 },
  { name: "Nora B.", role: "Parent, Alabama", content: "Outstanding elementary reading comprehension support. The tutor's interactive reading logs and phonics exercises turned our reluctant reader into a bookworm.", rating: 5 },
  { name: "Raymond K.", role: "Parent, Massachusetts", content: "My daughter's English literature grades went from a B- to an A. She learned how to write high-impact literary analyses and annotate complex texts.", rating: 5 },

  // ─── HOMESCHOOL SUPPORT ───
  { name: "Maria G.", role: "Parent, Illinois", content: "We enrolled both our children in homeschool daytime support. The curriculum matching and daily lesson planning made homeschooling stress-free and highly structured.", rating: 5 },
  { name: "Danielle F.", role: "Parent, New Hampshire", content: "Our tutor acts as our homeschool science and math coordinator. Having an elite Stanford grad teach my kids 1-on-1 at home during the day has been an incredible privilege.", rating: 5 },
  { name: "Oliver S.", role: "Parent, Kansas", content: "The sibling package and flexible schedule allowed us to coordinate homeschool math and English tutoring in back-to-back blocks. Highly cost-effective and elite quality.", rating: 5 },
  { name: "David W.", role: "Parent, Florida", content: "The online tutoring platform is so convenient for our homeschooling family. Our tutor is always prepared, highly engaging, and aligns lessons directly with standard high school milestones.", rating: 5 }
];

const mappedCmsPosts = SEO_BLOG_POSTS.map((p) => ({
  title: p.h1,
  slug: p.slug,
  category: p.category,
  excerpt: p.metaDescription,
  date: `${p.publishedDate} • 8 min read`,
  image: p.heroImage.url,
}));

export const BLOG_POSTS = [
  ...mappedCmsPosts,
  {
    title: "10 Study Habits of Top Students That You Can Follow",
    slug: "study-habits-top-students",
    category: "Study Tips",
    excerpt: "Discover study habits and methods that top-performing students use to maintain their high grades and boost focus.",
    date: "May 10, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Help Your Child Stay Focused While Studying",
    slug: "child-stay-focused",
    category: "Parent Guide",
    excerpt: "Learn how to eliminate study distractions and build high-quality homework focus routines with your children.",
    date: "May 8, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "A Parent's Guide to College Admissions in the USA",
    slug: "college-admissions-usa",
    category: "College Planning",
    excerpt: "Navigating the college admissions process in the US can be complicated. This comprehensive guide covers all bases.",
    date: "May 6, 2025 • 7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Understanding Common Core Standards: What Parents Need to Know",
    slug: "common-core-parent-guide",
    category: "Parent Guide",
    excerpt: "A clear, jargon-free explanation of Common Core standards and how they affect your child's education.",
    date: "Nov 28, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "College Application Timeline: A Complete Planning Guide",
    slug: "college-application-timeline",
    category: "College Planning",
    excerpt: "Month-by-month guide to help students and parents navigate the college application process successfully.",
    date: "Nov 20, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Effective Homework Strategies for Elementary Students",
    slug: "homework-strategies-elementary",
    category: "Homework Help",
    excerpt: "Age-appropriate homework tips that build independence and reduce stress for young learners and their families.",
    date: "Nov 15, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },

  // ─── NEW 50 SEO-OPTIMIZED BLOG ARTICLES ───
  {
    title: "The Ultimate Guide to the Digital SAT: Section-by-Section Strategies",
    slug: "exam-prep-digital-sat-strategies",
    category: "Exam Prep",
    excerpt: "Master the new digital format of the SAT. Learn expert strategy for reading, writing, and math sections to boost your score.",
    date: "Jul 15, 2026 • 8 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Create an Effective Homeschool Schedule in Texas",
    slug: "homeschool-schedule-texas-guide",
    category: "Homeschooling",
    excerpt: "Discover standard laws, curriculum selection, and step-by-step daytime schedule building for Texas homeschooling families.",
    date: "Jul 12, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Executive Functioning Skills for High Schoolers with ADHD",
    slug: "executive-functioning-skills-adhd",
    category: "ADHD Support",
    excerpt: "Help your child develop focus habits, organization techniques, and desk management systems customized for ADHD minds.",
    date: "Jul 10, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Complete Guide to AP Exam Preparation: How to Score a 5",
    slug: "ap-exam-preparation-score-5",
    category: "Exam Prep",
    excerpt: "A tactical guide on how to study active recall, analyze past free-response questions, and secure top AP scores.",
    date: "Jul 08, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Demystifying the Common Application Essay: Prompt Breakdown",
    slug: "demystifying-common-app-essay",
    category: "College Planning",
    excerpt: "Analyze each Common App essay prompt and learn how to draft a personal statement that admission offices love.",
    date: "Jul 05, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Teach Fractions to Struggling Elementary Schoolers",
    slug: "teach-fractions-struggling-elementary",
    category: "Math Tutoring",
    excerpt: "Discover tactile visual aids, visual games, and intuitive number lines that make elementary fractions click for kids.",
    date: "Jul 02, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Orton-Gillingham Method: Dyslexia Reading Support Explained",
    slug: "orton-gillingham-dyslexia-reading-support",
    category: "Dyslexia Support",
    excerpt: "Learn how multisensory structures, visual phonics, and tactile feedback help students with dyslexia read with confidence.",
    date: "Jun 28, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Navigating the FAFSA: A Step-by-Step Financial Aid Guide",
    slug: "fafsa-financial-aid-guide",
    category: "College Planning",
    excerpt: "A complete, easy-to-understand breakdown of the FAFSA process, submission deadlines, and securing financial aid packages.",
    date: "Jun 25, 2026 • 8 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "High School Physics: Survival Tips for Mechanics and Waves",
    slug: "high-school-physics-mechanics-tips",
    category: "Exam Prep",
    excerpt: "Learn standard formula translation tricks, vector calculus basics, and simple rules to master AP or honors physics.",
    date: "Jun 22, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "ACT vs SAT: Which Test is Best for Your Student?",
    slug: "act-vs-sat-which-test-is-best",
    category: "Exam Prep",
    excerpt: "Compare pacing, science sections, math focus, and reading layouts of both tests to pick the optimal pathway.",
    date: "Jun 19, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Dyscalculia Support: Creative Math Strategies for Visual Learners",
    slug: "dyscalculia-support-math-visual-learners",
    category: "Math Tutoring",
    excerpt: "Discover multi-sensory techniques and spatial block models designed to bypass numeric sequencing challenges.",
    date: "Jun 16, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in Florida: Understanding State Laws & Requirements",
    slug: "homeschooling-florida-laws-requirements",
    category: "Homeschooling",
    excerpt: "Navigating portfolio audits, standardized exam rules, and notice letters for Florida private homeschool programs.",
    date: "Jun 12, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Overcoming Math Anxiety: Build Confidence in Pre-Algebra",
    slug: "overcoming-math-anxiety-pre-algebra",
    category: "Math Tutoring",
    excerpt: "How parents and 1-on-1 tutors can use positive reinforcement to transform performance in foundational algebra.",
    date: "Jun 09, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Writing Persuasive Essays: A Step-by-Step Writing Guide",
    slug: "writing-persuasive-essays-guide",
    category: "English & Writing",
    excerpt: "Learn how to draft robust thesis statements, formulate paragraphs, and format persuasive arguments.",
    date: "Jun 06, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "AP Chemistry Survival Guide: Mastery of Acid-Base Equilibriums",
    slug: "ap-chemistry-acid-base-equilibrium",
    category: "Exam Prep",
    excerpt: "Demystify standard buffer systems, titration mechanics, and high-impact formulas on the AP Chemistry test.",
    date: "Jun 03, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Is Homeschooling Right for My ADHD Child? Pros and Cons",
    slug: "homeschooling-adhd-child-pros-cons",
    category: "Homeschooling",
    excerpt: "Explore the potential benefits of custom self-paced lessons vs. traditional social classroom structures for neurodivergent minds.",
    date: "May 28, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Best Extra-Curricular Activities for Ivy League Admissions",
    slug: "extra-curricular-activities-ivy-league",
    category: "College Planning",
    excerpt: "Learn how to establish unique focus spikes and leadership portfolios rather than generic, crowded resumes.",
    date: "May 25, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Phonics vs. Whole Language: The Science of Reading Demystified",
    slug: "science-of-reading-phonics-vs-whole-language",
    category: "Parent Guide",
    excerpt: "A parent guide on modern speech-to-print instruction, reading fluency, and building childhood vocabulary.",
    date: "May 22, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Understanding the New Digital SAT Grammar Rules",
    slug: "digital-sat-grammar-rules-guide",
    category: "Exam Prep",
    excerpt: "Master punctuation guidelines, transition requirements, and typical grammar traps on the updated Digital SAT format.",
    date: "May 19, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "GED Math Prep: Core Algebra Concepts You Need to Know",
    slug: "ged-math-prep-core-algebra",
    category: "Exam Prep",
    excerpt: "A supportive breakdown of algebraic formulas, slopes, and equations crucial for passing the GED math exam.",
    date: "May 16, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Standardized Tests in California: A Guide to SBAC Assessments",
    slug: "california-sbac-standardized-tests-guide",
    category: "Parent Guide",
    excerpt: "An overview of SBAC scoring rubrics, grade-level requirements, and custom strategies to support students.",
    date: "May 12, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "New York Regents Exams: Complete Survival Guide for High Schoolers",
    slug: "new-york-regents-exams-survival-guide",
    category: "Exam Prep",
    excerpt: "Everything you need to know about preparing for English, Math, and History NY Regents exams for diploma points.",
    date: "May 09, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Structure a College Personal Statement That Stands Out",
    slug: "structure-college-personal-statement",
    category: "College Planning",
    excerpt: "Create a compelling hook, format cohesive transitions, and write an editorial personal statement for US colleges.",
    date: "May 06, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Dyslexia Accommodations: IEP and 504 Plan Tips for Parents",
    slug: "dyslexia-accommodations-iep-504-plan",
    category: "Dyslexia Support",
    excerpt: "Learn how to ask for standard accommodations, double testing time, and assistive technology for dyslexic students.",
    date: "May 03, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Algebra 2 Word Problems: Simple Steps to Translate & Solve",
    slug: "algebra-2-word-problems-translate-solve",
    category: "Math Tutoring",
    excerpt: "A simple visual blueprint to break down dense word problems into clean equations and solve with precision.",
    date: "Apr 28, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Benefits of Daytime Homeschool Tutoring Programs",
    slug: "benefits-daytime-homeschool-tutoring",
    category: "Homeschooling",
    excerpt: "Why coordinating daytime structured lessons with certified tutors maintains healthy routines and limits parent burnout.",
    date: "Apr 25, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Help Your Child Transition from Middle to High School",
    slug: "transition-middle-to-high-school",
    category: "Parent Guide",
    excerpt: "Expert advice on structural differences, GPA trackers, study speed, and supporting physical and mental wellness.",
    date: "Apr 22, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Active Recall and Spaced Repetition: Ultimate Study Guide",
    slug: "active-recall-spaced-repetition-study-guide",
    category: "Study Tips",
    excerpt: "Boost visual and cognitive memory using evidence-based active recall flashcards, practice tests, and calendar planning.",
    date: "Apr 19, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "IELTS Academic Writing Task 2: How to Structure a Band 8 Essay",
    slug: "ielts-academic-writing-task-2-structure",
    category: "Exam Prep",
    excerpt: "Master essay criteria, paragraph formats, and complex sentence structures required for elite IELTS band points.",
    date: "Apr 16, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "TOEFL Speaking Section: Template and Delivery Tips for High Scores",
    slug: "toefl-speaking-section-template-tips",
    category: "Exam Prep",
    excerpt: "Get complete pacing guides, template responses, and speaking advice to secure top marks on the TOEFL test.",
    date: "Apr 12, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "A Parent's Guide to High School Course Selection for College",
    slug: "parent-guide-high-school-course-selection",
    category: "Parent Guide",
    excerpt: "How to balance AP vs. Dual Enrollment, Honors courses, and elective selections to impress selective US colleges.",
    date: "Apr 09, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Orton-Gillingham Approach: Multisensory Dyslexia Phonics",
    slug: "orton-gillingham-multisensory-dyslexia-phonics",
    category: "Dyslexia Support",
    excerpt: "Discover specific examples of Orton-Gillingham reading exercises that connect spelling patterns and sound codes easily.",
    date: "Apr 06, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Elementary Reading Fluency: Fun Games and Daily Routines",
    slug: "elementary-reading-fluency-games-routines",
    category: "Parent Guide",
    excerpt: "Engage young readers with phonics bingo, tracking logs, and collaborative storytime routines that build confidence.",
    date: "Apr 03, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "AP Biology Tips: Memorizing Macromolecules and Cellular Respiration",
    slug: "ap-biology-macromolecules-cellular-respiration",
    category: "Exam Prep",
    excerpt: "Simple visual diagrams, memorization tools, and essay structures to ace difficult AP Biology units.",
    date: "Mar 28, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "GED Essay Writing: How to Write a High-Scoring Argumentative Essay",
    slug: "ged-essay-writing-argumentative-essay",
    category: "Exam Prep",
    excerpt: "A complete blueprint covering thesis writing, analyzing conflicting evidence, and avoiding grammatical errors.",
    date: "Mar 25, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in Ohio: Notice of Intent and Assessment Rules",
    slug: "homeschooling-ohio-notice-intent-assessment",
    category: "Homeschooling",
    excerpt: "Understanding updated Ohio homeschooling notifications, portfolio requirements, and narrative review policies.",
    date: "Mar 22, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Why Executive Functioning Coaching is Crucial for College Prep",
    slug: "executive-functioning-coach-college-prep",
    category: "Study Tips",
    excerpt: "How coaching planner management, time-blocking, and focus strategies saves freshmen from common transition pitfalls.",
    date: "Mar 19, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "High School Trigonometry: Understanding the Unit Circle Simply",
    slug: "trigonometry-unit-circle-simple-guide",
    category: "Math Tutoring",
    excerpt: "Learn simple acronyms, coordinate quadrant signs, and geometric layouts to remember sine and cosine coordinates.",
    date: "Mar 16, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Common Grammatical Errors in College Admission Essays",
    slug: "common-grammatical-errors-college-essays",
    category: "College Planning",
    excerpt: "Review key errors in comma splices, passive verbs, and run-on sentences that detract from your writing style.",
    date: "Mar 12, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "AP English Literature: Ultimate Guide to Prose and Poetry Analysis",
    slug: "ap-english-literature-prose-poetry",
    category: "Exam Prep",
    excerpt: "Learn how to annotate complex poetry structures and write high-scoring prose analysis essays for AP points.",
    date: "Mar 09, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in North Carolina: Standardized Testing Laws",
    slug: "homeschooling-north-carolina-testing-laws",
    category: "Homeschooling",
    excerpt: "Understand North Carolina homeschool registration, mandatory attendance guidelines, and testing schedules.",
    date: "Mar 06, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Elementary Math Gaps: Identifying and Fixing Division Struggles",
    slug: "elementary-math-gaps-division-struggles",
    category: "Math Tutoring",
    excerpt: "A diagnostic approach for parents to pinpoint long division confusion and address mathematical foundations.",
    date: "Mar 03, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Managing Screen Time and Study Focus: A Parent's Protocol",
    slug: "managing-screen-time-study-focus-protocol",
    category: "Parent Guide",
    excerpt: "Establish distraction-free digital environments, focus blocks, and high-impact physical study boundaries at home.",
    date: "Feb 28, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Understanding the SAT Score Report: Percentiles and Benchmarks",
    slug: "understanding-sat-score-report-percentiles",
    category: "College Planning",
    excerpt: "Analyze what score percentiles, subscores, and math/reading benchmarks indicate for your student's college choices.",
    date: "Feb 25, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "AP Environmental Science Prep: Core Themes and Essay Strategies",
    slug: "ap-environmental-science-prep-strategies",
    category: "Exam Prep",
    excerpt: "A supportive study guide covering key ecological formulas, biogeochemical cycles, and FRQ answer formats.",
    date: "Feb 22, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "GED Social Studies Study Guide: Analyzing Historical Documents",
    slug: "ged-social-studies-analyzing-historical-documents",
    category: "Exam Prep",
    excerpt: "How to read and interpret graphs, charts, and historical text snippets to secure GED passing scores.",
    date: "Feb 19, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Dyslexia vs. ADHD: Understanding Overlapping Learning Profiles",
    slug: "dyslexia-vs-adhd-overlapping-learning-profiles",
    category: "Parent Guide",
    excerpt: "How attention challenges and phonological awareness issues interact, and how to configure optimal learning structures.",
    date: "Feb 16, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Middle School Essay Structure: Mastering the Five-Paragraph Model",
    slug: "middle-school-essay-structure-five-paragraph",
    category: "English & Writing",
    excerpt: "Build early writing speed by structuring introduction paragraphs, supporting details, and clean summaries.",
    date: "Feb 12, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Create a Quiet, High-Focus Study Space at Home",
    slug: "create-high-focus-study-space-home",
    category: "Parent Guide",
    excerpt: "Practical interior design, lighting, noise isolation, and visual layouts that trigger a student's flow state.",
    date: "Feb 09, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Importance of Early Diagnostics in K-12 Reading Comprehension",
    slug: "importance-early-diagnostics-reading-comprehension",
    category: "Parent Guide",
    excerpt: "Why early testing in phonemic awareness and decoding skills prevents larger reading struggles in later high school years.",
    date: "Feb 05, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in Texas: Registration, Curriculums, and Local Support",
    slug: "homeschooling-texas-laws-curriculums",
    category: "Homeschooling",
    excerpt: "Navigate the highly flexible homeschooling regulations in Texas. Learn about the Leeper case, curriculum requirements, and local cooperative associations.",
    date: "Feb 02, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in Florida: Portfolio Reviews and Step-by-Step Laws",
    slug: "homeschooling-florida-portfolio-reviews",
    category: "Homeschooling",
    excerpt: "A complete parent's guide to Florida's letter of intent, maintaining a physical reading portfolio, and preparing for mandatory annual teacher evaluations.",
    date: "Jan 29, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "SAT Prep in California: Navigating Test-Optional Policies and Score Spikes",
    slug: "sat-prep-california-test-optional-policies",
    category: "Exam Prep",
    excerpt: "How California high schoolers can leverage high SAT scores in out-of-state applications and private universities despite UC system test-blind rules.",
    date: "Jan 26, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "College Admissions in Texas: Understanding the Top 10% Rule Simply",
    slug: "college-admissions-texas-top-ten-percent-rule",
    category: "College Planning",
    excerpt: "Understand how the automatic admission program works for Texas public universities like UT Austin and Texas A&M, and what it means for your application.",
    date: "Jan 22, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Admissions Tips for NY Universities: Columbia, NYU, and Cornell Requirements",
    slug: "admissions-tips-ny-universities-nyu-columbia-cornell",
    category: "College Planning",
    excerpt: "An insider lookup at what selective universities in New York look for, including essay spikes, portfolio standards, and interview techniques.",
    date: "Jan 18, 2026 • 7 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Handle ADHD Inattention During Math Homework: Tutor Techniques",
    slug: "handle-adhd-inattention-math-homework-tutor-techniques",
    category: "Study Tips",
    excerpt: "Discover multi-sensory techniques, chunking math topics, and active movement routines that specialized ADHD tutors use to keep students focused.",
    date: "Jan 15, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Dyslexia Interventions: Orton-Gillingham Phonics for Middle Schoolers",
    slug: "dyslexia-interventions-orton-gillingham-phonics-middle-school",
    category: "Parent Guide",
    excerpt: "Why the systematic multisensory Orton-Gillingham approach remains the gold standard for decoding and reading fluency in secondary grades.",
    date: "Jan 11, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "AP Calculus Prep: Solving Limits and Derivatives for Perfect Scores",
    slug: "ap-calculus-prep-solving-limits-derivatives",
    category: "Exam Prep",
    excerpt: "Tips and practice breakdowns to master fundamental calculus limits, continuity proofs, and rate of change derivatives for AP exams.",
    date: "Jan 08, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "GED Math Prep: Core Algebra Formulas Every Candidate Must Memorize",
    slug: "ged-math-prep-core-algebra-formulas",
    category: "Exam Prep",
    excerpt: "Your essential formula study sheet for the GED Math section. Master linear equations, slope ratios, and basic quadratic models.",
    date: "Jan 04, 2026 • 5 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Importance of Intellectual Vitality in Ivy League Admissions",
    slug: "intellectual-vitality-ivy-league-admissions",
    category: "College Planning",
    excerpt: "Go beyond standard grades and high-test percentiles. Learn how to demonstrate authentic scholarly curiosity and research spike profiles.",
    date: "Jan 01, 2026 • 6 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How Much Does a Tutor Cost in the USA? 2026 Tuition Guide",
    slug: "how-much-does-a-tutor-cost-usa",
    category: "Tuition & Costs",
    excerpt: "Understand the current pricing standards for in-home and online tutoring across the US. Discover what factors affect rates and how to get maximum value.",
    date: "Dec 28, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Private Tutoring in New York City: Finding the Right Match",
    slug: "private-tutoring-new-york-city",
    category: "Local Guides",
    excerpt: "Navigating NYC's competitive academic environment can be tough. Learn how to find premium private tutoring customized to NYC district standards.",
    date: "Dec 24, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "California Homeschooling Laws & Curriculum Planning for Parents",
    slug: "california-homeschooling-laws-guide",
    category: "Homeschooling",
    excerpt: "A step-by-step breakdown of California's private school affidavit (PSA) process and tips for creating an engaging home study program.",
    date: "Dec 21, 2025 • 7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Boston Exam Schools: Expert Prep for ISEE and SSAT Admissions",
    slug: "boston-exam-schools-isee-ssat",
    category: "Exam Prep",
    excerpt: "Master the key sections of the ISEE and SSAT exams. Gain competitive advantages for admission into Boston's top-tier exam academies.",
    date: "Dec 18, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Texas STAAR Test Prep: Strategies for Elementary and Middle Schoolers",
    slug: "texas-staar-test-prep-strategies",
    category: "Exam Prep",
    excerpt: "Boost your child's confidence and performance on the STAAR test with structured study plans, mock exams, and stress-reduction tips.",
    date: "Dec 15, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Florida Homeschool Evaluators: What Parents Need to Know",
    slug: "florida-homeschool-evaluators-guide",
    category: "Homeschooling",
    excerpt: "Learn how to select qualified homeschool evaluators in Florida and prepare your child's portfolio for an stress-free annual review.",
    date: "Dec 12, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Chicago Public Schools Selective Enrollment: How to Prepare",
    slug: "chicago-public-schools-selective-enrollment",
    category: "Local Guides",
    excerpt: "Get a comprehensive understanding of the CPS admissions test, key deadlines, and scoring mechanisms for selective high schools.",
    date: "Dec 09, 2025 • 7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Why AP Computer Science is the Ultimate High School Tech Gateway",
    slug: "why-ap-computer-science-high-school",
    category: "Study Tips",
    excerpt: "Discover how AP Computer Science builds critical thinking, programming fundamentals, and sets a strong foundation for STEM careers.",
    date: "Dec 05, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "ACT vs. SAT: Which College Entrance Exam Fits Your Child Best?",
    slug: "act-vs-sat-college-entrance-exam",
    category: "College Planning",
    excerpt: "Compare timing, content structure, and pacing differences between the ACT and SAT to make the most strategic decision for college applications.",
    date: "Dec 02, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Orton-Gillingham Dyslexia Program: Implementation at Home",
    slug: "orton-gillingham-dyslexia-home-implementation",
    category: "Dyslexia Support",
    excerpt: "A practical guide for parents to integrate sensory-rich reading, sound-symbol relationships, and phonological exercises into daily learning.",
    date: "Nov 29, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "ADHD Coaching vs. Subject Tutoring: Key Differences and Benefits",
    slug: "adhd-coaching-vs-subject-tutoring",
    category: "ADHD Support",
    excerpt: "Learn how ADHD coaching for executive functioning differs from standard curriculum tutoring, and how to combine them for maximum impact.",
    date: "Nov 25, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Mastering High School Chemistry: Study Techniques for AP and Honors",
    slug: "mastering-high-school-chemistry",
    category: "Study Tips",
    excerpt: "Master chemical equations, stoichiometry, and thermodynamical principles with active recall study sheets and visualization hacks.",
    date: "Nov 22, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Online Tutoring vs. In-Home Tutoring: Pros, Cons, and Academic Outcomes",
    slug: "online-tutoring-vs-in-home-tutoring",
    category: "Parent Guide",
    excerpt: "Examine key differences in engagement, convenience, schedule flexibility, and score improvements between online and offline models.",
    date: "Nov 19, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Get a Perfect 1600 on the Digital SAT: Top Expert Secrets",
    slug: "perfect-1600-digital-sat-secrets",
    category: "Exam Prep",
    excerpt: "Insights from perfect-scorers on the digital adaptive format. Master key math formulas, vocabulary trends, and time management tricks.",
    date: "Nov 15, 2025 • 7 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Value of Micro-Credentials in High School: Boosting College Apps",
    slug: "micro-credentials-high-school-college",
    category: "College Planning",
    excerpt: "Explore how specialized certificates, coding bootcamps, and dual-enrollment courses add academic rigor to your high school transcript.",
    date: "Nov 12, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Prepare for the NYC SHSAT Math Section",
    slug: "nyc-shsat-math-section-prep",
    category: "Exam Prep",
    excerpt: "Understand the high-frequency math concepts on the Specialized High Schools Admissions Test and learn rapid-fire calculation techniques.",
    date: "Nov 08, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Tutoring Rates in Los Angeles: High School vs. College Prep Costs",
    slug: "tutoring-rates-los-angeles-guide",
    category: "Tuition & Costs",
    excerpt: "Get a clear picture of tutoring price tags in LA districts. Compare standard rates for elementary, high school honors, and college-bound prep.",
    date: "Nov 05, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Homeschooling in Washington State: Declarations of Intent and Rules",
    slug: "homeschooling-washington-state-rules",
    category: "Homeschooling",
    excerpt: "A practical walkthrough of Washington State homeschool guidelines, including standard testing requirements and filing the intent form.",
    date: "Nov 01, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Developing Spatial Reasoning: Why Geometry Challenges Middle Schoolers",
    slug: "developing-spatial-reasoning-geometry",
    category: "Study Tips",
    excerpt: "Find out why geometry demands a completely different cognitive skillset than algebra, and how parents can support spatial confidence.",
    date: "Oct 28, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Writing the Ivy League Supplemental Essays: The 'Why Us' Prompt",
    slug: "ivy-league-supplemental-essays-why-us",
    category: "College Planning",
    excerpt: "Avoid generic descriptions. Learn how to write highly personalized 'Why Us' essays that demonstrate authentic fit for Ivy League schools.",
    date: "Oct 24, 2025 • 7 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Dyscalculia Support for Kids: Building Math Confidence From Scratch",
    slug: "dyscalculia-support-kids-math-confidence",
    category: "Learning Support",
    excerpt: "Identify early indicators of dyscalculia and discover tactile, visually-driven math teaching methods that foster numeric fluency.",
    date: "Oct 21, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Executive Functioning Hacks: Planners and Timers for ADHD Students",
    slug: "executive-functioning-hacks-adhd",
    category: "ADHD Support",
    excerpt: "Review the best planners, digital reminders, and visual countdown timers that help neurodivergent students conquer daily academic procrastination.",
    date: "Oct 18, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Excel in AP United States History (APUSH) Exam Prep",
    slug: "excel-apush-united-states-history",
    category: "Exam Prep",
    excerpt: "Master the DBQ, LEQ, and multiple-choice sections of the APUSH test with thematic timelines and historical reasoning frameworks.",
    date: "Oct 15, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "A Guide to Science Fair Projects: Choosing High-Scoring Topics",
    slug: "guide-science-fair-projects-topics",
    category: "Study Tips",
    excerpt: "Transform standard ideas into winning science projects. Learn how to structure variables, analyze data, and build professional displays.",
    date: "Oct 12, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Preparing for IELTS General Training vs. Academic: Core Differences",
    slug: "ielts-general-vs-academic-differences",
    category: "Exam Prep",
    excerpt: "Ensure you study for the right test. Learn differences in writing tasks and reading passages between the General and Academic IELTS.",
    date: "Oct 08, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "How to Build a Powerful High School Resume for College Applications",
    slug: "build-high-school-resume-college",
    category: "College Planning",
    excerpt: "Go beyond standard lists. Learn how to highlight volunteering, personal research, and leadership in a structured, high-impact formatting template.",
    date: "Oct 05, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Tutoring Rates in Miami: How to Find Affordable, Premium Support",
    slug: "tutoring-rates-miami-affordable-premium",
    category: "Tuition & Costs",
    excerpt: "A guide to student tutoring budgets in Miami. Learn how online package rates make high-quality, professional tutoring affordable.",
    date: "Oct 02, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Virginia Homeschool Laws: Rules, Options, and Portfolio Reviews",
    slug: "virginia-homeschool-laws-rules",
    category: "Homeschooling",
    excerpt: "Familiarize yourself with Virginia's notice of intent (NOI), testing rules, and portfolio guidelines for an easy compliance flow.",
    date: "Sep 28, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Seattle Private Tutoring Guide: Academic Support and Test Prep",
    slug: "seattle-private-tutoring-guide",
    category: "Local Guides",
    excerpt: "Find localized private tutoring in Seattle districts. Navigate regional math programs, AP support, and Seattle school milestones.",
    date: "Sep 24, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "ADHD and Standardized Testing: Accommodations for SAT and ACT",
    slug: "adhd-standardized-testing-accommodations",
    category: "ADHD Support",
    excerpt: "A step-by-step parent roadmap to secure extended time, separate rooms, and other essential testing accommodations for neurodivergent kids.",
    date: "Sep 21, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Early Action vs. Early Decision: A Strategic Parent Guide",
    slug: "early-action-early-decision-strategy",
    category: "College Planning",
    excerpt: "Assess the acceptance rate benefits and financial aid constraints of early college application choices to guide your senior's strategy.",
    date: "Sep 18, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Why Phonological Awareness is the Key to Dyslexia Reading Progress",
    slug: "phonological-awareness-dyslexia-reading",
    category: "Dyslexia Support",
    excerpt: "Understand how phonemic drills, tactile letter boards, and structured syllables form the building blocks of reading fluency for dyslexic readers.",
    date: "Sep 15, 2025 • 6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "The Benefits of Peer Tutoring vs. Professional Academic Coaching",
    slug: "benefits-peer-tutoring-vs-professional",
    category: "Parent Guide",
    excerpt: "Examine when a high school peer helper is sufficient, and when standard curriculum goals demand an experienced professional educator.",
    date: "Sep 12, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Effective Study Techniques for the TOEFL iBT Reading Section",
    slug: "toefl-ibt-reading-section-techniques",
    category: "Exam Prep",
    excerpt: "Master high-frequency vocabulary, sentence insertion drills, and academic passage structure strategies to score highly on the TOEFL reading exam.",
    date: "Sep 09, 2025 • 5 min read",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
  }
];

export const FAQ = [
  { question: "How does ACE Education match students with tutors?", answer: "We use a comprehensive assessment process that evaluates your child's academic level, learning style, personality, and goals. Our matching algorithm then pairs them with the most suitable tutor from our vetted network of educators." },
  { question: "What qualifications do your tutors have?", answer: "All ACE tutors hold at minimum a bachelor's degree in their subject area, with many holding master's and doctoral degrees. They undergo rigorous background checks, teaching demonstrations, and ongoing professional development." },
  { question: "Can I switch tutors if the match isn't right?", answer: "Absolutely. We want the perfect fit for your child. If for any reason the tutor match isn't working, we'll find a new tutor at no additional cost and ensure a smooth transition." },
  { question: "How do online tutoring sessions work?", answer: "Sessions take place on our secure, interactive platform with video conferencing, a shared whiteboard, screen sharing, and real-time document collaboration. All you need is a computer and internet connection." },
  { question: "Do you offer free trial sessions?", answer: "Yes! We offer a complimentary academic assessment and trial lesson so you can experience our teaching quality before committing. Book your free assessment today." },
  { question: "What is your cancellation policy?", answer: "We require 24-hour notice for session cancellations. Sessions cancelled with less than 24 hours' notice may be charged. Monthly packages offer flexible rescheduling options." },
  { question: "How do you track student progress?", answer: "Our Parent Dashboard provides real-time progress reports, attendance records, homework completion tracking, assessment results, and detailed tutor notes after every session." },
  { question: "Do you offer group tutoring?", answer: "Yes, we offer small group sessions (2-4 students) at reduced rates. Group sessions are ideal for siblings, friends, or students preparing for the same exam." },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Academic Tutoring", href: "/subjects",
    children: [
      { label: "Math", href: "/subjects/math", desc: "All levels from arithmetic to calculus" },
      { label: "English", href: "/subjects/english", desc: "Grammar, composition & literature" },
      { label: "Reading", href: "/subjects/reading", desc: "Comprehension & critical analysis" },
      { label: "Writing", href: "/subjects/writing", desc: "Academic & creative writing" },
      { label: "Science", href: "/subjects/science", desc: "General science & lab courses" },
      { label: "Business", href: "/subjects/business", desc: "Organization, strategy & operations" },
      { label: "Accounting", href: "/subjects/accounting", desc: "Bookkeeping & financial statements" },
      { label: "Economics", href: "/subjects/economics", desc: "Micro & macroeconomics" },
      { label: "Sociology", href: "/subjects/sociology", desc: "Human behavior & societies" },
      { label: "History", href: "/subjects/history", desc: "World history & ancient civilisations" },
      { label: "Geography", href: "/subjects/geography", desc: "Physical & human geography" },
      { label: "Psychology", slug: "psychology", href: "/subjects/psychology", desc: "Cognition, mind & behavior studies" },
      { label: "Law", href: "/subjects/law", desc: "Constitutional & legal systems" },
      { label: "ICT", href: "/subjects/ict", desc: "Digital literacy & computer tools" },
      { label: "Computer Science", href: "/subjects/computer-science", desc: "Programming & algorithmic logic" },
      { label: "French", href: "/subjects/french", desc: "French conversational fluency" },
      { label: "Spanish", href: "/subjects/spanish", desc: "Spanish vocabulary & grammar" },
      { label: "Chinese", href: "/subjects/chinese", desc: "Mandarin Chinese language study" },
    ],
  },
  { label: "Homeschool", href: "/homeschool" },
  {
    label: "Test Prep", href: "/exam-prep",
    children: [
      { label: "SAT Prep", href: "/exam-prep/sat", desc: "Score improvement guaranteed" },
      { label: "ACT Prep", href: "/exam-prep/act", desc: "All four sections covered" },
      { label: "GED Prep", href: "/exam-prep/ged", desc: "High school equivalency diploma" },
      { label: "AP Prep", href: "/exam-prep/ap", desc: "College-level AP course preparation" },
      { label: "IELTS Prep", href: "/exam-prep/ielts", desc: "Academic & general IELTS training" },
      { label: "TOEFL Prep", href: "/exam-prep/toefl", desc: "Admissions english proficiency" },
    ],
  },
  {
    label: "Learning Support", href: "/learning-support",
    children: [
      { label: "ADHD Support", href: "/learning-support/adhd", desc: "Specialized tutoring strategies for focus" },
      { label: "Dyslexia Support", href: "/learning-support/dyslexia", desc: "Evidence-based multisensory reading" },
      { label: "Study Skills", href: "/learning-support/study-skills-support", desc: "Executive functioning, organization & time" },
      { label: "Homework Help", href: "/learning-support/homework-support", desc: "Daily structured homework support" },
    ],
  },
  {
    label: "Resources", href: "/resources",
    children: [
      { label: "Blog", href: "/blog", desc: "Latest educational news & updates" },
      { label: "Parent Guides", href: "/resources/parent-guides", desc: "Support your child's learning journey" },
      { label: "Study Tips", href: "/resources/study-tips", desc: "Practical techniques for academic success" },
      { label: "College Planning", href: "/resources/college-planning", desc: "Navigating high school & college entrance" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
