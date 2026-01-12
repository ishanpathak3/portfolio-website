import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Send, CheckCircle } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function Contact({ profile }) {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && formRef.current) {
      gsap.from('.contact-element', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }
  }, [isInView]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true)
    const form = e.target;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Oops! There was a problem submitting your form');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FiGithub,
      url: 'https://github.com/theishanpathak',
      color: 'hover:bg-dark-800'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: 'https://www.linkedin.com/in/ishan-pathak333/',
      color: 'hover:bg-dark-800'
    },
    {
      name: 'Email',
      icon: FiMail,
      url: `mailto:${profile.email}`,
      color: 'hover:bg-dark-800'
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="section relative overflow-hidden bg-[#030303]"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10" ref={formRef}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-dark-200 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 justify-center">
            <span className="font-mono text-white">&lt;</span> Contact <span className="font-mono text-white">/&gt;</span>
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-white">Let's Build Something</span>{' '}
            <span className="text-white italic">Together</span>
          </h2>

          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about tech, soccer, or music — I'd love to hear from you!
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="contact-element">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Connect With Me
              </h3>
              <p className="text-dark-300 mb-8">
                I'm always open to discussing new opportunities, collaborations, or just having a friendly conversation.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4 contact-element">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 p-4 glass-card border border-white/10 ${link.color} transition-all duration-300 group`}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-lg glass-card flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{link.name}</div>
                    <div className="text-sm text-dark-300">
                      {link.name === 'Email' ? profile.email : `@theishanpathak`}
                    </div>
                  </div>
                  <motion.div
                    className="text-white"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="contact-element grid grid-cols-2 gap-4">
              <motion.div
                className="glass-card border border-white/10 p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-white">24h</div>
                <div className="text-sm text-dark-300 mt-1">Response Time</div>
              </motion.div>
              <motion.div
                className="glass-card border border-white/10 p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-dark-300 mt-1">Commitment</div>
              </motion.div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3 contact-element">
            <form action="https://formspree.io/f/mkogdznb" method='POST' onSubmit={handleSubmit} className="space-y-6 glass-card border border-white/10 p-8">
              <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className={`input ${focusedField === 'name' ? 'border-white/30 ring-white/10' : ''}`}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className={`input ${focusedField === 'email' ? 'border-white/30 ring-white/10' : ''}`}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell me about your project or just say hi..."
                  className={`textarea ${focusedField === 'message' ? 'border-white/30 ring-white/10' : ''}`}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className={`btn w-full justify-center ${submitted ? 'bg-white text-black' : 'btn-primary'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted || isSubmitting}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-dark-300 flex items-center justify-center gap-2">
                I'll get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;