"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from "lucide-react";

interface TipItem {
  id: number;
  title: string;
  category: string;
  explanation: string;
  actionStep: string;
}

const STUDY_TIPS_DATABASE: TipItem[] = [
  // Category 1: Time Management & Organization (10 items)
  {
    id: 1,
    title: "Master the 25/5 Pomodoro Cycle",
    category: "Time & Organization",
    explanation: "Our brains can only maintain high-intensity focus for about 20-30 minutes before cognitive fatigue sets in. Study intensely with zero distractions for 25 minutes, then take a hard 5-minute break away from your desk.",
    actionStep: "Set a physical egg timer or use a desktop app for 25 minutes. Do not open tabs or touch your phone until it rings."
  },
  {
    id: 2,
    title: "Utilize Time-Blocked Calendars",
    category: "Time & Organization",
    explanation: "To-do lists often fail because they lack temporal context. Instead of just writing down tasks, block out precise hours on your calendar for specific subject reviews, just like scheduling classes.",
    actionStep: "Write 'Sunday 2:00 PM - 3:30 PM: AP Physics Review' directly onto your planner."
  },
  {
    id: 3,
    title: "Apply the 'Eat the Frog' Rule First",
    category: "Time & Organization",
    explanation: "We waste valuable willpower procrastinating on our most difficult or boring task. Tackle your hardest subject first thing in your study session when your brain is fresh and alert.",
    actionStep: "List your tasks in order of difficulty and complete the absolute hardest one first before looking at the rest."
  },
  {
    id: 4,
    title: "Defeat Procrastination with the 5-Minute Rule",
    category: "Time & Organization",
    explanation: "Starting a task is the hardest psychological barrier. Tell yourself you will work on your homework for exactly 5 minutes, and if you still want to quit after that, you can. 80% of the time, momentum will keep you going.",
    actionStep: "Open your math notebook and solve just one problem. Check if you want to keep going after that."
  },
  {
    id: 5,
    title: "Draft an Assignment Syllabus Calendar",
    category: "Time & Organization",
    explanation: "Don&apos;t rely on daily homework boards. Combine syllabus requirements from all your classes into a single, unified monthly visual calendar so deadlines never sneak up on you.",
    actionStep: "Write all exam dates and long-term project submissions onto a big wall calendar on the first day of each month."
  },
  {
    id: 6,
    title: "Prepare Your Desk the Night Before",
    category: "Time & Organization",
    explanation: "Wasting 10 minutes looking for your notebook, pen, or calculator kills study motivation before you start. Clear your desk and open your books to the correct page the night before.",
    actionStep: "Spend 3 minutes at night setting up your desk so it is completely ready for your morning study block."
  },
  {
    id: 7,
    title: "Avoid Multitasking at All Costs",
    category: "Time & Organization",
    explanation: "Switching between studying and checking text messages creates 'attention residue' which severely degrades your working memory. Doing two tasks at once takes 50% longer and doubles your error rate.",
    actionStep: "Close all messaging apps and social tabs. Dedicate single focus to one browser window only."
  },
  {
    id: 8,
    title: "Optimize Your Weekly Study Rhythm",
    category: "Time & Organization",
    explanation: "Avoid study marathons of 8 hours over the weekend. Spreading your study sessions into smaller 1-hour sessions over 6 days produces vastly superior memory retention and reduces academic anxiety.",
    actionStep: "Divide your weekly revision material into six 45-minute daily blocks instead of one giant weekend session."
  },
  {
    id: 9,
    title: "Establish a Strict Digital Desktop File System",
    category: "Time & Organization",
    explanation: "Searching through a messy 'Downloads' folder for school files wastes valuable cognitive energy. Maintain clean, labeled cloud directories for every single class.",
    actionStep: "Create structured folders in Google Drive or OneDrive named: '10th Grade Math', '10th Grade Chemistry', etc."
  },
  {
    id: 10,
    title: "Create Checklist Lists for Exam Materials",
    category: "Time & Organization",
    explanation: "Arriving to standardized exams like the SAT or AP without a permitted calculator, pencils, or admission tickets triggers immediate panic, draining your executive focus before the test begins.",
    actionStep: "Write out a physical packing checklist for exam days and pack your bag completely the evening before."
  },

  // Category 2: Memory Retention & Active Recall (10 items)
  {
    id: 11,
    title: "Apply Active Recall Over Passive Review",
    category: "Memory & Recall",
    explanation: "Re-reading highlighted textbooks creates an 'illusion of competence' where material feels familiar, but you cannot retrieve it independently. Instead, close the book and force your brain to retrieve answers.",
    actionStep: "After reading a chapter, close it and write down 5 key concepts on a blank sheet from memory."
  },
  {
    id: 12,
    title: "Deploy Spaced Repetition Schedules",
    category: "Memory & Recall",
    explanation: "To keep memories from decaying, you must review information at gradually increasing intervals (e.g., 1 day, 3 days, 7 days, 14 days, 30 days). This forces the brain to actively reconstruct the pathways.",
    actionStep: "Label flashcards or calendar items with future review dates based on how well you remember them."
  },
  {
    id: 13,
    title: "Explain It Like I&apos;m 5 (Feynman Technique)",
    category: "Memory & Recall",
    explanation: "The ultimate test of understanding is whether you can explain a complex concept to someone with no background in the subject. This immediately highlights gaps in your logical chain.",
    actionStep: "Teach a complex scientific or historical topic to a parent, sibling, or even a pet using simple analogies."
  },
  {
    id: 14,
    title: "Use Double-Sided Active Flashcards",
    category: "Memory & Recall",
    explanation: "Traditional notes encourage passive reading. Flashcards force active retrieval. Place a distinct question on one side and a concise, structured answer on the back.",
    actionStep: "Convert your key textbook vocabularies and formulas into active double-sided flashcard decks."
  },
  {
    id: 15,
    title: "Incorporate Creative Mnemonics and Acronyms",
    category: "Memory & Recall",
    explanation: "Our brains remember silly, colorful, or structured stories far better than abstract lists. Create catchy acronyms (like PEMDAS for math order of operations) or visual mental associations.",
    actionStep: "Make up a funny, bizarre sentence where the first letter of each word corresponds to items in a list you must memorize."
  },
  {
    id: 16,
    title: "The Mind Palace Memory Technique",
    category: "Memory & Recall",
    explanation: "Associate list items with physical objects in a very familiar space (like your childhood bedroom). By mentally walking through the room, you can trigger strong spatial memories of the concepts.",
    actionStep: "Mentally attach a history date to your desk, another to your window, and another to your bed post."
  },
  {
    id: 17,
    title: "Draw Active Sketch Notes",
    category: "Memory & Recall",
    explanation: "Translating words into simple doodles or flowchart arrows engages dual-coding pathways in your brain, connecting visual and auditory cortex systems for much stronger memory retention.",
    actionStep: "Draw simple icons, box frames, and connect-lines alongside your written vocabulary notes."
  },
  {
    id: 18,
    title: "Conduct Blind Note-Taking (Brain Dumps)",
    category: "Memory & Recall",
    explanation: "To gauge your actual exam readiness, take a completely blank piece of paper and write down everything you can possibly remember about a topic in 5 minutes with zero references.",
    actionStep: "Spend 5 minutes doing a continuous 'brain dump' on a topic, then open your textbook to color-correct what you missed."
  },
  {
    id: 19,
    title: "Vocalize Your Critical Thoughts Out Loud",
    category: "Memory & Recall",
    explanation: "Reading silently lets your mind wander. Speaking and explaining notes out loud forces your brain to process grammatical structures actively, cement pronounciation, and lock down complex terms.",
    actionStep: "Read key paragraphs and summarize historical timelines out loud in your room while studying."
  },
  {
    id: 20,
    title: "Study Before Bed to Trigger Sleep Consolidation",
    category: "Memory & Recall",
    explanation: "Your brain consolidates and files memories during deep REM sleep phases. Reviewing highly difficult flashcards or vocabulary lists immediately before sleeping signals the brain to prioritize that information.",
    actionStep: "Do a quick 10-minute flashcard review right before turning off your lights to sleep."
  },

  // Category 3: Exam Prep & Test-Taking Strategy (10 items)
  {
    id: 21,
    title: "Practice in Full-Length Exam Conditions",
    category: "Exam Strategy",
    explanation: "Scoring well on high-stakes tests like the SAT, ACT, or APs requires physical and mental endurance, not just knowledge. Practice full-length tests at the same time of day with no breaks.",
    actionStep: "Wake up on a Saturday morning and take an entire mock exam under strict timed conditions."
  },
  {
    id: 22,
    title: "Create a Personal Error Log Book",
    category: "Exam Strategy",
    explanation: "Doing practice questions is useless if you don&apos;t learn from mistakes. Keep an active log of every question you get wrong. Write down the problem, the correct solution, and the exact conceptual mistake you made.",
    actionStep: "Review your physical error log book before every major practice test to ensure you never repeat past errors."
  },
  {
    id: 23,
    title: "Learn the Art of Strategic Triage (skipping)",
    category: "Exam Strategy",
    explanation: "All questions carry equal points, but some take five times longer to solve. Never get stuck on a difficult question. If you cannot solve it in 45 seconds, mark it, skip it, and return to it later.",
    actionStep: "Practice skipping the hardest 3 questions of a section on your next test, securing all easy points first."
  },
  {
    id: 24,
    title: "Master the Process of Elimination (POE)",
    category: "Exam Strategy",
    explanation: "On multiple-choice exams, finding the single correct answer can be difficult. It is often much easier to actively search for and cross off the three completely incorrect answers first.",
    actionStep: "Physically draw a line through options you know are incorrect to reduce visual clutter on the test page."
  },
  {
    id: 25,
    title: "Pre-Read Exam Questions for Context",
    category: "Exam Strategy",
    explanation: "When tackling reading passages on the SAT, ACT, or AP English, pre-read the questions first. This gives your brain active targets to look for as you scan the text, rather than reading passively.",
    actionStep: "Spend 30 seconds scanning the questions and underlining key words before reading any passage."
  },
  {
    id: 26,
    title: "Check Your Calculations Backward",
    category: "Exam Strategy",
    explanation: "Our brains easily repeat basic mental errors if we check them using the exact same path. Verify your math solutions by plugging the answer options back into the original equation or using inverse operations.",
    actionStep: "Confirm your algebraic solving steps by working backward from your final answer to verify the equation holds."
  },
  {
    id: 27,
    title: "Maintain a Steady Clock Pacing Strategy",
    category: "Exam Strategy",
    explanation: "Avoid looking at the countdown timer every 10 seconds, which induces panic. Instead, establish check-in milestones (e.g., 'I should be on question 10 by the 15-minute mark').",
    actionStep: "Divide your test sections into quarters and assign a checkpoint target time for each quarter."
  },
  {
    id: 28,
    title: "Annotate Test Texts Aggressively",
    category: "Exam Strategy",
    explanation: "Active writing keeps your brain from falling asleep. Underline thesis statements, circle transition words (but, however, therefore), and write tiny 3-word summaries in the margins of reading tests.",
    actionStep: "Write a brief margin note summarizing the primary argument of each paragraph you read."
  },
  {
    id: 29,
    title: "Avoid Cramming on the Final Night",
    category: "Exam Strategy",
    explanation: "Cramming raises cortisol, causing brain fog and sleep deprivation. You will score significantly higher with a well-rested brain and 75% prep than a exhausted brain with 95% prep.",
    actionStep: "Stop all studying by 6:00 PM on the night before a major exam and focus entirely on resting."
  },
  {
    id: 30,
    title: "Analyze Sample Essay Rubrics",
    category: "Exam Strategy",
    explanation: "For AP or SAT/ACT writing, don&apos;t guess what makes a good essay. Print and analyze official grading rubrics. Focus on hitting the exact thesis, evidence, and synthesis criteria that examiners score.",
    actionStep: "Underline the precise grading requirements on your school or college board writing rubric."
  },

  // Category 4: Focus & Mental Concentration (10 items)
  {
    id: 31,
    title: "The Zero-Device Boundary Rule",
    category: "Focus & Focus Hacks",
    explanation: "If your phone is within sight or reach, your focus is compromised. Place your devices in another room, or use absolute blocking apps that lock down distracting websites during study blocks.",
    actionStep: "Download a focus app blocker and run a 45-minute block before opening your homework."
  },
  {
    id: 32,
    title: "Integrate Oxygenation Focus Breaks",
    category: "Focus & Focus Hacks",
    explanation: "Carbon dioxide builds up in closed bedrooms, making you drowsy. Open windows to let fresh oxygen in, and do a quick physical stretching drill between study sets to increase blood flow to the brain.",
    actionStep: "Open your study room door and do 15 deep air-squats between your study sessions."
  },
  {
    id: 33,
    title: "Utilize Noise-Canceling Earplugs",
    category: "Focus & Focus Hacks",
    explanation: "Auditory distractions are the leading cause of broken concentration. Simple foam earplugs or active noise-canceling headphones block sudden household interruptions and help trigger deep focus.",
    actionStep: "Invest in comfortable foam earplugs or noise-canceling headphones specifically for exam prep sessions."
  },
  {
    id: 34,
    title: "Keep a Distraction Capture Scratchpad",
    category: "Focus & Focus Hacks",
    explanation: "While studying, random thoughts will pop up (e.g., 'I need to email my friend' or 'I need to check that video'). Do not act on them. Write them down on a scratchpad to clear them from working memory.",
    actionStep: "Keep a blank piece of paper next to your keyboard labeled 'Distractions to do LATER' and write random thoughts there."
  },
  {
    id: 35,
    title: "Deploy Task-Based Rewards",
    category: "Focus & Focus Hacks",
    explanation: "Motivate your brain by setting clear rewards for completing study milestones. Rather than studying aimlessly, connect completion to a dopamine incentive.",
    actionStep: "Tell yourself: 'Once I complete these 5 calculus questions, I can watch 10 minutes of my favorite show.'"
  },
  {
    id: 36,
    title: "Work in Blocks aligned with Circadian Rhythms",
    category: "Focus & Focus Hacks",
    explanation: "We experience natural energy dips in the early afternoon. Schedule your most demanding analytical studies during high-energy mornings or early evenings, leaving administrative tasks for slow periods.",
    actionStep: "Save vocabulary listing and school form filing for post-lunch hours when energy naturally dips."
  },
  {
    id: 37,
    title: "Clear Visual Field Clutter",
    category: "Focus & Focus Hacks",
    explanation: "Your peripheral vision constantly scans the environment. A desk covered in miscellaneous gadgets, toys, or food wrappers creates low-level distraction. Keep only your current subject material in view.",
    actionStep: "Clear everything off your desk except your laptop, notebook, pen, and a glass of water."
  },
  {
    id: 38,
    title: "Practice Focused Diaphragmatic Breathing",
    category: "Focus & Focus Hacks",
    explanation: "When math anxiety rises, your chest-breathing accelerates, signaling danger to the brain. Deep diaphragmatic breathing resets your autonomic system, letting you tackle hard steps logically.",
    actionStep: "Place your hand on your belly and take 5 slow breaths, making sure your hand rises with each inhale."
  },
  {
    id: 39,
    title: "Limit Study Group Sizes to 3 People",
    category: "Focus & Focus Hacks",
    explanation: "Large study groups quickly devolve into social gatherings and gossip sessions. Limit your collaborative study groups to a maximum of 3 highly motivated classmates.",
    actionStep: "Coordinate with 2 focused friends and establish a strict agenda of topic questions before meeting."
  },
  {
    id: 40,
    title: "Optimize Hydration Levels for Clarity",
    category: "Focus & Focus Hacks",
    explanation: "Even mild dehydration (1-2% body weight loss) reduces cognitive performance, slows processing speeds, and causes headaches that destroy study focus.",
    actionStep: "Keep a large filled water bottle on your desk and take a sip every time you complete a study task."
  },

  // Category 5: Language & Writing Mastery (10 items)
  {
    id: 41,
    title: "Establish a Strong Thesis Blueprint",
    category: "Writing & Language",
    explanation: "A weak essay has no direction. Your introductory paragraph must end with a clear, argumentative thesis statement that outlines exactly what you will prove and the three evidence pathways you will use.",
    actionStep: "Never start writing an essay until you have written and refined a single-sentence thesis statement on scratch paper."
  },
  {
    id: 42,
    title: "Apply the PEEL Paragraph Method",
    category: "Writing & Language",
    explanation: "Ensure every body paragraph is structured and logical using PEEL: Point (topic sentence), Evidence (quote or fact), Explanation (analyze the evidence), and Link (connect back to the thesis).",
    actionStep: "Color-code your essay drafts with highlighters to ensure every single paragraph contains all four PEEL steps."
  },
  {
    id: 43,
    title: "Eliminate Passive Voice for Clarity",
    category: "Writing & Language",
    explanation: "Passive voice ('The book was read by the student') is wordy and weak. Use active voice ('The student read the book') to make your writing direct, energetic, and highly professional.",
    actionStep: "Scan your essay for forms of 'to be' (is, was, were) followed by a past participle, and rewrite them with active verbs."
  },
  {
    id: 44,
    title: "Utilize Academic Transition Hooks",
    category: "Writing & Language",
    explanation: "Choppy sentences disrupt reading flow. Use structured transitions (Furthermore, Consequently, On the other hand, Conversely) to show precise logical relationships between paragraphs.",
    actionStep: "Incorporate at least two formal logical transition words into each body paragraph of your essay."
  },
  {
    id: 45,
    title: "Read Your Essay Drafts Aloud to Edit",
    category: "Writing & Language",
    explanation: "Our eyes naturally jump over typos and grammatical errors when we read silently. Reading your writing out loud forces you to hear awkward sentence structures, missing punctuation, and rhythm issues.",
    actionStep: "Read your completed essay draft out loud, marking any spots where you run out of breath or stumble over words."
  },
  {
    id: 46,
    title: "Vary Sentence Lengths for Rhythm",
    category: "Writing & Language",
    explanation: "Monotonous writing bores examiners. Mix short, punchy sentences with longer, complex compound clauses to create a musical prose rhythm that keeps readers engaged.",
    actionStep: "Audit your paragraph structures to ensure you have a mix of short, medium, and long complex sentences."
  },
  {
    id: 47,
    title: "Keep a Personal Vocabulary Log",
    category: "Writing & Language",
    explanation: "Reading advanced literature is only useful if you learn new terms. Keep an ongoing digital vocabulary notebook. Write down unfamiliar words, dictionary definitions, and custom sentence examples.",
    actionStep: "Add three new words to your log book each week and actively incorporate them into your school writings."
  },
  {
    id: 48,
    title: "Underline Crucial Text Context Clues",
    category: "Writing & Language",
    explanation: "When analyzing unfamiliar vocabulary on comprehension tests, look for synonym clues, antonym contrasts, or cause-and-effect indicators in surrounding sentences to deduce meanings.",
    actionStep: "Circle adjacent transition words like 'although' or 'because' to identify the logical relationship to the hard word."
  },
  {
    id: 49,
    title: "Draft an Outline Before Typing",
    category: "Writing & Language",
    explanation: "Typing an essay without an outline leads to rambling paragraphs that stray from the prompt. Spend 5-10 minutes plotting your thesis and core arguments before writing.",
    actionStep: "Create a physical outline sheet mapping: Intro, Point 1, Point 2, Point 3, and Conclusion before touching your keyboard."
  },
  {
    id: 50,
    title: "Avoid Over-Intellectual Thesaurus Clutter",
    category: "Writing & Language",
    explanation: "Using complex words incorrectly just to look smart is a major red flag for examiners. Focus on absolute precision, clarity, and structural coherence over unnecessary vocabulary bloat.",
    actionStep: "Only use advanced words when they fit your target meaning perfectly; never force them in."
  }
];

