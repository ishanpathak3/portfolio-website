import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


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

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const progressBar = progressRef.current;
    const totalSkills = skills.length;
    const spacing = 400;

    // Calculate positions: first skill should be centered, last skill should be centered
    const startX = -(spacing * 0); // First skill centered (accounting for paddingLeft 50%)
    const endX = -(spacing * totalSkills); // Last skill centered

    // Create timeline
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

    // Animate container from first to last skill
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
  }, []);

  const spacing = 400;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-dark-950 overflow-hidden"
    >

      {/* Spotlight effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-white opacity-[0.03] blur-[120px]" />
      </div>

      {/* Title */}
      <div className="absolute top-20 left-0 right-0 text-center z-10 pointer-events-none">
        <span className="inline-block text-dark-200 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 justify-center">
          <span className="font-mono text-white">&lt;</span> Skills <span className="font-mono text-white">/&gt;</span>
        </span>
        <h2 className="text-6xl md:text-7xl font-display font-bold text-white mt-4 tracking-tight">
          Tech Stack
        </h2>
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
        </div>
      </div>

      {/* Side labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="absolute left-[10%] flex flex-col items-end gap-1 opacity-20">
          <div className="w-8 h-[1px] bg-dark-600" />
          <span className="text-dark-600 font-mono text-xs">Previous</span>
        </div>

        <div className="absolute right-[10%] flex flex-col items-start gap-1 opacity-20">
          <div className="w-8 h-[1px] bg-dark-600" />
          <span className="text-dark-600 font-mono text-xs">Next</span>
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
          {skills.map((skill, index) => {
            return (
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
                <div
                  className="relative group skill-card"
                  style={{
                    transform: 'translateZ(0)',
                  }}
                >
                  {/* Card glow */}
                  <div className="absolute inset-0 rounded-[2rem] bg-white opacity-0 blur-2xl transition-opacity duration-500"
                    style={{ opacity: 0 }} />

                  {/* Main card */}
                  <div className="relative w-64 h-64 rounded-[2rem] border border-dark-800 bg-gradient-to-br from-dark-900 to-dark-950 backdrop-blur-xl flex flex-col items-center justify-center gap-6 shadow-2xl overflow-hidden transition-all duration-500">
                    {/* Inner glow */}
                    <div className="absolute inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                    {/* Icon */}
                    <div className="text-[7rem] leading-none">

                      <span style={{color: skill.color}}>{skill.icon}</span>
                    </div>

                    {/* Name */}
                    <div className="text-white font-display font-bold text-2xl tracking-tight">
                      {skill.name}
                    </div>

                    {/* Position indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-dark-800/50 border border-dark-700 flex items-center justify-center text-dark-400 text-xs font-mono">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side fade overlays */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-dark-950 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-dark-950 to-transparent pointer-events-none z-10" />

      {/* Progress section */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-8">
        <div className="text-center mb-4">
          <p className="text-dark-500 text-xs font-mono tracking-wider">
            SCROLL TO NAVIGATE
          </p>
        </div>
        <div className="h-[2px] bg-dark-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-dark-600 via-white to-dark-600 rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
}

export default Skills;