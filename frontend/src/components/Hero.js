import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';

const Hero = ({ profile = { name: "JOHN DOE" } }) => {
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  const iconGroupRef = useRef([]);
  const textContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Simplified entrance animations for mobile
      if (isMobile) {
        // Simple fade in for the whole name on mobile
        tl.from(".name-heading", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
          .from(".hero-reveal:not(.name-heading)", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.4")
          .from(".hobby-item", {
            scale: 0.8,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out"
          }, "-=0.3");
      } else {
        // Full character stagger animation for desktop
        tl.from(".char", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out"
        })
          .from(".hero-reveal:not(.name-heading)", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out"
          }, "-=0.5")
          .from(".hobby-item", {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, "-=0.6");
      }

      // Continuous animations - simplified for mobile
      tl.add(() => {
        if (isMobile) {
          // Simpler animation for mobile
          gsap.to(textContainerRef.current, {
            y: -10,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        } else {
          // Full animation for desktop
          gsap.to(textContainerRef.current, {
            scale: 1.03,
            y: -15,
            rotationX: 5,
            rotationY: -2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      // Blob animation - reduced complexity on mobile
      if (isMobile) {
        gsap.to(blobRef.current, {
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          rotation: 180,
          scale: 1.1,
          transformOrigin: "center"
        });
      } else {
        gsap.to(blobRef.current, {
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          rotation: 360,
          scale: 1.2,
          transformOrigin: "center",
          x: 20,
          y: -20,
        });
      }

      // Only add mousemove on desktop
      if (!isMobile) {
        const handleMouseMove = (e) => {
          const xPos = (e.clientX - window.innerWidth / 2) / 80;
          const yPos = (e.clientY - window.innerHeight / 2) / 80;

          iconGroupRef.current.forEach((icon, i) => {
            if (icon) {
              gsap.to(icon, {
                x: xPos * (i + 1),
                y: yPos * (i + 1),
                duration: 1,
                ease: "power2.out"
              });
            }
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skills = ['React', 'Java', 'Python', 'Flutter', 'PostgreSQL'];

  const renderLetters = (name) => {
    return name.split("").map((char, index) => (
      <span
        key={index}
        aria-hidden="true"
        className="char inline-block transition-colors duration-300 hover:text-emerald-500 cursor-default"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Reduced blur for mobile */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-square opacity-20 blur-[60px] md:blur-[120px]">
          <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
            <path
              ref={blobRef}
              fill="#10b981"
              d="M44.7,-62.4C57.3,-55.8,66.6,-42.1,72.4,-27.1C78.2,-12.1,80.5,4.2,76.1,19C71.7,33.7,60.6,46.9,47.1,56.6C33.6,66.3,17.7,72.5,1.1,70.9C-15.5,69.3,-31,59.9,-43.6,48.8C-56.2,37.7,-65.9,25,-71.1,10.2C-76.3,-4.6,-77,-21.5,-70,-35.3C-63,-49.1,-48.3,-59.8,-33.5,-65.4C-18.7,-71,1,-71.5,16.2,-68.8C31.4,-66.1,44.7,-62.4,44.7,-62.4Z"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 grid-pattern opacity-[0.05]" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="container relative z-10 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="hero-reveal flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <span className="h-[1px] w-12 bg-emerald-500/50" />
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.4em]">
              Available for projects
            </span>
          </div>

          <div className="text-center lg:text-left will-change-transform">
            <h1 ref={textContainerRef} className="name-heading text-6xl md:text-[9rem] font-mono text-white leading-[0.9] tracking-tighter uppercase mb-6 whitespace-nowrap">
              <span className="sr-only">
                {profile.name} – Full-Stack Software Engineer
              </span>
              {renderLetters(profile.name)}
            </h1>

            <div className="hero-reveal flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
              <h2 className="text-2xl md:text-4xl text-gray-400 font-light tracking-tight max-w-2xl">
                A <span className="text-white font-medium italic">Full-Stack Software Engineer</span> crafting
                digital experiences with precision and purpose.
              </h2>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 font-mono text-sm border-l border-white/10 lg:pl-12">
                <MapPin size={16} className="text-emerald-500" />
                <span className="uppercase tracking-widest">United States</span>
              </div>
            </div>
          </div>

          <div className="hero-reveal mt-16 flex flex-wrap justify-center lg:justify-start gap-4">
            {skills.map((skill, i) => (
              <div
                key={skill}
                ref={el => iconGroupRef.current[i] = el}
                className="hobby-item flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 transition-colors group"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold group-hover:text-white">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>


      {/* Scroll indicator - Adjusted for Mobile Visibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        // Using bottom-24 on small screens to clear mobile browser UI, bottom-10 on desktop
        className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
      >
        <div className="relative">
          <motion.div
            animate={{ y: [0, 8, 0] }} // Slightly tighter bounce for mobile
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer p-4 md:p-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-emerald-500/10 transition-colors group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="text-emerald-500 group-hover:scale-110 transition-transform" size={24} />
          </motion.div>
          
          {/* Label: Slightly larger text on mobile for readability */}
          <span className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-[9px] uppercase tracking-[0.4em] text-white/40 font-medium">
            About Me
          </span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent z-10" />
    </section>
  );
};

export default Hero;