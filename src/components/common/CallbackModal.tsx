"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaTimes, FaCheckCircle } from "react-icons/fa";
import { validateWorkEmail } from "../../lib/workEmail";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    requirement: "",
    preferredTime: "",
    website: "", // honeypot: hidden from humans, bots fill it
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailCheck = validateWorkEmail(formData.email);
    if (!emailCheck.valid) {
      setEmailError(emailCheck.message || "Please enter a valid work email.");
      return;
    }

    if (!formData.preferredTime) {
      setTimeError("Please select a preferred call window.");
      return;
    }

    setEmailError(null);
    setTimeError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "Callback Request from Website",
                  }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        if (data?.field === "email") setEmailError(data.message);
        else setSubmitError(data?.message || "Something went wrong. Please try again or email info@kplor.com.");
      }
    } catch {
      setSubmitError("Network error. Please try again or email info@kplor.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setEmailError(null);
    setTimeError(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      organization: "",
      requirement: "",
      preferredTime: "",
      website: "",
    });
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-charcoal z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FaCheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-kplor-900">
                  Request Received!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-kplor-900">{formData.name}</span>. Our learning consulting team will call you at{" "}
                  <span className="font-semibold text-kplor-900">{formData.phone}</span> during your preferred window.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 rounded-full bg-kplor-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-kplor-700 shadow"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-kplor-50 text-kplor-700 border border-kplor-200">
                    <FaPhoneAlt className="h-4 w-4" />
                  </span>
                  <div>
                    <h3
                      id="callback-modal-title"
                      className="text-xl font-bold text-kplor-900"
                    >
                      Ask our team to call you
                    </h3>
                    <p className="text-xs text-slate-500">
                      Share your details and we’ll reach out to discuss your learning goals.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot: invisible to people, tempting to bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Priya Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-kplor-500 focus:ring-2 focus:ring-kplor-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-kplor-500 focus:ring-2 focus:ring-kplor-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priya@work.com"
                        value={formData.email}
                        onBlur={() => {
                          if (formData.email) {
                            const check = validateWorkEmail(formData.email);
                            if (!check.valid) {
                              setEmailError(check.message || "Please enter a valid work email.");
                            } else {
                              setEmailError(null);
                            }
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ ...formData, email: val });
                          if (emailError) {
                            const check = validateWorkEmail(val);
                            if (check.valid) {
                              setEmailError(null);
                            }
                          }
                        }}
                        className={`w-full rounded-lg border px-3.5 py-2 text-sm text-charcoal outline-none transition focus:ring-2 ${
                          emailError
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-kplor-500 focus:ring-kplor-100"
                        }`}
                      />
                      {emailError && (
                        <p className="mt-1 text-xs text-red-600 font-medium leading-tight">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-kplor-500 focus:ring-2 focus:ring-kplor-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tell us about your requirement *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData({ ...formData, requirement: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-kplor-500 focus:ring-2 focus:ring-kplor-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Call Window *
                    </label>
                    <select
                      required
                      value={formData.preferredTime}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredTime: e.target.value });
                        if (timeError) setTimeError(null);
                      }}
                      className={`w-full rounded-lg border px-3.5 py-2 text-sm text-charcoal outline-none transition focus:ring-2 bg-white ${
                        timeError
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-kplor-500 focus:ring-kplor-100"
                      }`}
                    >
                      <option value="" disabled>Select preferred window *</option>
                      <option value="morning">Morning (10:00 AM – 1:00 PM IST)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 5:00 PM IST)</option>
                      <option value="evening">Evening (5:00 PM – 8:00 PM IST)</option>
                    </select>
                    {timeError && (
                      <p className="mt-1 text-xs text-red-600 font-medium leading-tight">
                        {timeError}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-kplor-900 py-3 text-sm font-semibold text-white transition hover:bg-kplor-700 disabled:opacity-50 shadow-md"
                    >
                      {isSubmitting ? "Submitting..." : "Request a Call"}
                    </button>
                    {submitError && (
                      <p className="mt-2 text-center text-xs text-red-600 font-medium">{submitError}</p>
                    )}
                    <p className="mt-2 text-center text-[11px] text-slate-400">
                      No spam. We only call you to discuss your video learning requirements.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default CallbackModal;

