
import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

   const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/theishanpathak', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://www.linkedin.com/in/ishan-pathak333/', label: 'LinkedIn' },
    { icon: FiMail, url: `mailto:${profile.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-dark-800">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative container mx-auto px-8 py-16">
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Ishan Pathak
            </h3>
            <p className="text-dark-400 text-sm font-mono">
            Software Engineer
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-lg border border-dark-800 bg-dark-900 flex items-center justify-center text-dark-400 hover:text-white hover:border-dark-700 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-dark-800 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <p>
            © {currentYear} Ishan Pathak. All rights reserved.
          </p>
          <p className="font-mono text-xs">
            Built with React + Tailwind + GSAP
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-8 right-8 w-10 h-10 rounded-lg border border-dark-800 bg-dark-900 flex items-center justify-center text-white hover:border-dark-700 transition-all duration-300 group"
      >
        <span className="group-hover:-translate-y-0.5 transition-transform duration-300">
          ↑
        </span>
      </button>
    </footer>
  );
}

export default Footer;