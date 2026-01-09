import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Dumbbell, Music, Trophy, Zap } from 'lucide-react';
import profileImage from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Wrapper Component
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

      // Sensitivity: increase 0.3 for more "magnetic"
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={buttonRef} className={className}>
      {children}
    </div>
  );
};

const interests = [
  { icon: Code2, label: 'Coding' },
  { icon: Trophy, label: 'Soccer' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Music, label: 'Music' },
];

function About({ profile }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
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

      // Staggered Content Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      tl.from(".reveal-text", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      })
        .from(".interest-pill", {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)"
        }, "-=0.5");

      // Floating Animation for Icons
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
      <div
        ref={gridRef}
        className="absolute inset-0 grid-pattern opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="container relative z-10" ref={containerRef}>
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Image with Hover Zoom */}
          <div className="lg:col-span-5 relative group">
            <div
              ref={imageWrapperRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={profileImage}
                alt={profile.name}
                className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            </div>

            {/* Floating Decorative Icons */}
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
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-10">
            <div className="space-y-6">
              <span className="reveal-text inline-block text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">
                &lt; About /&gt;
              </span>


              <h2 className="reveal-text text-5xl md:text-7xl font-display font-bold text-white leading-[0.9]">
                Building <br />
                <span className="text-dark-400 italic">Digital</span> Solutions
              </h2>


              <p className="reveal-text text-xl text-dark-300 leading-relaxed font-light">
                Full-stack developer passionate about creating intuitive, scalable applications that solve real problems.
                I bridge the gap between complex backend logic and sleek, user-friendly interfaces.
              </p>

              <p className="reveal-text text-lg text-dark-400 leading-relaxed border-l-2 border-white/10 pl-6 italic">
                When I'm not coding, you'll find me on the soccer field, at the gym, or playing guitar.
                I believe in <span className="text-white">discipline, curiosity, and continuous growth</span>.
              </p>
            </div>

            {/* Interests Pills */}
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <div key={interest.label} className="interest-pill flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-default">
                  <interest.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold tracking-wide">{interest.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons - MAGNETIC */}
            <div className="flex flex-wrap gap-6 pt-4 reveal-text">
              <MagneticButton>
                <a
                  href="#skills"
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 uppercase text-xs tracking-widest transition-transform"
                >
                  View Skills <Zap className="w-4 h-4 fill-black" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#projects"
                  className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase text-xs tracking-widest"
                >
                  My Portfolio
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;