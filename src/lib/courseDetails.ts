import { Tutor, CurriculumModule, Testimonial, PricingPackage, FAQItem, RelatedCourse, CoursePageTemplateProps } from "@/components/CoursePageTemplate";
import { TUTORS, TESTIMONIALS } from "@/lib/data";

const defaultTutors: Tutor[] = TUTORS.map(t => ({
  name: t.name,
  image: t.image,
  rating: t.rating,
  subject: t.subject,
  education: t.education,
  experience: parseInt(t.experience) || 10,
  students: t.students,
  bio: t.bio
}));

const defaultTestimonials: Testimonial[] = TESTIMONIALS.map(tm => ({
  name: tm.name,
  role: tm.role,
  text: tm.content,
  rating: tm.rating,
  image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150"
}));

// Customize images in testimonials to make them look authentic
const customImages = [
  "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150", // Jennifer M. (Woman)
  "https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",     // Robert K. (Man)
  "https://images.pexels.com/photos/1212901/pexels-photo-1212901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",   // Sarah L. (Woman)
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",   // David W. (Man)
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150",   // Maria G. (Woman)
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=150&w=150"      // Thomas H. (Man)
];

const testWithImages = defaultTestimonials.map((t, i) => ({
  ...t,
  image: customImages[i % customImages.length]
}));

export function getTestimonialsForSlug(slug: string): Testimonial[] {
  const activeSlug = slug.toLowerCase();
  
  if (activeSlug.includes("math") || activeSlug === "mathematics" || activeSlug === "calculus" || activeSlug === "geometry" || activeSlug === "trig" || activeSlug === "algebra") {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("math") || 
      t.text.toLowerCase().includes("algebra") || 
      t.text.toLowerCase().includes("calculus") || 
      t.text.toLowerCase().includes("geometry") || 
      t.text.toLowerCase().includes("arithmetic") ||
      t.text.toLowerCase().includes("numbers")
    );
    if (list.length > 0) return list;
  }
  
  if (
    activeSlug.includes("sat") || 
    activeSlug.includes("act") || 
    activeSlug.includes("prep") || 
    activeSlug === "ap" || 
    activeSlug === "ielts" || 
    activeSlug === "toefl"
  ) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("sat") || 
      t.text.toLowerCase().includes("act") || 
      t.text.toLowerCase().includes("exam") || 
      t.text.toLowerCase().includes("prep") || 
      t.text.toLowerCase().includes("test") || 
      t.text.toLowerCase().includes("ielts") || 
      t.text.toLowerCase().includes("toefl") || 
      t.text.toLowerCase().includes("score") || 
      t.text.toLowerCase().includes("college")
    );
    if (list.length > 0) return list;
  }
  
  if (activeSlug.includes("ged")) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("ged") || 
      t.text.toLowerCase().includes("adult") || 
      t.text.toLowerCase().includes("equivalency")
    );
    if (list.length > 0) return list;
  }
  
  if (activeSlug.includes("adhd") || activeSlug.includes("dyslexia") || activeSlug.includes("learning") || activeSlug.includes("support")) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("adhd") || 
      t.text.toLowerCase().includes("dyslexia") || 
      t.text.toLowerCase().includes("learning") || 
      t.text.toLowerCase().includes("support") || 
      t.text.toLowerCase().includes("executive") || 
      t.text.toLowerCase().includes("organiz")
    );
    if (list.length > 0) return list;
  }
  
  if (activeSlug.includes("physics") || activeSlug.includes("chemistry") || activeSlug.includes("biology") || activeSlug.includes("science")) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("physics") || 
      t.text.toLowerCase().includes("chemistry") || 
      t.text.toLowerCase().includes("biology") || 
      t.text.toLowerCase().includes("science")
    );
    if (list.length > 0) return list;
  }

  if (activeSlug.includes("english") || activeSlug.includes("writing") || activeSlug.includes("reading") || activeSlug.includes("essay") || activeSlug.includes("literature")) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("english") || 
      t.text.toLowerCase().includes("writing") || 
      t.text.toLowerCase().includes("reading") || 
      t.text.toLowerCase().includes("essay") || 
      t.text.toLowerCase().includes("literature")
    );
    if (list.length > 0) return list;
  }

  if (activeSlug.includes("homeschool")) {
    const list = testWithImages.filter(t => 
      t.text.toLowerCase().includes("homeschool") || 
      t.text.toLowerCase().includes("daytime")
    );
    if (list.length > 0) return list;
  }
  
  return testWithImages;
}

