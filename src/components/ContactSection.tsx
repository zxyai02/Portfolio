import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Clock, Send, CheckCircle2, ArrowUpRight, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitMessage, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitMessage(formData.name, formData.email, formData.subject, formData.message);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            Inquiries & Collaborations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Have a high-consequence SaaS product, data telemetry platform, or design system initiative? Let&apos;s build something deterministic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Coordinates & Social Media Links */}
          <div className="lg:col-span-5 space-y-8">
            {/* Primary Direct Contact Box */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-5">
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">
                Direct Communication Coordinates
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Direct Email</span>
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      {data.profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-sky-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Primary Location</span>
                    <span className="text-sm font-semibold text-zinc-200">
                      {data.profile.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Working Timezone</span>
                    <span className="text-sm font-semibold text-zinc-200">
                      {data.profile.timezone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links List */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Verified Socials & Design Registries
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.profile.socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/60 hover:bg-zinc-800 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-amber-300 transition-colors">
                        {social.platform}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[150px] block">
                        {social.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Project Brief or Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Messages route directly to Majestic Soul&apos;s administrative inbox with instantaneous notification.
              </p>

              {submitted ? (
                <div className="py-12 px-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Transmission Successful</h4>
                  <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md mx-auto">
                    Your message has been safely delivered to the studio console. A response will be dispatched within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-mono text-amber-400 underline hover:text-amber-300"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sara Ahmed"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sara@company.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Design Architecture for Logistics Platform"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the product objectives, existing tech stack, timeline, and deliverables..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
