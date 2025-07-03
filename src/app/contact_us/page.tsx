"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your Google Apps Script URL
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          role: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#032859] to-[#064f8a] text-white"
      style={{
        background: 'linear-gradient(to bottom right, rgb(40, 98, 173) 0%, rgb(9, 44, 91) 50%, #E0F2F7 85%, #FFFFFF 100%)'
      }}
    >
      {/* Hero Section */}
      <div className="pt-16 pb-6 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2"
          >
            Reach out to the Kplor team here!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-red-300 text-xs sm:text-sm italic"
          >
            *Any job applications sent through the contact form will be rejected.*
          </motion.p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-2 sm:px-6 md:px-12 lg:px-24 pb-10 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-2xl px-2 sm:px-4"
          style={{ minHeight: '320px', backgroundColor:'rgba(3, 40, 89, 0.65)'}}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent"
              >
                <option value="" className="text-gray-800">Select your role</option>
                <option value="student" className="text-gray-800">Student</option>
                <option value="professor" className="text-gray-800">Professor</option>
                <option value="enthusiast" className="text-gray-800">Enthusiast</option>
                <option value="partner" className="text-gray-800">Partner</option>
              </select>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent"
              >
                <option value="" className="text-gray-800">Select a subject</option>
                <option value="accounts-billing" className="text-gray-800">Accounts & Billing</option>
                <option value="terms-privacy" className="text-gray-800">Terms & Privacy</option>
                <option value="development-debug" className="text-gray-800">Development & Debug</option>
                <option value="business-inquiry" className="text-gray-800">Business Inquiry</option>
                <option value="partnerships" className="text-gray-800">Partnerships</option>
                <option value="feedback-suggestions" className="text-gray-800">Feedback & Suggestions</option>
                <option value="other" className="text-gray-800">Other (Specify)</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your questions, comments, concerns *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent resize-vertical"
                placeholder="Please provide details about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#00FFFF] text-[#032859] font-bold py-3 px-6 rounded-lg hover:bg-[#00CCCC] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-[#00FFFF] font-medium"
              >
                Form submitted successfully! We&apos;ll get back to you soon.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}