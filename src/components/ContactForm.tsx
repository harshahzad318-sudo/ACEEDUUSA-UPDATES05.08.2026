"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setErrorMsg(data.error || "Failed to submit message. Please try again.");
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
        <h2 className="text-2xl font-bold text-navy mb-2">Thank You!</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Your message has been sent to <strong>info@aceeducation.us</strong>. We have also sent a confirmation email to your address. Our academic team will get back to you shortly!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
      <h2 className="text-2xl font-extrabold text-navy mb-6">Send Us a Message</h2>

      {errorMsg && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
              placeholder="Phone number"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Subject</label>
          <select
            name="subject"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
          >
            <option>General Inquiry</option>
            <option>Tutoring Services</option>
            <option>Pricing</option>
            <option>Partnership</option>
            <option>Apply as Tutor</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            rows={4}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
            placeholder="How can we help you?"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3.5 rounded-xl text-sm transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