// Master pricing getter by slug/category
export function getPricingForSlug(activeSlug: string): PricingPackage[] {
  if (
    activeSlug.includes("sat") ||
    activeSlug.includes("act") ||
    activeSlug.includes("prep") ||
    ["ielts", "toefl", "ged", "ap"].includes(activeSlug)
  ) {
    return [
      {
        title: "Online Prep Session",
        price: "from $120",
        desc: "Elite 1-on-1 online exam preparation",
        features: [
          "1-on-1 private online sessions",
          "Expert SAT/ACT/AP prep specialists",
          "Interactive virtual whiteboard & recordings",
          "Full-length diagnostic practice tests",
          "Personalized target score pacing"
        ],
        unit: "/hour"
      },
      {
        title: "In-Home Prep Session",
        price: "from $140",
        desc: "Premium 1-on-1 face-to-face home prep",
        features: [
          "1-on-1 face-to-face lessons at your home",
          "Experienced local exam experts",
          "All official practice prep workbooks provided",
          "Concierge coordinator parent alignment",
          "Free $150 academic assessment"
        ],
        popular: true,
        unit: "/hour"
      },
      {
        title: "Monthly Success Prep",
        price: "$1,020",
        desc: "Consistent monthly preparation blueprint (10 Hours)",
        features: [
          "Includes 10 hours of 1-on-1 tutoring per month",
          "Equivalent to 2.5 hours of focus per week",
          "Saves 15% compared to hourly booking (15% package discount applied)",
          "Custom milestone plan & mock testing trackers",
          "Direct family portal chat with lead tutor"
        ],
        unit: "/month"
      }
    ];
  }

  if (
    activeSlug.includes("adhd") ||
    activeSlug.includes("dyslexia") ||
    activeSlug.includes("support") ||
    activeSlug.includes("learning-support") ||
    activeSlug.includes("special-needs")
  ) {
    return [
      {
        title: "Online Support Session",
        price: "from $120",
        desc: "Specialized 1-on-1 cognitive & study lessons",
        features: [
          "1-on-1 private online sessions",
          "Orton-Gillingham / ADHD certified specialist",
          "Interactive virtual whiteboard & recorded clips",
          "Custom pace focus drills & visual worksheets",
          "Flexible daytime or evening hours"
        ],
        unit: "/hour"
      },
      {
        title: "In-Home Support Session",
        price: "from $140",
        desc: "Comfort of face-to-face home lessons",
        features: [
          "1-on-1 face-to-face in-home lessons",
          "Certified local learning specialists",
          "All tactile and visual learning tools provided",
          "IEP/504 school curriculum alignment support",
          "Free $150 onboarding assessment"
        ],
        popular: true,
        unit: "/hour"
      },
      {
        title: "Monthly Growth Package",
        price: "$1,020",
        desc: "Ongoing weekly learning support plan (10 Hours)",
        features: [
          "Includes 10 hours of 1-on-1 tutoring per month",
          "Equivalent to 2.5 hours of focus per week",
          "Saves 15% compared to pay-as-you-go (15% package discount applied)",
          "Milestone progress scorecards & log summaries",
          "Dedicated regional coordinator concierge"
        ],
        unit: "/month"
      }
    ];
  }

  // Default Subject Tutoring (with progressively increasing rates based on grade levels)
  return [
    {
      title: "Online Tutoring",
      price: "$45 - $75",
      desc: "1-on-1 online lessons by grade level",
      features: [
        "Primary (Grades K-5): from $45/hour",
        "Lower Secondary (Grades 6-8): from $55/hour",
        "IGCSE or Equivalent (Grades 9-10): from $65/hour",
        "A Level / College Level: from $75/hour",
        "Interactive virtual whiteboard & recordings"
      ],
      unit: "/hour"
    },
    {
      title: "In-Home Private Tutoring",
      price: "$65 - $95",
      desc: "Premium face-to-face home tutoring",
      features: [
        "Primary (Grades K-5): from $65/hour",
        "Lower Secondary (Grades 6-8): from $75/hour",
        "IGCSE or Equivalent (Grades 9-10): from $85/hour",
        "A Level / College Level: from $95/hour",
        "1-on-1 local certified school teachers"
      ],
      popular: true,
      unit: "/hour"
    },
    {
      title: "Monthly Progress Package",
      price: "from $382.50",
      desc: "Sustained monthly grade acceleration (10 Hours)",
      features: [
        "Includes 10 hours of 1-on-1 tutoring per month",
        "Equivalent to 2.5 hours of focus per week",
        "Saves 15% compared to standard hourly rates (15% package discount applied)",
        "Primary starting from $382.50/month (10 Hours)",
        "Secondary starting from $467.50/month (10 Hours)",
        "IGCSE starting from $552.50/month (10 Hours)",
        "A Level starting from $637.50/month (10 Hours)"
      ],
      unit: "/month"
    }
  ];
}

