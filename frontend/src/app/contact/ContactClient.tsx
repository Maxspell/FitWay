"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title text-center mb-12"
        >
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card relative overflow-hidden p-8 md:p-12 border-white/10"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-[1px] rounded-[24px] bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-[#FF8C00]/30 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,140,0,0.4)]"
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#1B2B3B]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400">{message}</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-[#FF8C00] font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block ml-1 tracking-widest">
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00] transition-all duration-300 text-white"
                          required
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block ml-1 tracking-widest">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00] transition-all duration-300 text-white"
                          required
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block ml-1 tracking-widest">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00] transition-all duration-300 text-white"
                          required
                          disabled={status === "loading"}
                        ></textarea>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,140,0,0.2)] hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all duration-500 disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-xs text-gray-500 mt-4">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy-policy" className="text-gray-300 hover:text-[#FF8C00] underline underline-offset-2">
                          Privacy Policy
                        </a>.
                      </p>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mt-4 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {message}
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-6 text-sm">We typically respond to all inquiries within 24 business hours.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-300">+1 (603) 842-3420</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Email</p>
                    <p className="text-gray-300">info@fitway.best</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Address</p>
                    <p className="text-gray-300">456 Wellness Ave<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Working Hours</p>
                    <p className="text-gray-300">Mon - Fri: 6:00 AM - 10:00 PM<br />Sat - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6">Quick Help</h2>
              <p className="text-gray-400 mb-6 text-sm">Get instant answers to the most common questions.</p>
              <div className="space-y-4">
                <div className="group">
                  <h3 className="font-semibold mb-2 group-hover:text-[#FF8C00] transition-colors">What are your membership options?</h3>
                  <p className="text-gray-300">We offer flexible membership plans including monthly, quarterly, and annual options. Contact us for detailed pricing.</p>
                </div>
                <div className="group">
                  <h3 className="font-semibold mb-2 group-hover:text-[#FF8C00] transition-colors">Do you offer personal training?</h3>
                  <p className="text-gray-300">Yes, we have certified personal trainers available for one-on-one sessions and small group training.</p>
                </div>
                <div className="group">
                  <h3 className="font-semibold mb-2 group-hover:text-[#FF8C00] transition-colors">How do I start with a customized plan?</h3>
                  <p className="text-gray-300">You can use our online tools or contact us directly for a professional consultation with our certified experts.</p>
                </div>
                <div className="group">
                  <h3 className="font-semibold mb-2 group-hover:text-[#FF8C00] transition-colors">Is the content reviewed by professionals?</h3>
                  <p className="text-gray-300">Absolutely. All our workouts and articles are created or reviewed by NASM and RD certified professionals to ensure safety and efficacy.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
