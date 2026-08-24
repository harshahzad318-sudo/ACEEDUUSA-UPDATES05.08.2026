"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { STATES, SUBJECTS, EXAMS, LEARNING_SUPPORT } from "@/lib/data";

export default function AssessmentForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const allOfferings = [
    ...SUBJECTS.map((s) => ({ name: s.name, category: "Subjects" })),
    ...EXAMS.map((e) => ({ name: `${e.name} Prep`, category: "Test Prep" })),
    ...LEARNING_SUPPORT.map((l) => ({ name: l.name, category: "Special Support" })),
    { name: "Homeschooling Support", category: "Other Services" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      parentName: formData.get("parentName")?.toString() || "",
      studentName: formData.get("studentName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      gradeLevel: formData.get("gradeLevel")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      learningMode: formData.get("learningMode")?.toString() || "",
      state: formData.get("state")?.toString() || "",
      notes: formData.get("notes")?.toString() || "",
      source: "assessment_form",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setErrorMsg(data.error || "Failed to book assessment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-green-100 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy mb-2">Assessment Booked!</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Your free academic assessment request has been submitted to <strong>info@aceeducation.us</strong>. A confirmation email has been sent to your email address. One of our lead educational consultants will contact you shortly to confirm your schedule.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
        >
          Book Another Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
      <h2 className="text-2xl font-extrabold text-navy mb-6">Assessment Request Form</h2>

      {errorMsg && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Parent Name *
            </label>
            <input
              type="text"
              name="parentName"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Student Name *
            </label>
            <input
              type="text"
              name="studentName"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Email *
            </label>
            <input
              type="email"
              name="email"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Grade Level
            </label>
            <select
              name="gradeLevel"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              <option value="">Select</option>
              {[
                "Preschool",
                "Elementary (K-5)",
                "Middle School (6-8)",
                "High School (9-12)",
                "College",
                "Adult Learner",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Subject/Service *
            </label>
            <select
              name="subject"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            >
              <option value="">Select a subject or program</option>
              {["Subjects", "Test Prep", "Special Support", "Other Services"].map((cat) => (
                <optgroup key={cat} label={cat}>
                  {allOfferings
                    .filter((o) => o.category === cat)
                    .map((o) => (
                      <option key={o.name} value={o.name}>
                        {o.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Learning Mode
            </label>
            <select
              name="learningMode"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="In-Home">In-Home</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              State *
            </label>
            <select
              name="state"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              required
            >
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Washington DC">Washington DC</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
            placeholder="Tell us about your child's specific needs..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-4 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
            </>
          ) : (
            "Book Free Assessment"
          )}
        </button>
        <p className="text-xs text-gray-400 text-center">No payment required. No commitment. 100% free.</p>
      </form>
    </div>
  );
}
