"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Welcome to the FitWay tribe!");
        setEmail("");
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
    <section className="relative py-24 overflow-hidden bg-[#1B2B3B]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF8C00]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF8C00]/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card relative overflow-hidden p-8 md:p-16 border-white/10">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-[1px] rounded-[31px] bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 text-[#FF8C00] text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <Mail className="w-3 h-3" />
                  Exclusive Updates
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Join the <span className="text-[#FF8C00]">FitWay</span> Insider
                </h2>
                
                <p className="text-gray-400 text-lg mb-8">
                  Get weekly fitness hacks, personalized workout tips, and science-backed nutrition advice delivered straight to your inbox.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    "Weekly Fitness Tips",
                    "Exclusive Workouts",
                    "Nutrition Guides",
                    "Early Access to Features"
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#FF8C00]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-[#FF8C00]" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
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
                      <h3 className="text-2xl font-bold mb-2">You're In!</h3>
                      <p className="text-gray-400">{message}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-[#FF8C00] font-semibold text-sm hover:underline"
                      >
                        Subscribe another email
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block ml-1 tracking-widest">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="alex@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={status === "loading"}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00] transition-all duration-300 group-hover:border-white/20 disabled:opacity-50"
                            />
                            <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#FF8C00] transition-colors" />
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-[#FF8C00] text-[#1B2B3B] py-5 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(255,140,0,0.2)] hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Join the Tribe
                              <Send className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>

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

                        <p className="text-center text-xs text-gray-500 mt-6">
                          We respect your privacy. No spam, only pure value. 
                          <br />Unsubscribe anytime with one click.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