// Master mapper for slugs
export function getCourseDetails(slug: string, rawTitle?: string): CoursePageTemplateProps {
  // Normalize slug
  const activeSlug = slug.toLowerCase();

  // Common related courses across different categories
  const commonRelated: RelatedCourse[] = [
    { name: "Mathematics", slug: "math", icon: "📐", category: "subjects" },
    { name: "English", slug: "english", icon: "📝", category: "subjects" },
    { name: "SAT Prep", slug: "sat", icon: "📊", category: "exam-prep" },
    { name: "Homework Help", slug: "homework-help", icon: "📋", category: "subjects" }
  ];

  const defaultFaqs: FAQItem[] = [
    {
      question: "Are lessons 1-on-1 or group-based?",
      answer: "All our standard tutoring packages are 1-on-1 to ensure your child receives undivided attention, custom-paced lessons, and tailored educational planning."
    },
    {
      question: "Can I switch between online and in-home tutoring?",
      answer: "Yes, our packages are highly flexible. You can opt for 100% online, 100% in-home, or a hybrid of both based on your schedule."
    },
    {
      question: "How do you select and vet your tutors?",
      answer: "We accept less than 2% of applicants. Tutors undergo double-tier background checks, certification checks, subject audits, and academic training to ensure high pedagogical quality."
    },
    {
      question: "What if my student doesn't connect well with their assigned tutor?",
      answer: "We offer a 100% Tutor Match Guarantee. If your student isn't perfectly comfortable, we will replace them instantly and credit your next session."
    }
  ];

  const defaultPricing = getPricingForSlug(activeSlug);

  // Specific Course Data
  if (activeSlug === "math" || activeSlug === "mathematics") {
    return {
      id: "math",
      title: "Mathematics",
      category: "Subjects",
      icon: "📐",
      tagline: "Build mathematical fluency, raise grades, and gain lifelong conceptual confidence",
      description: "From elementary foundation arithmetic to Advanced Placement Calculus, our custom 1-on-1 math programs make numbers intuitive and enjoyable.",
      overviewText: [
        "Our personalized Mathematics tutoring is structured to build math confidence at any level. Whether your child has foundational gaps, is experiencing anxiety during class, or wants to get ahead of next semester's curriculum, we pair them with an inspiring tutor who makes complex formulas easy to digest.",
        "We combine initial diagnostic tracking with systematic lesson maps. Tutors explain concepts using visual models, multi-tier problem worksheets, and structured drills. Students learn how to approach problems logically, rather than memorizing formulas, which builds critical reasoning skills."
      ],
      eligibility: "Elementary School (K-5) • Middle School (6-8) • High School (9-12) • Pre-Calculus & AP Calculus (AB/BC) • College Algebra & Statistics.",
      learningOutcomes: [
        "Master underlying math concepts and operations",
        "Eliminate testing anxiety through logical problem-solving steps",
        "Prepare successfully for classroom exams and standardized milestones",
        "Develop self-correction strategies for homework and tests",
        "Advance ahead of standard school curriculum tracks"
      ],
      skillsGained: [
        "Algebraic Logic",
        "Geometric Proofs",
        "Calculus Synthesis",
        "Quantitative Aptitude",
        "Milestone Preparation"
      ],
      curriculum: [
        {
          title: "Diagnostic Mapping & Core Numbers",
          description: "Evaluating numerical comprehension and building basic operations speed.",
          topics: ["Core Arithmetic", "Fraction Operations", "Decimals & Percents", "Ratios & Rates"]
        },
        {
          title: "Foundations of Algebra",
          description: "Transitioning to variable tracking, equation balancing, and functions modeling.",
          topics: ["Linear Equations", "Graphing Coordinates", "Polynomials", "Systems of Equations"]
        },
        {
          title: "Advanced Analysis & Geometry",
          description: "Understanding spatial proofs, trigonometry identities, and pre-calculus metrics.",
          topics: ["Congruence Proofs", "Trig Functions", "Matrices & Vectors", "Limits Intro"]
        }
      ],
      journeySteps: [
        { title: "Diagnostic Assessment", desc: "A comprehensive review highlighting exact gaps and conceptual strong points." },
        { title: "Custom Mapping Blueprint", desc: "Crafting a custom weekly curriculum map aligned to the child's school goals." },
        { title: "Active 1-on-1 Coaching", desc: "Regular engaging 1-on-1 math sessions with immediate visual and written feedback." },
        { title: "Milestone Tracking & Mastery", desc: "Ongoing grade audits, quiz feedback, and monthly progress charting." }
      ],
      tutors: defaultTutors.filter(t => t.subject.includes("Math") || t.name.includes("Sarah") || t.name.includes("Emily")),
      pricing: defaultPricing,
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "How do you help students with math anxiety?", answer: "We focus heavily on visual, incremental problem-solving. By breaking complex questions into tiny manageable chunks and reinforcing success, we reduce anxiety and build true academic confidence." },
        ...defaultFaqs
      ],
      relatedCourses: commonRelated.filter(c => c.slug !== "math"),
      downloadableResource: {
        title: "ACE Algebra & Geometry Formulas Cheat Sheet",
        filename: "ace_math_cheat_sheet.pdf",
        fileType: "PDF Guide",
        previewDesc: "The ultimate reference sheet covering major high-weight Algebra, Geometry, and Calculus rules for middle and high school students."
      }
    };
  }

  if (activeSlug === "english") {
    return {
      id: "english",
      title: "English & Literature",
      category: "Subjects",
      icon: "📝",
      tagline: "Inspiring analytical reading, rich vocabulary, and persuasive writing mastery",
      description: "Empowering PreK-12 students to communicate with precision, comprehend complex literature, and excel in standardized verbal metrics.",
      overviewText: [
        "Our English tutoring goes far beyond basic grammar. We focus on reading comprehension, active literature analysis, and expressive written communication to ensure students can synthesize information and write with authority.",
        "Whether preparing for high school essay assignments, exploring creative prose, or mastering phonics, each session provides dedicated, interactive guidance aligned with state and national standards."
      ],
      eligibility: "Elementary Reading (K-5) • Middle School Composition (6-8) • High School Literature & Analysis (9-12) • AP English Lit & Lang.",
      learningOutcomes: [
        "Synthesize and analyze complex classical and modern literary texts",
        "Write persuasive, expository, and research-based essays",
        "Master vocabulary, proper syntax, and rhetoric devices",
        "Develop strong public speaking and verbal communication skills",
        "Accelerate standardized verbal testing benchmarks"
      ],
      skillsGained: [
        "Rhetorical Analysis",
        "Essay Synthesis",
        "Grammatical Precision",
        "Literary Critical Theory",
        "Public Speaking"
      ],
      curriculum: [
        {
          title: "Grammar, Mechanics & Sentence Flow",
          description: "Reinforcing structural rules and learning how to compose balanced sentences.",
          topics: ["Parts of Speech", "Punctuation Rules", "Active Voice Composition", "Sentence Variety"]
        },
        {
          title: "The Art of the Persuasive Essay",
          description: "Structuring claims, compiling evidence, and crafting strong thesis statements.",
          topics: ["Thesis Formulation", "MLA/APA Citations", "Paragraph Synthesis", "Editing Protocols"]
        },
        {
          title: "Analytical Reading & Synthesis",
          description: "Dissecting fiction, poetry, and historical non-fiction to decode core themes.",
          topics: ["Theme Extraction", "Tone & Mood", "Character Arcs", "Historical Context"]
        }
      ],
      journeySteps: [
        { title: "Verbal Evaluation", desc: "Detailed screening of reading speed, vocabulary level, and writing structure." },
        { title: "Blueprint Strategy", desc: "Custom-curating writing prompts and literary exercises matching school benchmarks." },
        { title: "Interactive Essay Reviews", desc: "Step-by-step editing workshops with real-time feedback from elite English specialists." },
        { title: "Verbal Excellence", desc: "Monthly essay scorecard audits and comprehensive vocabulary trackers." }
      ],
      tutors: defaultTutors.filter(t => t.subject.includes("English") || t.name.includes("James")),
      pricing: defaultPricing,
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "Do you help students edit their college admission essays?", answer: "Yes! Our elite English tutors are experts at helping students structure, draft, and polish impactful college application essays that stand out." },
        ...defaultFaqs
      ],
      relatedCourses: commonRelated.filter(c => c.slug !== "english"),
      downloadableResource: {
        title: "ACE Guide to Writing Five-Star College Essays",
        filename: "ace_essay_writing_guide.pdf",
        fileType: "PDF E-Book",
        previewDesc: "The complete step-by-step workbook outlining thesis formulas, paragraph structures, and top transition keywords."
      }
    };
  }

  // SAT Exam Prep Details
  if (activeSlug === "sat") {
    return {
      id: "sat",
      title: "SAT Prep",
      category: "Exam Prep",
      icon: "📊",
      tagline: "Elite 1-on-1 SAT prep designed to maximize scores and unlock top-tier college acceptances",
      description: "Our proprietary SAT preparation combines full-length mock exams, time-management drills, and rigorous content review to boost scores by an average of 240+ points.",
      overviewText: [
        "In the competitive landscape of college admissions, a stellar SAT score opens doors. Our 1-on-1 SAT prep is highly strategic, focusing both on core content review (Math, Reading, Writing) and specialized test-taking mechanics.",
        "We identify your exact pacing issues, question-type weaknesses, and coordinate custom daily practice drills. By learning how to avoid trap answers and apply deductive reasoning, students dramatically increase their speed and accuracy."
      ],
      eligibility: "High School Sophomores, Juniors, and Seniors aiming for Ivy League, top-tier state universities, or merit scholarships.",
      learningOutcomes: [
        "Learn proprietary time-saving shortcuts for the Digital SAT",
        "Master high-frequency algebraic and geometry problem templates",
        "Analyze reading passages instantly to extract core answers",
        "Understand exactly how to avoid common trick and trap questions",
        "Boost confidence and reduce timing anxiety on test day"
      ],
      skillsGained: [
        "Digital SAT Hacks",
        "Pacing Strategies",
        "Quantitative Hacks",
        "Critical Reading Hacks",
        "Deductive Analysis"
      ],
      curriculum: [
        {
          title: "Diagnostic Drills & Strategy Blueprint",
          description: "Uncovering personal score baselines, timing habits, and setting target score maps.",
          topics: ["Mock SAT Review", "Digital App Shortcuts", "Score Diagnostic", "Individual Pacing Plan"]
        },
        {
          title: "Math Module Excellence",
          description: "Reviewing algebra, statistics, and advanced function layouts specific to the SAT.",
          topics: ["Heart of Algebra", "Advanced Math Systems", "Data Analysis", "Grid-In Techniques"]
        },
        {
          title: "Reading & Writing Mechanics",
          description: "Decoding structure, logical relationships, transitions, and grammatical conventions.",
          topics: ["Command of Evidence", "Words in Context", "Rhetorical Synthesis", "Transition Drills"]
        }
      ],
      journeySteps: [
        { title: "Diagnostic Mock SAT", desc: "A realistic mock exam simulating actual digital test conditions." },
        { title: "Target Strategy Map", desc: "Designing an individualized study schedule focusing on the student's highest-leverage areas." },
        { title: "Rigorous 1-on-1 Drills", desc: "Intense, customized instruction reviewing complex topics and timing hacks." },
        { title: "Progress Check Mock Exams", desc: "Regular mock tests and timing audits to confirm score progress." }
      ],
      tutors: defaultTutors.filter(t => t.subject.includes("SAT") || t.name.includes("Rodriguez") || t.name.includes("Sarah")),
      pricing: defaultPricing.map(p => p.title.includes("Exam") ? { ...p, popular: true } : p),
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "What is your average SAT score improvement?", answer: "Our students see an average score increase of 240+ points. High-scoring students aiming for top-tier universities frequently see boosts of 300-350 points with our intensive packages." },
        { question: "Do you supply official Digital SAT practice materials?", answer: "Yes! We provide complete practice materials, past exam resources, and simulated mock environments mirroring the college board's digital platform." },
        ...defaultFaqs
      ],
      relatedCourses: [
        { name: "ACT Prep", slug: "act", icon: "📈", category: "exam-prep" },
        { name: "AP Prep", slug: "ap", icon: "🏆", category: "exam-prep" },
        { name: "Mathematics", slug: "math", icon: "📐", category: "subjects" },
        { name: "English", slug: "english", icon: "📝", category: "subjects" }
      ],
      downloadableResource: {
        title: "ACE Digital SAT High-Weight Cheat Sheet & Practice Pack",
        filename: "ace_sat_cheat_sheet.pdf",
        fileType: "PDF Toolkit",
        previewDesc: "The ultimate 20-page cheat sheet containing top grammar rules, algebraic formulas, and time-saving shortcuts for the Digital SAT."
      }
    };
  }

  // Support slugs (ADHD / Dyslexia Support)
  if (activeSlug === "adhd" || activeSlug === "adhd-support") {
    return {
      id: "adhd",
      title: "ADHD Support",
      category: "Learning Support",
      icon: "🧠",
      tagline: "Empowering active minds with structured executive functioning, focus, and study skills",
      description: "Our certified educators use evidence-based ADHD coaching, micro-learning breaks, and highly structured routines to turn academic anxiety into focused success.",
      overviewText: [
        "Students with ADHD possess brilliant, creative, and dynamic minds, but standard classroom structures frequently fail to match their executive functioning needs. Our specialized ADHD Support tutoring focuses on time-management, organization, and stress reduction.",
        "We pair your child with an elite educator trained in special education methodologies. Rather than forcing passive listening, lessons are dynamic, multi-sensory, and divided into structured milestones. We teach students how to organize their binders, plan projects, self-regulate, and sustain academic focus."
      ],
      eligibility: "Elementary (K-5) • Middle School (6-8) • High School (9-12) seeking to build executive functioning and learning focus.",
      learningOutcomes: [
        "Build reliable executive functioning, organization, and planning habits",
        "Learn task initiation strategies to overcome procrastination",
        "Develop active focus habits using structured timers and visual breaks",
        "Structure essays, projects, and study timelines independently",
        "Formulate positive self-reflection and academic confidence"
      ],
      skillsGained: [
        "Executive Function",
        "Task Initiation",
        "Time Management",
        "Organization Mapping",
        "Active Retention"
      ],
      curriculum: [
        {
          title: "Executive Function & Planning",
          description: "Establishing binder layouts, calendar logs, and customized homework plans.",
          topics: ["Planner Routines", "Milestone Mapping", "Workspace Setup", "Task Initiation Hacks"]
        },
        {
          title: "Active Learning & Focus Hacks",
          description: "Using multi-sensory learning, Pomodoro intervals, and visual memory maps.",
          topics: ["Pomodoro Routines", "Visual Note-Taking", "Concept Diagrams", "Focus Self-Regulation"]
        },
        {
          title: "Project Management for Students",
          description: "Deconstructing large essays and multi-week projects into small steps.",
          topics: ["Essay Framing", "Project Checklists", "Time Estimation", "Stress-Free Reviewing"]
        }
      ],
      journeySteps: [
        { title: "Cognitive Habit Check", desc: "Reviewing existing homework habits, focus thresholds, and organizational obstacles." },
        { title: "Personal Routine Roadmap", desc: "Setting up custom digital/physical study spaces, planners, and visual aids." },
        { title: "Interactive Routine Drills", desc: "Lessons emphasizing task initiation, self-coaching, and focus-break loops." },
        { title: "Independent Milestone Mastery", desc: "Tracking ongoing grades, calendar alignment, and reinforcing organizational pride." }
      ],
      tutors: defaultTutors.filter(t => t.subject.includes("Support") || t.name.includes("Kim") || t.name.includes("Thompson")),
      pricing: defaultPricing.map(p => p.title.includes("Premium") ? { ...p, popular: true } : p),
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "Are your tutors specialized in ADHD or Special Education?", answer: "Yes! Tutors in our Learning Support division are credentialed teachers with specialized training in executive functioning coaching, ADHD, and specialized academic instruction." },
        { question: "How long are ADHD tutoring sessions?", answer: "We find 50-minute sessions divided into structured 15-minute concept blocks work best to maintain interest, focus, and conceptual retention." },
        ...defaultFaqs
      ],
      relatedCourses: [
        { name: "Dyslexia Support", slug: "dyslexia", icon: "📖", category: "learning-support" },
        { name: "Study Skills", slug: "study-skills", icon: "🎯", category: "subjects" },
        { name: "Homework Help", slug: "homework-help", icon: "📋", category: "subjects" },
        { name: "Mathematics", slug: "math", icon: "📐", category: "subjects" }
      ],
      downloadableResource: {
        title: "ACE Executive Functioning Planner & Focus Worksheet",
        filename: "ace_adhd_study_planner.pdf",
        fileType: "Interactive PDF Tracker",
        previewDesc: "The printable student organizer designed to simplify assignment tracking, break study sessions into steps, and build daily executive functioning routines."
      }
    };
  }

  // Dyslexia Support details
  if (activeSlug === "dyslexia" || activeSlug === "dyslexia-support") {
    return {
      id: "dyslexia",
      title: "Dyslexia Support",
      category: "Learning Support",
      icon: "📖",
      tagline: "Evidence-based multi-sensory reading, orthography, and writing instruction",
      description: "Our Orton-Gillingham trained specialists use evidence-based phonemic instruction and multi-sensory learning models to make reading fluent and confidence-inspiring.",
      overviewText: [
        "Reading and writing are the baselines of all school subjects. If a student struggles with dyslexia, they can feel left behind in every class. Our Dyslexia Support tutoring program utilizes evidence-based multi-sensory strategies designed to reinforce phonemic patterns and visual tracking.",
        "We customize lessons using Orton-Gillingham and structured literacy techniques, matching the student's pacing. Rather than drill-and-repeat reading, we engage students with touch, sound, and visual guides to build solid reading fluency and essay-writing confidence."
      ],
      eligibility: "Preschoolers • Elementary Readers • Middle School Comprehension • High Schoolers needing spelling and writing interventions.",
      learningOutcomes: [
        "Enhance phonemic awareness, word decoding, and spelling fluency",
        "Improve reading speed, comprehension, and critical text-analysis",
        "Build writing organization and sentence structure habits",
        "Develop self-advocacy and a positive academic mindset",
        "Master the use of assistive reading and writing technologies"
      ],
      skillsGained: [
        "Phoneme Decoding",
        "Orthographic Mapping",
        "Reading Comprehension",
        "Spelling Strategies",
        "Self-Advocacy"
      ],
      curriculum: [
        {
          title: "Phonological Auditing & Sounds",
          description: "Mastering phoneme patterns, syllable divisions, and visual word decoding.",
          topics: ["Sound-Symbol Review", "Syllable Types", "Vowel Teams", "Prefix & Suffix Rules"]
        },
        {
          title: "Fluent Reading & Visual Comprehension",
          description: "Using chunking, sentence highlighting, and visual graphic organizers.",
          topics: ["Reading Chunking", "Keyword Identification", "Synthesizing Stories", "Reading Fluency"]
        },
        {
          title: "Multi-Sensory Vocabulary & Writing",
          description: "Structured paragraph outlines and tactile spelling methods.",
          topics: ["Tactile Spelling", "Vocabulary Mapping", "Paragraph Templates", "Editing Protocols"]
        }
      ],
      journeySteps: [
        { title: "Detailed Literacy Screening", desc: "Auditing decoding habits, reading pace, spelling structures, and sight vocabulary." },
        { title: "Dynamic Multisensory Map", desc: "Assembling a specialized Orton-Gillingham curriculum roadmap based on exact needs." },
        { title: "Structured 1-on-1 Coaching", desc: "Engaging tactile and auditory lessons led by certified dyslexia support experts." },
        { title: "Fluency & Spelling Progress Tracking", desc: "Monthly reading speed diagnostics and visual progress logs for parents." }
      ],
      tutors: defaultTutors.filter(t => t.subject.includes("Support") || t.name.includes("Kim") || t.name.includes("Thompson")),
      pricing: defaultPricing.map(p => p.title.includes("Premium") ? { ...p, popular: true } : p),
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "What teaching methodologies do you use for dyslexia?", answer: "Our specialists utilize evidence-based Multisensory Structured Language (MSL) and Orton-Gillingham techniques which are scientifically proven to aid students with dyslexia." },
        { question: "Can you coordinate with our student's school IEP plan?", answer: "Yes! We frequently coordinate directly with school coordinators, teachers, and review IEP/504 plans to align our tutoring lessons." },
        ...defaultFaqs
      ],
      relatedCourses: [
        { name: "ADHD Support", slug: "adhd", icon: "🧠", category: "learning-support" },
        { name: "Reading", slug: "reading", icon: "📚", category: "subjects" },
        { name: "Writing", slug: "writing", icon: "✍️", category: "subjects" },
        { name: "English", slug: "english", icon: "📝", category: "subjects" }
      ],
      downloadableResource: {
        title: "ACE Spelling Rules & Syllable Division Cheat Sheet",
        filename: "ace_dyslexia_reading_toolkit.pdf",
        fileType: "PDF Reading Aid",
        previewDesc: "The visual phonetic cheat sheet containing syllable division formulas and spelling rules designed to assist struggling readers and writers."
      }
    };
  }

  // Homeschooling Support details
  if (activeSlug === "homeschool" || activeSlug === "homeschooling") {
    return {
      id: "homeschool",
      title: "Homeschool Support",
      category: "Homeschooling",
      icon: "🏠",
      tagline: "Empowering homeschooling families with full curriculum alignment, daytime scheduling, and credentialed subject-matter specialists",
      description: "We partner with homeschooling families to provide flexible, custom-paced PreK-12 daytime instruction that meets state criteria and prepares students for future success.",
      overviewText: [
        "Homeschooling offers families unparalleled flexibility and academic customization. However, teaching advanced subjects like AP Calculus, Chemistry, or high-school Literature can sometimes stretch parental resources. That's where we step in as your elite academic partner.",
        "We offer highly specialized, individual 1-to-1 focused IGCSE, GED, and A Level homeschooling programs. For these pathways, we structure a tentative schedule of 2-3 classes per week for each of the student's selected subjects, ensuring structured rigor and complete syllabus coverage.",
        "Crucially, we don't just teach—we prepare students for full study and arrange their official exams. We coordinate test spots directly with the British Council or private international schools who offer exam seating to private candidates, taking the administrative burden off your shoulders entirely."
      ],
      eligibility: "Homeschooled Students from PreK to Grade 12 aiming to satisfy state graduation requirements, learn advanced electives, prepare for college, or sit for international examinations (IGCSE, GED, A Levels).",
      learningOutcomes: [
        "Receive elite 1-on-1 instruction aligned to Common Core, AP, IB, IGCSE, GED, or A Levels",
        "Maintain a structured tentative schedule of 2-3 classes per week for each selected subject",
        "Prepare fully for international board exams with past papers and official specifications",
        "Arrange official candidate exam spots with the British Council or private international schools",
        "Fulfill all necessary portfolio reviews, state diagnostics, and graduation milestones"
      ],
      skillsGained: [
        "International Exam Readiness",
        "Independent Inquiry",
        "Curriculum Synthesis",
        "State & Board Compliance",
        "Self-Directed Study"
      ],
      curriculum: [
        {
          title: "Syllabus Matching & Board Alignment",
          description: "Evaluating your home-state educational statutes or target board (Cambridge, Edexcel, GED) to structure lesson pacing.",
          topics: ["Syllabus Mapping", "2-3 Classes per Week Planning", "Textbook Matching", "Progress Benchmark Setup"]
        },
        {
          title: "Focused IGCSE, GED & A Level Instruction",
          description: "Rigorous 1-on-1 conceptual lectures, worksheet applications, and intensive specification drills.",
          topics: ["Exam Board Specification Coverage", "Interactive Problem Solving", "Guided Academic Essays", "Past Paper Practice"]
        },
        {
          title: "Exam Center & Private Candidate Registration",
          description: "We handle exam bookings and seat arrangements for private candidates, making official exam taking stress-free.",
          topics: ["British Council Coordination", "Private International School Spot Bookings", "Candidate Application Form Assistance", "Mock Examination Trials"]
        }
      ],
      journeySteps: [
        { title: "Homeschool Consultation", desc: "Reviewing goals, chosen curriculum (IGCSE/GED/A Level), and scheduling needs." },
        { title: "Syllabus & Class Scheduling", desc: "Setting up a solid tentative schedule of 2-3 focused lessons per week per subject." },
        { title: "Active 1-to-1 Study Preparation", desc: "Rigorous interactive lessons covering all learning objectives and past papers." },
        { title: "Official Exam Registration", desc: "Arranging candidate seats with the British Council or local private international schools." }
      ],
      tutors: defaultTutors,
      pricing: defaultPricing.map(p => p.title.includes("Premium") ? { ...p, desc: "Perfect for core home lessons during school hours" } : p),
      testimonials: getTestimonialsForSlug(activeSlug),
      faqs: [
        { question: "Do you offer full homeschooling for IGCSE, GED, and A Levels?", answer: "Yes! We provide specialized individual 1-to-1 focused homeschool preparation for IGCSE, GED, and A Levels. We prepare students for full study across their selected subjects with a typical tentative schedule of 2-3 classes per week per subject." },
        { question: "How do you handle the official examinations for private homeschool candidates?", answer: "We take care of all the arrangements. We coordinate and arrange our students' exams either with the British Council or with private international schools that offer exam spots to private external candidates." },
        { question: "How do your tutors cooperate with our existing homeschool program?", answer: "Our tutors can either lead instruction using your selected homeschooling platform and curriculum, or supply fully independent curriculum packages tailored to your state's standards." },
        { question: "Can we schedule sessions during standard morning hours?", answer: "Absolutely! Our homeschool division specializes in daytime scheduling, providing lessons anytime between 8:00 AM and 3:00 PM local time." },
        ...defaultFaqs
      ],
      relatedCourses: [
        { name: "Mathematics", slug: "math", icon: "📐", category: "subjects" },
        { name: "English", slug: "english", icon: "📝", category: "subjects" },
        { name: "Study Skills", slug: "study-skills", icon: "🎯", category: "subjects" },
        { name: "Homework Help", slug: "homework-help", icon: "📋", category: "subjects" }
      ],
      downloadableResource: {
        title: "ACE Homeschool State Compliance & Portfolio Guide",
        filename: "ace_homeschool_compliance_toolkit.pdf",
        fileType: "PDF Family Guide",
        previewDesc: "The comprehensive 15-page handbook highlighting state-by-state graduation regulations, portfolio compilation templates, and time-management strategies for families."
      }
    };
  }

  // General Fallback (dynamically adjusts to title)
  const currentTitle = rawTitle || (activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1));
  
  return {
    id: activeSlug,
    title: currentTitle,
    category: activeSlug.includes("prep") || ["act", "ged", "ap", "ielts", "toefl"].includes(activeSlug) ? "Exam Prep" : "Subjects",
    icon: ["act", "ged", "ap", "ielts", "toefl"].includes(activeSlug) ? "🏆" : "📚",
    tagline: `Achieve academic excellence and master your educational goals in 1-on-1 ${currentTitle} sessions`,
    description: `Expert-led 1-on-1 ${currentTitle} tutoring tailored to your child's curriculum, school goals, and learning habits. Available online or in-home.`,
    overviewText: [
      `Our customized ${currentTitle} tutoring program is designed to build foundational understanding and confidence. We pair your student with a highly-vetted subject specialist who tailors instruction directly to their school curriculum and learning styles.`,
      `We start by auditing conceptual gaps through custom diagnostics, creating an individual learning roadmap, and monitoring progress with daily summaries to ensure measurable classroom improvement.`
    ],
    eligibility: "Elementary School (K-5) • Middle School (6-8) • High School (9-12) • Advanced Placement and college preparation options.",
    learningOutcomes: [
      `Master core ${currentTitle} principles and advanced topics`,
      "Build deep academic confidence and eliminate classroom stress",
      "Prepare for classroom quizzes, exams, and standardized milestones",
      "Develop independent study habits and structured logical reasoning",
      "Exceed standard class curriculum and target top grades"
    ],
    skillsGained: [
      "Conceptual Mastery",
      "Logical Synthesis",
      "Time Optimization",
      "Exam Confidence",
      "Critical Problem-Solving"
    ],
    curriculum: [
      {
        title: "Baseline Diagnostics & Assessment",
        description: `Uncovering current student levels in ${currentTitle} and planning the custom roadmap.`,
        topics: ["Baseline Assessment", "Conceptual Gaps Map", "Target Score Setting"]
      },
      {
        title: "Targeted Skills & Guided Exercises",
        description: `Focusing on high-weight elements and building analytical speed in ${currentTitle}.`,
        topics: ["Core Concepts", "Guided Problem Sets", "Visual Representation"]
      },
      {
        title: "Advanced Problem-Solving & Synthesis",
        description: "Enabling students to apply knowledge to unfamiliar topics and build testing confidence.",
        topics: ["Synthesis Drills", "Mock Exam Reviews", "Study Guides Assembly"]
      }
    ],
    journeySteps: [
      { title: "Diagnostic Mapping", desc: "A detailed review highlighting exact gaps and conceptual strong points." },
      { title: "Individual Roadmap", desc: `Assembling a custom weekly syllabus aligned to your school ${currentTitle} track.` },
      { title: "Elite 1-on-1 Coaching", desc: `Consistent engaging tutoring sessions with direct feedback from ${currentTitle} specialists.` },
      { title: "Continuous Progress Audits", desc: "Regular grade tracking, mock quizzes, and monthly visual parent scorecard reports." }
    ],
    tutors: defaultTutors,
    pricing: defaultPricing,
    testimonials: getTestimonialsForSlug(activeSlug),
    faqs: defaultFaqs,
    relatedCourses: commonRelated.filter(c => c.slug !== activeSlug),
    downloadableResource: {
      title: `ACE ${currentTitle} Essential Study Guide & Formula Pack`,
      filename: `ace_${activeSlug}_essential_guide.pdf`,
      fileType: "PDF Workbook",
      previewDesc: `The comprehensive reference sheet outlining key terms, formula guides, and expert strategies to master ${currentTitle} classes.`
    }
  };
}