export default function StudyTipsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ["All", "Time & Organization", "Memory & Recall", "Exam Strategy", "Focus & Focus Hacks", "Writing & Language"];

  const filteredTips = STUDY_TIPS_DATABASE.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.actionStep.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 pb-6 mb-6">
        <h2 className="text-2xl font-extrabold text-navy">The 50 Essential Student Study Tips</h2>
        <p className="text-sm text-gray-500 mt-1">
          Explore our collection of 50 structured study techniques, memory retention hacks, and test-taking strategies designed for academic success.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search 50 study tips..."
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

      {/* Tips List */}
      <div className="space-y-3">
        {filteredTips.length > 0 ? (
          filteredTips.map((tip) => {
            const isExpanded = expandedId === tip.id;
            return (
              <div
                key={tip.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isExpanded
                    ? "border-gold/50 bg-gold/5/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleExpand(tip.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="pr-4">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">
                      #{tip.id} &bull; {tip.category}
                    </span>
                    <h3 className="font-bold text-navy text-sm md:text-base mt-0.5 leading-snug">
                      {tip.title}
                    </h3>
                  </div>
                  <div className="shrink-0 text-navy/40">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 border-t border-dashed border-gray-100">
                    <div className="text-sm text-gray-600 leading-relaxed mt-2">
                      <p className="font-medium text-navy/80">Explanation &amp; Strategy:</p>
                      <p className="mt-1">{tip.explanation}</p>
                    </div>

                    <div className="mt-4 bg-[#F8F9FC] p-4 rounded-xl border border-gray-100/50">
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-navy uppercase tracking-wider block">Recommended Practice:</span>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tip.actionStep}</p>
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
            <p className="text-sm font-semibold text-navy">No study tips match your search criteria</p>
            <p className="text-xs text-gray-500 mt-1">Try selecting &quot;All&quot; or clearing your filter query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
