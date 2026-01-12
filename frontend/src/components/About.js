import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion'; // Added Framer Motion
import { Code2, Dumbbell, Music, Trophy, Zap } from 'lucide-react';
import profileImage from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);


const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    const button = buttonRef.current;
    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => { xTo(0); yTo(0); };
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={buttonRef} className={className}>{children}</div>;
};

const interests = [
  { icon: Code2, label: 'Coding' },
  { icon: Trophy, label: 'Soccer' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Music, label: 'Music' },
];

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
  }
};

function About({ profile }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Grid Parallax
      gsap.to(gridRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating Icons 
      gsap.to(".floating-icon", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1, from: "random" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden bg-[#030303] py-24 lg:py-32">
      {/* GSAP Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Image (Framer Motion Entrance) */}
          <motion.div 
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={profileImage}
                alt={profile?.name}
                className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            </div>

            {/* GSAP Floating Icons */}
            {interests.map((interest, i) => (
              <div
                key={interest.label}
                className="floating-icon hidden lg:flex absolute glass-card rounded-full p-4 text-white border border-white/10 shadow-lg backdrop-blur-md"
                style={{
                  top: `${10 + i * 25}%`,
                  left: i % 2 === 0 ? '-15%' : 'auto',
                  right: i % 2 === 0 ? 'auto' : '-15%',
                }}
              >
                <interest.icon className="w-6 h-6" />
              </div>
            ))}
          </motion.div>

          {/* RIGHT: Content (Framer Motion Staggered Entrance) */}
          <motion.div 
            className="lg:col-span-6 lg:col-start-7 space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <div className="space-y-6">
              <motion.span variants={itemVariants} className="inline-block text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">
                &lt; About /&gt;
              </motion.span>

              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9]">
                Building
                <span className="block mt-3">
                   <span className="text-dark-400 italic">Digital</span> Solutions
                </span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-xl text-dark-300 leading-relaxed font-light">
                Full-stack software engineer passionate about creating intuitive, scalable applications that solve real problems. I bridge the gap between complex backend logic and sleek, user-friendly interfaces.
              </motion.p>

              <motion.p variants={itemVariants} className="text-lg text-dark-400 leading-relaxed border-l-2 border-white/10 pl-6 italic">
                When I'm not coding, you'll find me on the soccer field, at the gym, or playing guitar.
                I believe in <span className="text-white">discipline, curiosity, and continuous growth</span>.
              </motion.p>
            </div>

            {/* Interests Pills (Framer Motion) */}
            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              {interests.map((interest) => (
                <div key={interest.label} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-default">
                  <interest.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold tracking-wide">{interest.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons (GSAP Magnetic inside Framer Motion Reveal) */}
            <motion.div className="flex flex-wrap gap-6 pt-4" variants={itemVariants}>
              <MagneticButton>
                <a href="#skills" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 uppercase text-xs tracking-widest transition-transform">
                  View Skills <Zap className="w-4 h-4 fill-black" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="#projects" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase text-xs tracking-widest">
                  My Portfolio
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;