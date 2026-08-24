"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from "lucide-react";

interface GuideItem {
  id: number;
  title: string;
  category: string;
  advice: string;
  actionStep: string;
}

const PARENT_GUIDES_DATABASE: GuideItem[] = [
  // Category 1: Academic Support at Home (10 items)
  {
    id: 1,
    title: "Establish a Multi-Sensory Homework Station",
    category: "Academic Support",
    advice: "Create a quiet workspace containing tactile tools (stress balls, textured desk mats) alongside traditional stationary. Visual cues help direct cognitive focus, while kinesthetic options allow kids to burn nervous energy without leaving their desks.",
    actionStep: "Remove digital devices and set up a physical tray with mechanical pencils, index cards, and a designated analog timer."
  },
  {
    id: 2,
    title: "Master the 24-Hour Review Cycle",
    category: "Academic Support",
    advice: "Help your child spend just 5 minutes reviewing class notes from that day before dinner. Scientific forgetting curves show that reviewing material within 24 hours of first hearing it raises retention rates by over 80%.",
    actionStep: "Ask your child to explain the single most interesting concept they learned today in their own words."
  },
  {
    id: 3,
    title: "Transition from 'Checking Answers' to 'Explaining Steps'",
    category: "Academic Support",
    advice: "When looking over finished worksheets, do not simply point out correct or incorrect solutions. Instead, select one random correct answer and ask your child to walk you through how they solved it to build metacognition.",
    actionStep: "Instead of saying 'this is wrong', say: 'Let&apos;s show our working for question four and see where the path diverged.'"
  },
  {
    id: 4,
    title: "Implement Standard Reading Aloud Routines",
    category: "Academic Support",
    advice: "Even after children learn to read independently, reading higher-level literature aloud together builds advanced vocabulary, complex syntax comprehension, and creates positive psychological associations with reading.",
    actionStep: "Set aside 15 minutes before bedtime to read a challenging chapter book together, alternating pages."
  },
  {
    id: 5,
    title: "Avoid Doing the Homework for Them",
    category: "Academic Support",
    advice: "It is highly tempting to correct spelling or step in to write the final formula. However, this creates learned helplessness. Let students turn in incomplete or incorrect homework so teachers get accurate diagnostics.",
    actionStep: "When they get stuck, ask clarifying prompts: 'What is the first step? What does this term mean in your notes?'"
  },
  {
    id: 6,
    title: "Celebrate Effort Over Natural Intelligence",
    category: "Academic Support",
    advice: "Praising a child for being 'smart' fosters a fixed mindset where they fear failures. Praising their work ethic, specific strategies, or perseverance builds a growth mindset ready to face complex subjects.",
    actionStep: "Say: 'I am so proud of how hard you practiced that algebra concept until it made sense!' instead of 'You are a math genius!'"
  },
  {
    id: 7,
    title: "The Power of Regular Graphic Organizers",
    category: "Academic Support",
    advice: "Many students struggle to convert thoughts into written essays. Teach them to use simple Venn diagrams, mind maps, or structured storyboards to outline concepts before touching a blank document.",
    actionStep: "Have your child draw 3 connected boxes (Beginning, Middle, End) on scrap paper before starting any creative paragraph."
  },
  {
    id: 8,
    title: "Coordinate with Tutors and School Teachers",
    category: "Academic Support",
    advice: "Keep a transparent, shared channel between your private tutors and school classroom educators. Aligning the specific vocabularies and methodologies prevents cognitive interference for the student.",
    actionStep: "Ask your ACE Education tutor to write a brief weekly summary that you can email to your school subject teacher."
  },
  {
    id: 9,
    title: "Promote Early Vocabulary Integration",
    category: "Academic Support",
    advice: "Incorporate advanced words naturally into family conversations. Hearing words like 'meticulous', 'erratic', or 'superfluous' in context prepares children for high-level reading comprehension tests without boring flashcard drills.",
    actionStep: "Introduce one 'family word of the week' and reward everyone who uses it correctly during dinner conversations."
  },
  {
    id: 10,
    title: "Utilize Real-world Math Integration",
    category: "Academic Support",
    advice: "Combat the common 'When will I ever use this?' complaint by integrating active calculations into regular household errands, shopping budgets, recipe scaling, or carpentry measurements.",
    actionStep: "Have your child calculate the 15% or 20% gratuity tip on restaurant bills without looking at their phone."
  },

  // Category 2: Study Environment & Routines (10 items)
  {
    id: 11,
    title: "Optimize Study Desk Lighting",
    category: "Study Environment",
    advice: "Dim or warm lighting signals the brain to release melatonin, making students drowsy during homework. Switch study lamps to cool, bright daylight bulbs (around 5000K-6500K) to promote mental alertness.",
    actionStep: "Replace traditional yellow bedroom light bulbs near desks with full-spectrum LED desk lamps."
  },
  {
    id: 12,
    title: "Enforce Digital Lock-boxes During Focus Blocks",
    category: "Study Environment",
    advice: "Having a smartphone sitting face-down on a desk consumes subconscious cognitive processing power, as the brain actively exerts energy to resist checking it. True focus requires absolute distance.",
    actionStep: "Establish a physical charging basket in the hallway where all phones must sit during active study hours."
  },
  {
    id: 13,
    title: "Match Room Scents to Specific Subjects",
    category: "Study Environment",
    advice: "Olfactory memories are incredibly durable. Diffusing peppermint or rosemary oils during intense study blocks, and carrying a small drop on a wrist to exams, can trigger localized retrieval pathways.",
    actionStep: "Diffuse lemon scent during math tutoring sessions and rosemary during intensive vocabulary review."
  },
  {
    id: 14,
    title: "Design a Physical 'To-Do' and 'Done' Station",
    category: "Study Environment",
    advice: "Children crave tactile progress indicators. Build a simple wall grid where homework assignments are represented by sticky notes moving physically across columns from Left to Right.",
    actionStep: "Set up a whiteboard with three column markings: 'To Do', 'In Progress', and 'Finished!'"
  },
  {
    id: 15,
    title: "The 5-Minute 'Desk Purge' Routine",
    category: "Study Environment",
    advice: "Clutter on a physical desk leads directly to cognitive overload and executive functioning strain. Establish a strict routine to clear all pencil shavings, trash, and loose papers at the end of each afternoon.",
    actionStep: "Set a repeating daily alarm for 5:00 PM to spend 3 minutes throwing away trash and organizing desk supplies."
  },
  {
    id: 16,
    title: "Configure Background Noise for Focus",
    category: "Study Environment",
    advice: "While lyric-heavy pop music interferes with language-processing centers, absolute dead silence can amplify minor house noises and break concentration. Opt for white noise, pink noise, or ambient lofi beats.",
    actionStep: "Play soft pink noise or natural rainfall sounds through a speaker during comprehension exercises."
  },
  {
    id: 17,
    title: "Use Ergonomic, Active Seating Solutions",
    category: "Study Environment",
    advice: "A rigid, poorly fitted chair causes muscle fatigue, prompting kids to squirm and lose focus. For high-energy students, replacing chairs with an exercise stability ball or a wiggle cushion increases subtle core engagement.",
    actionStep: "Add a simple balance cushion to your child&apos;s current desk chair to allow for mild, focus-friendly movement."
  },
  {
    id: 18,
    title: "Establish Consistent Transition Rituals",
    category: "Study Environment",
    advice: "Transitioning instantly from a video game to study mode is jarring for a child's brain. Implement a 5-minute buffering transition ritual (such as a physical stretch, glass of water, or opening windows).",
    actionStep: "Have your child do 10 jumping jacks and drink a full glass of water right before starting their tutoring sessions."
  },
  {
    id: 19,
    title: "Utilize Color-Coded Subject Binders",
    category: "Study Environment",
    advice: "Save precious mental energy spent looking for scattered loose worksheets. Assign one distinct color code to each subject (e.g., Red for Math, Blue for English, Green for Science) and stick to it strictly.",
    actionStep: "Purchase color-matching folders, notebook covers, and spine labels for each current school course."
  },
  {
    id: 20,
    title: "Post a Visible Daily Family Calendar",
    category: "Study Environment",
    advice: "Anxiety around unscheduled events drains focus. Keeping a large, visual family calendar in the kitchen ensures kids feel safe, structured, and aware of tutoring, sports, and recreational times.",
    actionStep: "Hang a large monthly dry-erase calendar at eye level in your common kitchen or hallway area."
  },

  // Category 3: Neurodiversity & Specialized Support (10 items)
  {
    id: 21,
    title: "Incorporate 'Body Doubling' for ADHD Minds",
    category: "Neurodiversity Support",
    advice: "People with ADHD often find it incredibly difficult to initiate tasks alone. 'Body doubling' involves simply having another person sit in the same room working quietly on their own task to double focus.",
    actionStep: "Sit at the same table reading a book or finishing work emails while your child completes their history reading."
  },
  {
    id: 22,
    title: "Utilize Colored Dyslexia Reading Overlays",
    category: "Neurodiversity Support",
    advice: "Some students with dyslexia or visual processing sensitivities experience 'visual stress' where black text on bright white paper appears to vibrate. Placing a translucent colored sheet over text can stabilize print.",
    actionStep: "Try using a light yellow or light blue tinted reading ruler overlay during daily school book readings."
  },
  {
    id: 23,
    title: "Provide Tactile manipulatives for Dyscalculia",
    category: "Neurodiversity Support",
    advice: "Dyscalculia prevents the brain from visualizing abstract numeric symbols. Keep physical counting beads, block models, or playdough on hand so numbers retain clear spatial volumes.",
    actionStep: "Use actual physical Lego blocks to represent division and fraction groupings visually."
  },
  {
    id: 24,
    title: "Implement the 'Time-Timer' for ADHD Visuals",
    category: "Neurodiversity Support",
    advice: "ADHD minds suffer from 'time blindness'—they struggle to estimate durations. Use a visual 'Time Timer' where a red disk slowly disappears as time counts down, making time progression concrete.",
    actionStep: "Avoid saying 'you have 20 minutes'. Instead, set a visual countdown disk showing the remaining wedge of red color."
  },
  {
    id: 25,
    title: "Structure Heavy Sensory Breaks",
    category: "Neurodiversity Support",
    advice: "Sensory-sensitive children get overwhelmed by continuous cognitive strain. Interject active, high-sensory muscle breaks (proprioceptive input) like wall sits, pushups, or carrying books to reset the nervous system.",
    actionStep: "Take a 4-minute sensory break halfway through homework, doing a quick physical stretching game."
  },
  {
    id: 26,
    title: "Break Instructions Down to Singular Items",
    category: "Neurodiversity Support",
    advice: "Giving multi-step spoken directions like 'Go get your backpack, find your math folder, grab a pencil, and start page ten' will overload working memory. Give instructions one single task at a time.",
    actionStep: "Give step one: 'Bring your math folder here.' Once complete, state step two: 'Open to page ten.'"
  },
  {
    id: 27,
    title: "Support Executive Function with 'First-Then' Boards",
    category: "Neurodiversity Support",
    advice: "Bypass motivational blocks using visual 'First-Then' displays. Placing a low-dopamine task directly beside a high-dopamine reward provides the necessary momentum to complete hard homework.",
    actionStep: "Write on a sticky note: 'FIRST: Read 3 pages. THEN: 10 minutes of drawing on your tablet.'"
  },
  {
    id: 28,
    title: "Normalize Mistakes as Essential Brain Sparks",
    category: "Neurodiversity Support",
    advice: "For neurodivergent students, errors can trigger intense emotional dysregulation. Explain that neural pathways literally grow stronger and shoot new synapses when the brain struggles to correct a mistake.",
    actionStep: "When they make a mistake, cheer: 'Fantastic! That is your brain building a brand new connection right there!'"
  },
  {
    id: 29,
    title: "Create Visual Routine Checklists",
    category: "Neurodiversity Support",
    advice: "Saves parents from repetitive nagging. Design a visual morning or packing routine using pictures of backpacks, lunchboxes, and boots so kids can complete steps independently.",
    actionStep: "Laminate a visual checklist of school morning steps and velcro it to their bedroom door for daily self-tracking."
  },
  {
    id: 30,
    title: "Practice Safe Reading Out Loud Policies",
    category: "Neurodiversity Support",
    advice: "Never force a struggling reader or dyslexic student to read aloud unexpectedly in front of large family gatherings or strangers. This triggers cortisol spikes and cements a deep psychological fear of literacy.",
    actionStep: "Keep reading sessions strictly private, comforting, and paced entirely by the student."
  },

  // Category 4: Emotional Wellbeing & Mindset (10 items)
  {
    id: 31,
    title: "Implement 'The 3-Breath Reset' Before Tests",
    category: "Emotional Wellbeing",
    advice: "When anxiety takes over, the sympathetic nervous system triggers a fight-or-flight response, locking down access to the prefrontal cortex. Taking three deep diaphragmatic breaths triggers the vagus nerve to restore logic.",
    actionStep: "Have your child breathe in for 4 seconds, hold for 4, and exhale slowly for 6 right before entering school on test day."
  },
  {
    id: 32,
    title: "Establish a No-Screentime Buffer Hour",
    category: "Emotional Wellbeing",
    advice: "The high-intensity blue light and constant dopamine pings from social scrolling or games overstimulates the amygdala and prevents deep sleep. Insufficient sleep acts as a major driver of daytime behavioral meltdowns.",
    actionStep: "Collect all digital screens exactly 60 minutes before bedtime and transition to audiobooks or reading."
  },
  {
    id: 33,
    title: "Introduce Gratitude Journaling to Reduce Academic Anxiety",
    category: "Emotional Wellbeing",
    advice: "Anxious minds obsess over future exams or potential poor grades. Spending 2 minutes writing down physical items they are grateful for shifts focus back to a grounded state.",
    actionStep: "Keep a small notepad at the dinner table and have everyone name two specific highlights from their day."
  },
  {
    id: 34,
    title: "Normalize Productive Academic Struggle",
    category: "Emotional Wellbeing",
    advice: "Struggle is not a sign of failure; it is a prerequisite for advanced learning. Reframe difficult school classes as a gym workout for the brain—weights must feel heavy to trigger muscular growth.",
    actionStep: "Say: 'This is a really tough science concept, which means your brain is doing some incredible heavy lifting today!'"
  },
  {
    id: 35,
    title: "Model Healthy Mistakes and Correction",
    category: "Emotional Wellbeing",
    advice: "Children copy parent responses to stress. If you spill something or make an error, vocalize a calm, logical correction process instead of reacting with frustration to show how healthy errors are managed.",
    actionStep: "Vocalize your own errors: 'Oops, I missed a turn on this map. No problem, let&apos;s recalculate a new route calmly.'"
  },
  {
    id: 36,
    title: "Set Realistic, Process-Oriented Goals",
    category: "Emotional Wellbeing",
    advice: "Instead of commanding 'you must score an A on this test' (which they cannot fully control), set goal standards based on preparation: 'Our goal is to complete four study cards and sleep eight hours.'",
    actionStep: "Write down preparation goals rather than numerical test scores on the study calendar."
  },
  {
    id: 37,
    title: "Keep Weekends Restful and Rejuvenating",
    category: "Emotional Wellbeing",
    advice: "Overscheduling tutoring, sports, arts, and social prep classes leads directly to chronic childhood burnout. Ensure your child has at least one full day of unstructured, free play and rest.",
    actionStep: "Keep Sundays entirely free of structured tests, tutoring, or academic commitments."
  },
  {
    id: 38,
    title: "Provide a Warm, Unconditional Welcoming Zone",
    category: "Emotional Wellbeing",
    advice: "Make sure your very first words when picking up your child from school are not about homework, tests, or grades. Welcome them as an individual to show their worth is not tied to performance.",
    actionStep: "When they enter the car, greet them with: 'I am so happy to see you! How was your lunch today?'"
  },
  {
    id: 39,
    title: "Teach Active Emotional Identification",
    category: "Emotional Wellbeing",
    advice: "When kids get frustrated with math, they might scream or throw pencils. Help them name the precise emotion: 'It sounds like you are feeling overwhelmed right now. Let&apos;s step back.' Naming emotions calms the amygdala.",
    actionStep: "Ask: 'Are you feeling confused by this step, or are you just feeling tired overall?'"
  },
  {
    id: 40,
    title: "Promote Physical Nature Escapes",
    category: "Emotional Wellbeing",
    advice: "Spending time in green, outdoor spaces lowers circulating cortisol (stress hormone) levels and restores cognitive attention reservoirs that are depleted by school screen time.",
    actionStep: "Plan a brief 15-minute neighborhood walk together in the park right after school gets out."
  },

  // Category 5: College Prep & Planning (10 items)
  {
    id: 41,
    title: "Create an Academic 'Spike' Over Generic Lists",
    category: "College Planning",
    advice: "Ivy League and selective US colleges are no longer looking for 'well-rounded' students with a laundry list of unrelated clubs. They seek 'well-rounded classes' comprised of students with highly focused, deep mastery spikes.",
    actionStep: "Help your child select one deep hobby (like research, coding, or historical writing) and build a multi-year project around it."
  },
  {
    id: 42,
    title: "Initiate Early Admissions Research in 10th Grade",
    category: "College Planning",
    advice: "Waiting until senior year to understand college applications leads to immense family panic. Begin taking low-pressure campus visits during spring break of sophomore year to build positive motivation.",
    actionStep: "Select two local universities and walk around the campus with your 10th grader to get a feel for college life."
  },
  {
    id: 43,
    title: "Help Them Draft the Extracurricular Descriptions First",
    category: "College Planning",
    advice: "The Common App allows only 150 characters to describe each high school activity. Learning to write concise, impact-oriented descriptions showing leadership metrics early on is crucial.",
    actionStep: "Have your teen write down their school clubs using active verbs: 'Managed', 'Founded', 'Coordinated', 'Increased'."
  },
  {
    id: 44,
    title: "Coordinate Letters of Recommendation Early",
    category: "College Planning",
    advice: "The best high school teachers get flooded with requests for recommendation letters in the fall. Instruct your child to ask selected teachers at the end of junior year (May) to secure their slots.",
    actionStep: "Have your 11th grader prepare a short 'Brag Sheet' summarizing their best projects to give to teachers in the spring."
  },
  {
    id: 45,
    title: "Configure a Master College Application Spreadsheet",
    category: "College Planning",
    advice: "Avoid missed scholarship or application deadlines. Maintain a unified master tracking sheet containing application deadlines, essay requirements, cost estimators, and portal login details.",
    actionStep: "Set up a shared Google Sheet with columns for school name, early decision deadline, regular deadline, and essay topics."
  },
  {
    id: 46,
    title: "Understand the FAFSA Simplification Guidelines",
    category: "College Planning",
    advice: "Financial aid forms can be incredibly complex. Keep up-to-date with FAFSA asset rules and tax requirements, submitting forms as soon as the window opens in the fall of senior year to maximize state grant funds.",
    actionStep: "Create your student&apos;s FSA ID (Federal Student Aid ID) online during summer before senior year."
  },
  {
    id: 47,
    title: "Practice Mock Admissions Interviews at Home",
    category: "College Planning",
    advice: "Many high schoolers have never conducted a formal interview. Help them build conversational confidence by asking open-ended questions about their reading lists, favorite teachers, and future aspirations.",
    actionStep: "Do a 10-minute mock interview over dinner, asking: 'Why are you excited to study your chosen major?'"
  },
  {
    id: 48,
    title: "Encourage Authentic Personal Statements Over Clichés",
    category: "College Planning",
    advice: "Admissions officers read thousands of essays about scoring a winning sports goal or going on short service trips. Encourage your student to write about small, highly specific, authentic slices of their daily life instead.",
    actionStep: "Prompt them with: 'What is a unique habit, interest, or perspective you have that has absolutely nothing to do with school?'"
  },
  {
    id: 49,
    title: "Analyze College Financial Aid Award Letters Meticulously",
    category: "College Planning",
    advice: "Financial aid packages can be intentionally misleading, blending parent loans (PLUS loans) in with free scholarships. Carefully subtract all debt options to compute the true net out-of-pocket cost.",
    actionStep: "Utilize online net-price calculators for each specific college to verify actual final costs beforehand."
  },
  {
    id: 50,
    title: "Promote Student Autonomy in College Outreach",
    category: "College Planning",
    advice: "Colleges track 'demonstrated interest'—they note who visits and signs up for emails. Importantly, emails and questions must come directly from the student's email, never the parent's, to demonstrate self-reliance.",
    actionStep: "Have your teen sign up for college info newsletters and submit their own questions to admission representatives."
  }
];

