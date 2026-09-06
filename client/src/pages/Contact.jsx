import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Facebook, Instagram  } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import { contactAPI } from '../lib/api.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const MESSAGE_MAX_LENGTH = 1000;

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      submitting: true,
      success: false,
      error: null,
    });

    try {
      await contactAPI.send(formData);

      setStatus({
        submitting: false,
        success: true,
        error: null,
      });

      setFormData({
        name: '',
        subject: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setStatus({
          submitting: false,
          success: false,
          error: null,
        });
      }, 5000);
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Failed to send message',
      });
    }
  };

  return (
    <>
      <SEO title="Contact | Dev Portfolio" />

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="heading-1 mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl">
                Get in Touch
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto px-2">
                Have a project in mind? Let's work together.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact Information */}
              <div className="md:col-span-1 space-y-5 sm:space-y-6">
                <div className="card p-4 sm:p-6 space-y-4">
                  <h3 className="font-semibold text-base sm:text-lg">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <Mail className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />

                      <a
                        href="mailto:wahajmuhammed202@gmail.com"
                        className="break-all hover:text-primary dark:hover:text-primary-dark transition-colors"
                      >
                        wahajmuhammed202@gmail.com
                      </a>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />

                      <span>
                        Pakistan, Islamabad, Jhelum 📍
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <Phone className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />

                      <a
                        href="tel:+92 3193631230"
                        className="hover:text-primary dark:hover:text-primary-dark transition-colors"
                      >
                        +92 (319) 3631230
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                      href="https://github.com/YOUR_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    <a
                      href="https://linkedin.com/in/YOUR_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    <a
                      href="https://twitter.com/YOUR_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Availability */}
                <div className="card p-4 sm:p-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Availability
                  </h4>

                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    I'm currently available for freelance work and full-time
                    opportunities.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2 min-w-0">
                <form
                  onSubmit={handleSubmit}
                  className="card p-4 sm:p-6 md:p-8 space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full min-w-0 px-4 py-2.5 sm:py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full min-w-0 px-4 py-2.5 sm:py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full min-w-0 px-4 py-2.5 sm:py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    >
                      <option value="">What's this about?</option>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="General Question">General Question</option>
                      <option value="Just Saying Hi">Just Saying Hi</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={MESSAGE_MAX_LENGTH}
                      className="w-full min-w-0 px-4 py-2.5 sm:py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-y min-h-[140px]"
                      placeholder="Tell me about your project..."
                    />

                    <p className="mt-1 text-xs text-zinc-400 text-right">
                      {formData.message.length}/{MESSAGE_MAX_LENGTH}
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full btn-primary justify-center min-h-[44px] sm:min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status.submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Success */}
                  {status.success && (
                    <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm leading-relaxed">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {/* Error */}
                  {status.error && (
                    <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm leading-relaxed break-words">
                      ❌ {status.error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
