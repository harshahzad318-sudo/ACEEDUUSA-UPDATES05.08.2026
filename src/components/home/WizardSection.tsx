"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, User, Clock, MapPin, Sparkles } from "lucide-react";
import { STATES } from "@/lib/data";

const STEPS = [
  { title: "Grade Level", subtitle: "Who needs tutoring?" },
  { title: "Curriculum", subtitle: "Choose curriculum" },
  { title: "Subject", subtitle: "Choose subject" },
  { title: "Learning Mode", subtitle: "How would you like to learn?" },
  { title: "Schedule", subtitle: "Preferred schedule" },
  { title: "Location", subtitle: "Where are you?" },
  { title: "Your Details", subtitle: "Create your account" },
];

const GRADES = ["Preschool", "Primary", "Secondary", "Elementary", "Middle School", "High School", "College", "Adult"];
const CURRICULA = ["Common Core", "AP", "IB", "IGCSE", "A Levels", "SAT", "ACT", "GED", "IELTS", "TOEFL"];
const SUBJECTS_LIST = ["Math", "English", "Reading", "Writing", "Science", "Physics", "Chemistry", "Biology", "Homework Help", "Study Skills", "ADHD Support", "Dyslexia Support"];
const MODES = ["Online", "In Home"];
const SCHEDULES = ["Morning", "Afternoon", "Evening", "Weekdays", "Weekends"];

const ChipSelect = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {options.map(o => (
      <button 
        key={o} 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onChange(o);
        }} 
        className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer ${
          value === o 
            ? "border-gold bg-gold/10 text-navy shadow-inner" 
            : "border-gray-200 hover:border-gold/50 text-gray-600 bg-white"
        }`}
      >
        {o}
      </button>
    ))}
  </div>
);

export default function WizardSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    grade: "", curriculum: "", subject: "", mode: "", schedules: [] as string[],
    state: "", city: "", zip: "", parentName: "", studentName: "", email: "", phone: "", password: "",
  });
  const [completed, setCompleted] = useState(false);

  const toggleSchedule = (s: string) => {
    setData(prev => ({
      ...prev,
      schedules: prev.schedules.includes(s) ? prev.schedules.filter(x => x !== s) : [...prev.schedules, s]
    }));
  };

  const next = async () => {
    if (step < 6) {
      setStep(prev => prev + 1);
    } else {
      setCompleted(true);
      if (data.email) {
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              parentName: data.parentName,
              studentName: data.studentName,
              email: data.email,
              phone: data.phone,
              gradeLevel: data.grade,
              curriculum: data.curriculum,
              subject: data.subject,
              learningMode: data.mode,
              schedule: data.schedules.join(", "),
              state: data.state,
              city: data.city,
              zipCode: data.zip,
              source: "tutor_matching_wizard",
            }),
          });
        } catch (err) {
          console.error("Failed to submit wizard lead:", err);
        }
      }
    }
  };
  const prev = () => {
    setStep(prev => (prev > 0 ? prev - 1 : prev));
  };

  if (completed) {
    return (
      <section id="wizard" className="py-20 bg-bg-light">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-navy mb-4">Your Personalized Recommendation</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-bg-light rounded-2xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Recommended Tutor</div>
                <div className="text-lg font-bold text-navy mt-1">Dr. Sarah Mitchell</div>
                <div className="text-sm text-gray-500">Mathematics Specialist</div>
              </div>
              <div className="bg-bg-light rounded-2xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Programme</div>
                <div className="text-lg font-bold text-navy mt-1">{data.curriculum || "Common Core"} {data.subject || "Math"}</div>
                <div className="text-sm text-gray-500">{data.grade || "High School"} Level</div>
              </div>
              <div className="bg-bg-light rounded-2xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Weekly Hours</div>
                <div className="text-lg font-bold text-navy mt-1">3–4 hours</div>
                <div className="text-sm text-gray-500">2 sessions per week</div>
              </div>
              <div className="bg-bg-light rounded-2xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Est. Monthly Tuition</div>
                <div className="text-lg font-bold text-gold mt-1">{data.mode === "In Home" ? "$579" : "$399"}/month</div>
                <div className="text-sm text-gray-500">10 hrs/month package</div>
              </div>
            </div>
            <a href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl text-sm mt-8 transition-all hover:shadow-lg">
              Book Free Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wizard" className="py-20 bg-bg-light">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Find the Perfect Tutor in Under One Minute</h2>
          <p className="text-gray-500 mt-3">Answer a few quick questions and we&apos;ll match you with the ideal tutor.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-gold w-8" : "bg-gray-200 w-4"}`} />
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="mb-2 text-xs text-gold font-semibold uppercase tracking-wider">Step {step + 1} of 7</div>
          <h3 className="text-2xl font-bold text-navy mb-2">{STEPS[step].title}</h3>
          <p className="text-gray-500 text-sm mb-8">{STEPS[step].subtitle}</p>

           {step === 0 && <ChipSelect options={GRADES} value={data.grade} onChange={v => { setData(prev => ({...prev, grade: v})); setTimeout(next, 200); }} />}
          {step === 1 && <ChipSelect options={CURRICULA} value={data.curriculum} onChange={v => { setData(prev => ({...prev, curriculum: v})); setTimeout(next, 200); }} />}
          {step === 2 && <ChipSelect options={SUBJECTS_LIST} value={data.subject} onChange={v => { setData(prev => ({...prev, subject: v})); setTimeout(next, 200); }} />}
          {step === 3 && <ChipSelect options={MODES} value={data.mode} onChange={v => { setData(prev => ({...prev, mode: v})); setTimeout(next, 200); }} />}
          {step === 4 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SCHEDULES.map(s => (
                <button 
                  key={s} 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSchedule(s);
                  }} 
                  className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${data.schedules.includes(s) ? "border-gold bg-gold/10 text-navy" : "border-gray-200 hover:border-gold/50 text-gray-600"}`}
                >
                  {data.schedules.includes(s) && <CheckCircle className="w-4 h-4 inline mr-1 text-gold" />}{s}
                </button>
              ))}
            </div>
          )}
          {step === 5 && (
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">State</label>
                <select value={data.state} onChange={e => setData({...data, state: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none">
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">City</label>
                <input value={data.city} onChange={e => setData({...data, city: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">ZIP Code</label>
                <input value={data.zip} onChange={e => setData({...data, zip: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none" placeholder="ZIP" />
              </div>
            </div>
          )}
          {step === 6 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Parent Name", key: "parentName" as const, type: "text" },
                { label: "Student Name", key: "studentName" as const, type: "text" },
                { label: "Email", key: "email" as const, type: "email" },
                { label: "Phone", key: "phone" as const, type: "tel" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                  <input value={data[f.key]} onChange={e => setData({...data, [f.key]: e.target.value})} type={f.type} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none" placeholder={f.label} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
                <input value={data.password} onChange={e => setData({...data, password: e.target.value})} type="password" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Create password" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prev();
              }} 
              disabled={step === 0} 
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                next();
              }} 
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-lg cursor-pointer"
            >
              {step === 6 ? "Get My Match" : "Continue"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