export default function ParentGuidesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ["All", "Academic Support", "Study Environment", "Neurodiversity Support", "Emotional Wellbeing", "College Planning"];

  const filteredGuides = PARENT_GUIDES_DATABASE.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.advice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.actionStep.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 pb-6 mb-6">
        <h2 className="text-2xl font-extrabold text-navy">The 50 Essential Parent Action Guides</h2>
        <p className="text-sm text-gray-500 mt-1">
          A comprehensive database of 50 structured developmental guides, parenting techniques, and academic milestones. Use search or category pills below.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search 50 parent guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-gold focus:outline-none text-navy text-sm transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold text-navy shadow-sm"
                  : "bg-[#F8F9FC] text-gray-500 hover:bg-gold/10 hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides List */}
      <div className="space-y-3">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => {
            const isExpanded = expandedId === guide.id;
            return (
              <div
                key={guide.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isExpanded
                    ? "border-gold/50 bg-gold/5/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleExpand(guide.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="pr-4">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">
                      #{guide.id} &bull; {guide.category}
                    </span>
                    <h3 className="font-bold text-navy text-sm md:text-base mt-0.5 leading-snug">
                      {guide.title}
                    </h3>
                  </div>
                  <div className="shrink-0 text-navy/40">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 border-t border-dashed border-gray-100">
                    <div className="text-sm text-gray-600 leading-relaxed mt-2">
                      <p className="font-medium text-navy/80">Expert Strategy:</p>
                      <p className="mt-1">{guide.advice}</p>
                    </div>

                    <div className="mt-4 bg-[#F8F9FC] p-4 rounded-xl border border-gray-100/50">
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-navy uppercase tracking-wider block">Recommended Action:</span>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{guide.actionStep}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">No guides match your search criteria</p>
            <p className="text-xs text-gray-500 mt-1">Try selecting &quot;All&quot; or clearing your filter query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
