
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCard from './SkillCard';

import { 
  SiSpringboot, SiDjango, SiPostgresql, SiGo, SiFlutter 
} from 'react-icons/si'; 
import { 
  FaJava, FaReact, FaPython, FaDocker, FaGitAlt 
} from 'react-icons/fa'; 

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Java', icon: <FaJava />, color: '#5382a1' },
  { name: 'React', icon: <FaReact />, color: '#61dbfb' },
  { name: 'Python', icon: <FaPython />, color: '#3776ab' },
  { name: 'Django', icon: <SiDjango />, color: '#092e20' },
  { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ed' },
  { name: 'Go', icon: <SiGo />, color: '#00add8' },
  { name: 'Flutter', icon: <SiFlutter />, color: '#02569b' },
  { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
];

function Skills() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile and tablets (including iPads)
    const checkMobile = () => {
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isTabletOrMobile = width < 1024 || (isTouch && width < 1280);
      
      setIsMobile(isTabletOrMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run horizontal scroll animation on desktop
    if (isMobile) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const progressBar = progressRef.current;
    const totalSkills = skills.length;
    const spacing = 400;

    const startX = -(spacing * 0);
    const endX = -(spacing * totalSkills);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${(totalSkills - 1) * 100}%`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.to(progressBar, {
            width: `${self.progress * 100}%`,
            duration: 0.3,
          });
        }
      }
    });

    tl.fromTo(container,
      { x: startX },
      {
        x: endX,
        duration: totalSkills - 1,
        ease: 'none',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const spacing = 400;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-[#030303] overflow-hidden"
      style={{ minHeight: isMobile ? 'auto' : '100vh' }}
    >
      {/* Spotlight effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-white opacity-[0.03] blur-[120px]" />
      </div>

      {/* Title */}
      <div className={`${isMobile ? 'relative' : 'absolute'} top-0 md:top-20 left-0 right-0 text-center z-10 pointer-events-none py-12 md:py-0`}>
        <span className="inline-block text-gray-400 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 justify-center">
          <span className="font-mono text-white">&lt;</span> Skills <span className="font-mono text-white">/&gt;</span>
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mt-4 tracking-tight">
          Tech Stack
        </h2>
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
        </div>
      </div>

      {/* Desktop: Horizontal scroll layout */}
      {!isMobile && (
        <>
          {/* Side labels */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="absolute left-[10%] flex flex-col items-end gap-1 opacity-20">
              <div className="w-8 h-[1px] bg-gray-600" />
              <span className="text-gray-600 font-mono text-xs">Previous</span>
            </div>

            <div className="absolute right-[10%] flex flex-col items-start gap-1 opacity-20">
              <div className="w-8 h-[1px] bg-gray-600" />
              <span className="text-gray-600 font-mono text-xs">Next</span>
            </div>
          </div>

          {/* Skills queue container */}
          <div className="h-screen flex items-center overflow-hidden">
            <div
              ref={containerRef}
              className="flex items-center gap-0"
              style={{
                marginLeft: '50%',
              }}
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 transition-all duration-700"
                  style={{
                    width: `${spacing}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SkillCard skill={skill} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Side fade overlays */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none z-10" />

          {/* Progress bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-8">
            <div className="text-center mb-4">
              <p className="text-gray-500 text-xs font-mono tracking-wider">
                SCROLL TO NAVIGATE
              </p>
            </div>
            <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-gray-600 via-white to-gray-600 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </>
      )}

      {/* Mobile: Simple grid layout */}
      {isMobile && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="flex justify-center">
                <SkillCard skill={skill} index={index} mobile />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Skills;